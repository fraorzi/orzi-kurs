export type InvalidationIntent = {
  readonly origin: "server-action" | "route-handler";
  readonly freshness: "immediate" | "background";
  readonly target:
    | { readonly kind: "tag"; readonly value: string }
    | {
        readonly kind: "path";
        readonly value: string;
        readonly pathType?: "page" | "layout";
      };
};

export type InvalidationCommand =
  | { readonly api: "updateTag"; readonly args: readonly [string] }
  | {
      readonly api: "revalidateTag";
      readonly args: readonly [string, "max" | { readonly expire: 0 }];
    }
  | {
      readonly api: "revalidatePath";
      readonly args: readonly [string] | readonly [string, "page" | "layout"];
    };

export function planInvalidation(intent: InvalidationIntent): InvalidationCommand {
  return { api: "revalidatePath", args: [intent.target.value] };
}
