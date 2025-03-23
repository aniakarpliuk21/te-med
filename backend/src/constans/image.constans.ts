export type ImageConfigType = {
  size: number;
  types: string[];
};
export const fileConfig: ImageConfigType = {
  size: 1024 * 1024 * 2,
  types: ["image/bmp", "image/jpeg", "image/png", "image/x-png", "image/gif"],
};
