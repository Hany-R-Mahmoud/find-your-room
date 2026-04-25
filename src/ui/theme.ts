export const palette = {
  canvas: "#f8f9fa",
  surface: "#ffffff",
  elevated: "#f3f4f5",
  ink: "#191c1d",
  inkSoft: "#414844",
  line: "#c1c8c2",
  sand: "#e1e4d2",
  dune: "#c5c8b7",
  palm: "#012d1d",
  palmSoft: "#346762",
  clay: "#8a4f00",
  mist: "#c1ecd4",
  mistStrong: "#a5d0b9",
  success: "#1b4332",
  warning: "#8a4f00",
  rose: "#ffdad6",
  roseSoft: "#fff2f0",
  dusk: "#717973",
  teal: "#346762",
  amber: "#ffb100",
  amberSoft: "#fff5dc",
  limestone: "#edeeef"
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
  sm: 4,
  md: 8,
  lg: 8,
  pill: 999
} as const;

export const shadows = {
  card: {
    shadowColor: "#2e3132",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 1
  }
} as const;

export const layout = {
  pagePadding: 20,
  sectionGap: 28
} as const;
