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
  items: readonly T[];
  getId: (item: T) => string;
  children: (props: SelectionRenderProps<T>) => ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState<
    number | null
  >(null);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={getId(item)}>
          {children({
            item,
            isSelected: selectedIndex === index,
            onSelect: () => setSelectedIndex(index),
          })}
        </li>
      ))}
    </ul>
  );
}

export interface Member {
  readonly id: string;
  readonly name: string;
}

export function MemberPicker({
  members,
}: {
  members: readonly Member[];
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
