type SegmentParams<Segment extends string> =
  Segment extends `:${infer Name}?`
    ? { [Key in Name]?: string }
    : Segment extends `:${infer Name}`
      ? { [Key in Name]: string }
      : Segment extends `*${infer Name}`
        ? { [Key in Name]: string[] }
        : unknown;

type Simplify<Value> = {
  [Key in keyof Value]: Value[Key];
};

export type RouteParams<Path extends string> =
  string extends Path
    ? Record<string, string | string[] | undefined>
    : Path extends `${infer Segment}/${infer Rest}`
      ? Simplify<SegmentParams<Segment> & RouteParams<Rest>>
      : SegmentParams<Path>;
