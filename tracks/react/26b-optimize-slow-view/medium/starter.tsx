import {
  Profiler,
  type ProfilerOnRenderCallback,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};
const ignoreRows = () => ignoreRender;

export interface Product {
  readonly id: string;
  readonly name: string;
}

function ProductRow({
  onRender,
  onSelect,
  product,
  selected,
}: {
  readonly onRender: ProfilerOnRenderCallback;
  readonly onSelect: (id: string) => void;
  readonly product: Product;
  readonly selected: boolean;
}) {
  return (
    <Profiler id={product.id} onRender={onRender}>
      <li>
        <button
          type="button"
          aria-pressed={selected}
          onClick={() => onSelect(product.id)}
        >
          {product.name}
        </button>
      </li>
    </Profiler>
  );
}

export function ProductGrid({
  products,
  onRowRender = ignoreRows,
}: {
  readonly products: readonly Product[];
  readonly onRowRender?: (id: string) => ProfilerOnRenderCallback;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section aria-label="Produkty">
      <p role="status">Wybrano: {selectedId ?? "brak"}</p>
      <ul>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            selected={product.id === selectedId}
            onSelect={(id) => setSelectedId(id)}
            onRender={onRowRender(product.id)}
          />
        ))}
      </ul>
    </section>
  );
}

