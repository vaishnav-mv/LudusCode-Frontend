import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
        fallback ?? (
          <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="max-w-md w-full bg-secondary p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-red-400 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-text-secondary mb-4">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              {error && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-highlight hover:underline">
                    Error Details
                  </summary>
                  <pre className="mt-2 p-2 bg-primary rounded text-xs text-text-secondary overflow-auto">
                    {error.toString()}
                  </pre>
                </details>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={this.handleReset}
                  className="flex-1 bg-highlight text-white py-2 px-4 rounded hover:bg-opacity-90"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
