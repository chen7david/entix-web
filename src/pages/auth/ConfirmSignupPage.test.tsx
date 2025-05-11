import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthService } from '@/features/auth/auth.service';
import ConfirmSignupPage from './ConfirmSignupPage';
import { BrowserRouter } from 'react-router-dom';

// Mock the search params
const mockSearchParams = new Map();

// Mock the AuthService
vi.mock('@/features/auth/auth.service', () => ({
  AuthService: {
    confirmSignup: vi.fn(),
    resendConfirmationCode: vi.fn(),
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

// Mock the navigate function and useSearchParams
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      {
        get: (key: string) => mockSearchParams.get(key),
      },
    ],
  };
});

describe('ConfirmSignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.clear();
    mockSuccess.mockClear();
    mockError.mockClear();
  });

  const renderWithRouter = (username?: string) => {
    if (username) {
      mockSearchParams.set('username', username);
    }

    return render(
      <BrowserRouter>
        <ConfirmSignupPage />
      </BrowserRouter>
    );
  };

  it('renders the form correctly', () => {
    renderWithRouter();

    expect(screen.getByText('Confirm Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmation Code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Didn't receive a code/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('prefills username from URL param', () => {
    renderWithRouter('testuser');

    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    expect(usernameInput.value).toBe('testuser');
  });

  it('shows validation errors for empty fields', async () => {
    renderWithRouter();

    // Submit without filling in fields
    fireEvent.click(screen.getByRole('button', { name: /Confirm Account/i }));

    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('submits form with valid data and redirects to signin', async () => {
    vi.mocked(AuthService.confirmSignup).mockResolvedValue({ success: true });

    renderWithRouter('testuser');

    // Fill the confirmation code
    fireEvent.change(screen.getByLabelText(/Confirmation Code/i), { target: { value: '123456' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Confirm Account/i }));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(AuthService.confirmSignup).toHaveBeenCalledWith({
        username: 'testuser',
        code: '123456',
      });
      expect(mockSuccess).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('shows error message when confirmation fails', async () => {
    // Mock the error response from the API
    const mockErrorResponse = {
      message: 'Invalid verification code',
      response: {
        data: {
          message: 'Invalid verification code',
        },
      },
    };

    vi.mocked(AuthService.confirmSignup).mockRejectedValue(mockErrorResponse);

    renderWithRouter('testuser');

    // Fill the confirmation code
    fireEvent.change(screen.getByLabelText(/Confirmation Code/i), { target: { value: '123456' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Confirm Account/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Invalid verification code');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('resends confirmation code when requested', async () => {
    vi.mocked(AuthService.resendConfirmationCode).mockResolvedValue({
      codeDeliveryDetails: {
        destination: 't***@e***.com',
        deliveryMedium: 'EMAIL',
        attributeName: 'email',
      },
    });

    renderWithRouter('testuser');

    // Click the resend button
    fireEvent.click(screen.getByText(/Didn't receive a code/i));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(AuthService.resendConfirmationCode).toHaveBeenCalledWith({
        username: 'testuser',
      });
      expect(mockSuccess).toHaveBeenCalled();
    });
  });

  it('shows error when username is missing for resend', async () => {
    renderWithRouter(); // No username in URL

    // Clear the username field just to be sure
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: '' } });

    // Click the resend button
    fireEvent.click(screen.getByText(/Didn't receive a code/i));

    // Should show error without calling the API
    expect(mockError).toHaveBeenCalledWith('Please enter your username first');
    expect(AuthService.resendConfirmationCode).not.toHaveBeenCalled();
  });
});
