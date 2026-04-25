export const palette = {
  canvas: "#f5efe6",
  surface: "#fcf9f4",
  elevated: "#fffdfa",
  ink: "#172320",
  inkSoft: "#576663",
  line: "#d5c8b8",
  sand: "#e8d8bf",
  dune: "#cda57a",
  palm: "#23453d",
  palmSoft: "#3d6359",
  clay: "#bd6546",
  mist: "#eef3ef",
  mistStrong: "#dfe9e2",
  success: "#2d6a4f",
  warning: "#9d5f1c",
  rose: "#f5ddd7",
  roseSoft: "#f9ebe7",
  dusk: "#6c7d79"
} as const;

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 40
} as const;

export const radii = {
  sm: 12,
  md: 18,
  lg: 28,
  pill: 999
} as const;

export const shadows = {
  card: {
    shadowColor: "#7f6d57",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 3
  }
} as const;

export const layout = {
  pagePadding: 20,
  sectionGap: 28
} as const;
