import { useState, type ReactNode } from "react";

interface SelectionRenderProps<T> {
  item: T;
  isSelected: boolean;
  onSelect: () => void;
}

export function SelectionController<T>({
  items,
  getId,
  children,
}: {
  items: T[];
  getId: (item: T) => string;
  children: (props: SelectionRenderProps<T>) => ReactNode;
}) {
  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);

  return (
    <ul>
      {items.map((item) => {
        const id = getId(item);

        return (
          <li key={id}>
            {children({
              item,
              isSelected: selectedId === id,
              onSelect: () => setSelectedId(id),
            })}
          </li>
        );
      })}
    </ul>
  );
}

export interface Member {
  id: string;
  name: string;
}

export function MemberPicker({
  members,
}: {
  members: Member[];
}) {
  return (
    <SelectionController
      items={members}
      getId={(member) => member.id}
    >
      {({ item, isSelected, onSelect }) => (
        <button
          type="button"
          aria-pressed={isSelected}
          onClick={onSelect}
        >
          {item.name}
          {isSelected && " (wybrano)"}
        </button>
      )}
    </SelectionController>
  );
}
