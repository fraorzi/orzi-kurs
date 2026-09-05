export function VirtualLog({
  items,
  rowHeight,
  viewportHeight,
  scrollTop,
  overscan,
}: {
  items: readonly string[];
  rowHeight: number;
  viewportHeight: number;
  scrollTop: number;
  overscan: number;
}) {
  const start = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - overscan,
  );
  const end = Math.min(
    items.length,
    Math.ceil((scrollTop + viewportHeight) / rowHeight) +
      overscan,
  );

  return (
    <div
      role="list"
      aria-label="Logi"
      style={{ height: viewportHeight, overflowY: "auto" }}
    >
      <div
        style={{
          height: items.length * rowHeight,
          position: "relative",
        }}
      >
        {items.slice(start, end).map((item, offset) => {
          const index = start + offset;
          return (
            <div
              key={item}
              role="listitem"
              aria-posinset={index + 1}
              aria-setsize={items.length}
              style={{
                height: rowHeight,
                position: "absolute",
                top: index * rowHeight,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
