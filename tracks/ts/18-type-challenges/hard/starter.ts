export type DeepPick<Model, Paths extends string> = Pick<
  Model,
  Extract<Paths, keyof Model>
>;
