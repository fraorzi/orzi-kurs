type PickPath<Model, Path extends string> =
  Path extends `${infer Head}.${infer Rest}`
    ? Head extends keyof Model
      ? {
          [Key in keyof Pick<Model, Head>]: PickPath<
            NonNullable<Model[Key]>,
            Rest
          >;
        }
      : unknown
    : Path extends keyof Model
      ? Pick<Model, Path>
      : unknown;

type UnionToIntersection<Union> =
  (
    Union extends unknown
      ? (value: Union) => void
      : never
  ) extends (value: infer Intersection) => void
    ? Intersection
    : never;

type DeepSimplify<Value> =
  Value extends Date
    ? Value
    : Value extends readonly unknown[]
    ? Value
    : Value extends object
      ? { [Key in keyof Value]: DeepSimplify<Value[Key]> }
      : Value;

export type DeepPick<Model, Paths extends string> = DeepSimplify<
  UnionToIntersection<
    Paths extends unknown ? PickPath<Model, Paths> : never
  >
>;
