import type { CsvColumnDefinition } from "@/lib/csv/schema/polesSchema";

export interface CsvValidationError {
  row: number;
  field: string;
  message: string;
}

/**
 * Validates CSV rows against required columns and returns row-level errors.
 */
export function validateCsvRows(
  rows: Record<string, string>[],
  schema: CsvColumnDefinition[],
): CsvValidationError[] {
  const errors: CsvValidationError[] = [];

  rows.forEach((row, index) => {
    for (const column of schema) {
      if (column.required && (!row[column.name] || row[column.name].trim().length === 0)) {
        errors.push({
          row: index + 2,
          field: column.name,
          message: `Missing required field: ${column.name}`,
        });
      }
    }

    if (row.lat && Number.isNaN(Number(row.lat))) {
      errors.push({ row: index + 2, field: "lat", message: "lat must be numeric" });
    }
    if (row.lon && Number.isNaN(Number(row.lon))) {
      errors.push({ row: index + 2, field: "lon", message: "lon must be numeric" });
    }
  });

  return errors;
}
