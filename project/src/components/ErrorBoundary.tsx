import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import GlassCard from './GlassCard';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error: Error | null }> = ({ error }) => {
  const { theme } = useTheme();

  return (
    <GlassCard className="p-6 max-w-lg mx-auto mt-8">
      <div className="text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 mx-auto ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors duration-200`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Page</span>
        </button>
      </div>
    </GlassCard>
  );
};

export default ErrorBoundaryClass;