import { Component } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error boundary that catches unexpected rendering errors and displays a fallback UI.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error internally if needed
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-xl mx-auto my-8 p-4">
          <Alert variant="destructive" className="border border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-base font-semibold">Something went wrong</AlertTitle>
            <AlertDescription className="mt-2 text-sm text-foreground/80 space-y-4">
              <p>
                An unexpected error occurred while rendering the Markdown content. Please check if the file format is valid.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleReset}
                className="mt-2 gap-2 border-destructive/30 cursor-pointer hover:bg-destructive/20 text-foreground"
              >
                <RefreshCw className="h-4 w-4" />
                Reset & Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
