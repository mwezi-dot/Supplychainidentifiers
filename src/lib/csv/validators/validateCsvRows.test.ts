import { describe, expect, it } from "vitest";
import { polesSchema } from "@/lib/csv/schema/polesSchema";
import { validateCsvRows } from "./validateCsvRows";

describe("validateCsvRows", () => {
  it("returns no errors for valid rows", () => {
    const rows = [{ pole_id: "P-1", lat: "-15.4", lon: "28.2" }];
    expect(validateCsvRows(rows, polesSchema)).toEqual([]);
  });

  it("returns errors for missing required fields", () => {
    const rows = [{ pole_id: "", lat: "x", lon: "" }];
    const errors = validateCsvRows(rows, polesSchema);
    expect(errors.length).toBeGreaterThan(0);
  });
});
