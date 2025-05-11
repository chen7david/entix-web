import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthService } from '@/features/auth/auth.service';
import SignupPage from './SignupPage';
import { BrowserRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('@/features/auth/auth.service', () => ({
  AuthService: {
    signup: vi.fn(),
  },
}));

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

// Mock the navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthService.signup).mockClear();
    mockNavigate.mockClear();
    mockSuccess.mockClear();
    mockError.mockClear();
  });

  const renderSignupPage = () => {
    return render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    );
  };

  it('renders the form correctly', () => {
    renderSignupPage();

    // Check if essential elements are rendered
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderSignupPage();

    // Submit the form without entering any values
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('submits the form with valid data and redirects to confirm page', async () => {
    vi.mocked(AuthService.signup).mockResolvedValue({
      userConfirmed: false,
      sub: 'user-123',
    });

    renderSignupPage();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(AuthService.signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
      });
      expect(mockSuccess).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/auth/confirm-signup?username=testuser');
    });
  });

  it('shows error message when signup fails', async () => {
    // Mock the error response from the API
    const mockErrorResponse = {
      message: 'User already exists',
      response: {
        data: {
          message: 'User already exists',
        },
      },
    };

    vi.mocked(AuthService.signup).mockRejectedValue(mockErrorResponse);

    renderSignupPage();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Wait for error message
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('User already exists');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
