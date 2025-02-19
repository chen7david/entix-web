import { Component, ErrorInfo, ReactNode } from "react";
import { Button, Result } from "antd";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);

    // Here you can add error reporting service like Sentry
    // if (typeof window.Sentry !== 'undefined') {
    //   window.Sentry.captureException(error);
    // }
  }

  public resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle={this.state.error?.message || "An unexpected error occurred"}
          extra={[
            <Button key="retry" type="primary" onClick={this.resetError}>
              Try Again
            </Button>,
            process.env.NODE_ENV === "development" && (
              <div key="error-details" className="mt-4">
                <details className="whitespace-pre-wrap text-left p-4 bg-gray-50 rounded">
                  <summary className="cursor-pointer mb-2 text-gray-700">
                    Error Details
                  </summary>
                  <pre className="text-sm text-gray-600">
                    {this.state.error?.stack}
                    {"\n\nComponent Stack:\n"}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            ),
          ]}
        />
      );
    }

    return this.props.children;
  }
}
