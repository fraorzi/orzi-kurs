import {
  Component,
  Suspense,
  use,
  useState,
  type ReactNode,
} from "react";

export interface Report {
  readonly title: string;
}

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly onRetry: () => void;
  readonly resetKey: Promise<Report>;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

class ReportErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (
      previousProps.resetKey !== this.props.resetKey &&
      this.state.hasError
    ) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p role="alert">Nie udało się wczytać raportu.</p>
          <button type="button" onClick={this.props.onRetry}>
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ReportContent({
  reportPromise,
}: {
  readonly reportPromise: Promise<Report>;
}) {
  const report = use(reportPromise);
  return <h2>{report.title}</h2>;
}

export function ReportPanel({
  loadReport,
}: {
  readonly loadReport: () => Promise<Report>;
}) {
  const [reportPromise] = useState(() => loadReport());

  return (
    <ReportErrorBoundary
      resetKey={reportPromise}
      onRetry={() => {
        loadReport();
      }}
    >
      <Suspense fallback={<p role="status">Ładowanie raportu…</p>}>
        <ReportContent reportPromise={reportPromise} />
      </Suspense>
    </ReportErrorBoundary>
  );
}
