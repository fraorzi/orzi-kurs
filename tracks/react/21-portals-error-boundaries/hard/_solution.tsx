import { Component, type ReactNode } from "react";

export interface Widget {
  readonly id: string;
  readonly title: string;
  readonly version: number;
  readonly render: () => ReactNode;
}

interface BoundaryProps {
  children: ReactNode;
  resetKey: number;
  title: string;
  widgetId: string;
  onError: (id: string, error: unknown) => void;
}

interface BoundaryState {
  readonly hasError: boolean;
}

class WidgetErrorBoundary extends Component<
  BoundaryProps,
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(this.props.widgetId, error);
  }

  componentDidUpdate(previousProps: BoundaryProps) {
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
        <p role="alert">
          Widget {this.props.title} niedostępny
        </p>
      );
    }

    return this.props.children;
  }
}

function WidgetView({ widget }: { widget: Widget }) {
  return (
    <section aria-label={widget.title}>
      <h2>{widget.title}</h2>
      {widget.render()}
    </section>
  );
}

export function Dashboard({
  widgets,
  onWidgetError,
}: {
  widgets: readonly Widget[];
  onWidgetError: (id: string, error: unknown) => void;
}) {
  return (
    <div>
      {widgets.map((widget) => (
        <WidgetErrorBoundary
          key={widget.id}
          resetKey={widget.version}
          title={widget.title}
          widgetId={widget.id}
          onError={onWidgetError}
        >
          <WidgetView widget={widget} />
        </WidgetErrorBoundary>
      ))}
    </div>
  );
}
