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
  lg: 12,
  xl: 16,
  pill: 999
} as const;

export const borders = {
  card: {
    borderColor: "border",
    borderWidth: 1,
    borderRadius: 8
  },
  trustCard: {
    borderColor: "palm",
    borderWidth: 1,
    borderRadius: 8
  }
} as const;

export const shadows = {
  card: {
    shadowColor: "#2e3132",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 1
  },
  elevated: {
    shadowColor: "#2e3132",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6
    },
    elevation: 2
  }
} as const;

export const layout = {
  pagePadding: 20,
  sectionGap: 28
} as const;

export type ThemeMode = "light" | "dark";

const themePalettes = {
  light: {
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
    limestone: "#edeeef",
    border: "#c1c8c2"
  },
  dark: {
    canvas: "#121212",
    surface: "#1e1e1e",
    elevated: "#2a2a2a",
    ink: "#f5f5f5",
    inkSoft: "#a3a3a3",
    line: "#404040",
    sand: "#2d2d26",
    dune: "#4a4a40",
    palm: "#5eead4",
    palmSoft: "#99f6db",
    clay: "#fbbf24",
    mist: "#134e4a",
    mistStrong: "#115e59",
    success: "#34d399",
    warning: "#fbbf24",
    rose: "#7f1d1d",
    roseSoft: "#451a1a",
    dusk: "#737373",
    teal: "#5eead4",
    amber: "#fbbf24",
    amberSoft: "#422006",
    limestone: "#262626",
    border: "#404040"
  }
} as const;

export const palette = themePalettes.light;

export const themeColors = {
  light: {
    canvas: themePalettes.light.canvas,
    surface: themePalettes.light.surface,
    elevated: themePalettes.light.elevated,
    ink: themePalettes.light.ink,
    inkSoft: themePalettes.light.inkSoft,
    line: themePalettes.light.line,
    border: themePalettes.light.border,
    sand: themePalettes.light.sand,
    dune: themePalettes.light.dune,
    palm: themePalettes.light.palm,
    palmSoft: themePalettes.light.palmSoft,
    clay: themePalettes.light.clay,
    mist: themePalettes.light.mist,
    mistStrong: themePalettes.light.mistStrong,
    success: themePalettes.light.success,
    warning: themePalettes.light.warning,
    rose: themePalettes.light.rose,
    roseSoft: themePalettes.light.roseSoft,
    dusk: themePalettes.light.dusk,
    teal: themePalettes.light.teal,
    amber: themePalettes.light.amber,
    amberSoft: themePalettes.light.amberSoft,
    limestone: themePalettes.light.limestone
  },
  dark: {
    canvas: themePalettes.dark.canvas,
    surface: themePalettes.dark.surface,
    elevated: themePalettes.dark.elevated,
    ink: themePalettes.dark.ink,
    inkSoft: themePalettes.dark.inkSoft,
    line: themePalettes.dark.line,
    border: themePalettes.dark.border,
    sand: themePalettes.dark.sand,
    dune: themePalettes.dark.dune,
    palm: themePalettes.dark.palm,
    palmSoft: themePalettes.dark.palmSoft,
    clay: themePalettes.dark.clay,
    mist: themePalettes.dark.mist,
    mistStrong: themePalettes.dark.mistStrong,
    success: themePalettes.dark.success,
    warning: themePalettes.dark.warning,
    rose: themePalettes.dark.rose,
    roseSoft: themePalettes.dark.roseSoft,
    dusk: themePalettes.dark.dusk,
    teal: themePalettes.dark.teal,
    amber: themePalettes.dark.amber,
    amberSoft: themePalettes.dark.amberSoft,
    limestone: themePalettes.dark.limestone
  }
} as const;
