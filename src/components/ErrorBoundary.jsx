import { Component } from "react";

/**
 * Top-level error boundary. Prevents a single render error from blanking the
 * whole page and gives the user a recovery path.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught render error:", error, info);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              The page hit an unexpected error. You can try reloading.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                background: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
