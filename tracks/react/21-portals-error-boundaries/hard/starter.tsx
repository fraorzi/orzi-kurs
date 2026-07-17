import {
  Component,
  type ReactNode,
} from "react";

export interface Widget {
  readonly id: string;
  readonly title: string;
  readonly version: number;
  readonly render: () => ReactNode;
}

interface BoundaryProps {
  readonly children: ReactNode;
  readonly onError: (error: unknown) => void;
}

interface BoundaryState {
  readonly hasError: boolean;
}

class DashboardBoundary extends Component<BoundaryProps, BoundaryState> {
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

function WidgetView({ widget }: { readonly widget: Widget }) {
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
  readonly widgets: readonly Widget[];
  readonly onWidgetError: (id: string, error: unknown) => void;
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
