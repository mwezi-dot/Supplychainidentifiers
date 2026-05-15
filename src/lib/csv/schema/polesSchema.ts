export interface CsvColumnDefinition {
  name: string;
  required: boolean;
}

export const polesSchema: CsvColumnDefinition[] = [
  { name: "pole_id", required: true },
  { name: "lat", required: true },
  { name: "lon", required: true },
  { name: "height_m", required: false },
  { name: "material", required: false },
  { name: "install_date", required: false },
  { name: "region", required: false },
  { name: "grid_x", required: false },
  { name: "grid_y", required: false },
];
