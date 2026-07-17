import { describe, expect, it } from "vitest"; import { buildRows } from "./starter";
describe("maintenance quality", () => { it("zachowuje identity i dostępną nazwę", () => { expect(buildRows([{ id: "i2", ownerId: "u1", title: "Drugi" }], [{ id: "u1", name: "Ada" }])).toEqual([{ key: "i2", title: "Drugi", owner: "Ada", actionLabel: "Edytuj Drugi" }]); }); });

