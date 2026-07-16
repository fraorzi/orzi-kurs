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
  if (intent.target.kind === "path") {
    if (intent.target.value.includes("[") && !intent.target.pathType) {
      throw new Error("Dynamiczny wzorzec ścieżki wymaga pathType");
    }

    return intent.target.pathType
      ? {
          api: "revalidatePath",
          args: [intent.target.value, intent.target.pathType],
        }
      : { api: "revalidatePath", args: [intent.target.value] };
  }

  if (intent.freshness === "background") {
    return { api: "revalidateTag", args: [intent.target.value, "max"] };
  }

  return intent.origin === "server-action"
    ? { api: "updateTag", args: [intent.target.value] }
    : {
        api: "revalidateTag",
        args: [intent.target.value, { expire: 0 }],
      };
}
