export function VirtualLog({
  items,
  rowHeight,
  viewportHeight,
}: {
  items: readonly string[];
  rowHeight: number;
  viewportHeight: number;
  scrollTop: number;
  overscan: number;
}) {
  return (
    <div
      role="list"
      aria-label="Logi"
      style={{ height: viewportHeight, overflowY: "auto" }}
    >
      {items.map((item, index) => (
        <div
          key={item}
          role="listitem"
          aria-posinset={index + 1}
          aria-setsize={items.length}
          style={{ height: rowHeight }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
