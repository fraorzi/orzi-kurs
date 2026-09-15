import { Component, type ReactNode } from "react";

export interface Widget {
  id: string;
  title: string;
  version: number;
  render: () => ReactNode;
}

interface BoundaryProps {
  children: ReactNode;
  onError: (error: unknown) => void;
}

interface BoundaryState {
  hasError: boolean;
}

class DashboardBoundary extends Component<
  BoundaryProps,
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Panel niedostępny</p>;
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
  widgets: Widget[];
  onWidgetError: (id: string, error: unknown) => void;
}) {
  return (
    <DashboardBoundary
      onError={(error) => onWidgetError("dashboard", error)}
    >
      {widgets.map((widget) => (
        <WidgetView key={widget.id} widget={widget} />
      ))}
    </DashboardBoundary>
  );
}
