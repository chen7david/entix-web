import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { setAuthTokens } from '@/features/auth/auth.store';
import SigninPage from './SigninPage';

// Mock dependencies
vi.mock('@/services/apiService');
vi.mock('@/features/auth/auth.store');

// Mock message functions
const mockSuccess = vi.fn();
const mockError = vi.fn();

// Mock the useMessage hook
vi.mock('@/utils/message', () => ({
  useMessage: () => ({
    success: mockSuccess,
    error: mockError,
  }),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: { from: { pathname: '/dashboard' } },
    }),
  };
});

describe('SigninPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSuccess.mockClear();
    mockError.mockClear();
  });

  const renderSigninPage = () => {
    return render(
      <BrowserRouter>
        <SigninPage />
      </BrowserRouter>
    );
  };

  it('renders the form correctly', () => {
    renderSigninPage();

    // Check if essential elements are rendered
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderSigninPage();

    // Submit the form without entering any values
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('submits the form with valid data and redirects', async () => {
    const mockResponse = {
      data: {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      },
    };

    vi.mocked(apiService.post).mockResolvedValue(mockResponse);

    renderSigninPage();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/signin', {
        username: 'testuser',
        password: 'password123',
      });
      expect(setAuthTokens).toHaveBeenCalledWith({
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      });
      expect(mockSuccess).toHaveBeenCalledWith('Signed in successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('shows error when no access token is returned', async () => {
    const mockResponse = {
      data: {
        // No access token
        refreshToken: 'test-refresh-token',
      },
    };

    vi.mocked(apiService.post).mockResolvedValue(mockResponse);

    renderSigninPage();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for error message
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('No access token received from server');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('shows error message when API call fails', async () => {
    // Mock the error response from the API
    const mockErrorResponse = {
      message: 'Invalid credentials',
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    };

    vi.mocked(apiService.post).mockRejectedValue(mockErrorResponse);

    renderSigninPage();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for error message
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Invalid credentials');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
