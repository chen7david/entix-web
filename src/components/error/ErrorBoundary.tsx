import { Component, ErrorInfo, ReactNode } from "react";
import { Button, Result, Typography } from "antd";
import { GithubOutlined, BugOutlined, ReloadOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

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
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";
      const error = this.state.error;
      const errorInfo = this.state.errorInfo;

      return (
        <Result
          icon={<BugOutlined style={{ fontSize: 48, color: "#ff4d4f" }} />}
          status="error"
          title="Something went wrong"
          subTitle={
            isDev
              ? error?.message
              : "An unexpected error occurred. Please try again."
          }
          extra={[
            <Button
              key="retry"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={this.resetError}
            >
              Try Again
            </Button>,
            isDev && (
              <Button
                key="report"
                icon={<GithubOutlined />}
                href="https://github.com/chen7david/entix-web/issues/new"
                target="_blank"
              >
                Report Bug
              </Button>
            ),
          ]}
        >
          {isDev && error && (
            <div className="mt-8">
              <Paragraph>
                <Text strong>Error Details (Development Only):</Text>
              </Paragraph>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Paragraph>
                  <Text code>{error.name}</Text>: {error.message}
                </Paragraph>
                {error.stack && (
                  <Paragraph>
                    <Text type="secondary">Stack Trace:</Text>
                    <pre className="mt-2 text-xs overflow-auto max-h-[200px] p-2 bg-gray-100 rounded">
                      {error.stack}
                    </pre>
                  </Paragraph>
                )}
                {errorInfo?.componentStack && (
                  <Paragraph>
                    <Text type="secondary">Component Stack:</Text>
                    <pre className="mt-2 text-xs overflow-auto max-h-[200px] p-2 bg-gray-100 rounded">
                      {errorInfo.componentStack}
                    </pre>
                  </Paragraph>
                )}
              </div>
            </div>
          )}
        </Result>
      );
    }

    return this.props.children;
  }
}
