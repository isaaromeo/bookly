import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  conditions: {
    sm: "@media screen and (min-width: 540px)",
    md: "@media screen and (min-width: 768px)",
    lg: "@media screen and (min-width: 1024px)",
    xl: "@media screen and (min-width: 1280px)",
    "2xl": "@media screen and (min-width: 1536px)",
    customCol: "@media screen and (min-width: 478px) and (max-width: 600px)",
    tableMid: "@media screen and (min-width: 601px) and (max-width: 767px)",
  },
  theme: {
    tokens: {
      fontWeights: {
        thin: { value: "100" },
        extralight: { value: "200" },
        light: { value: "300" },
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
        black: { value: "900" },
      },
    },
    semanticTokens: {
      colors: {
        "brand.50": { value: "#f0e6ff" },
        "brand.100": { value: "#d4bfff" },
        "brand.200": { value: "#b899ff" },
        "brand.300": { value: "#9d73ff" },
        "brand.400": { value: "#814dff" },
        "brand.500": { value: "#836e99" },
        "brand.600": { value: "#6a5a7d" },
        "brand.700": { value: "#514761" },
        "brand.800": { value: "#383445" },
        "brand.900": { value: "#1f2129" },
        "primary.50": { value: "#85a5c5ff" },
        "primary.100": { value: "#CBDDEE" },
        "primary.200": { value: "#AAC7E2" },
        "primary.300": { value: "#88B0D5" },
        "primary.400": { value: "#729FCB" },
        "primary.500": { value: "#6785AB" },
        "primary.600": { value: "#597293" },
        "primary.700": { value: "#4A5E7B" },
        "primary.800": { value: "#3C4A63" },
        "primary.900": { value: "#2D364B" },

        "secondary.50": { value: "#E9F4F3" },
        "secondary.100": { value: "#CBE7E4" },
        "secondary.200": { value: "#ACD9D4" },
        "secondary.300": { value: "#8ECBC4" },
        "secondary.400": { value: "#7FBFB7" },
        "secondary.500": { value: "#7BA6A2" },
        "secondary.600": { value: "#6A908C" },
        "secondary.700": { value: "#587A76" },
        "secondary.800": { value: "#476460" },
        "secondary.900": { value: "#354E4A" },

        "muted.100": { value: "#a1a1aa" },
        "muted.200": { value: "#e5e5f0ff" },
        "muted.300": { value: "#a99ec4e1" },

        "colorScheme.brand": { value: "{colors.brand.500}" },
      },
    },
  },
});

// export const system = createSystem(defaultConfig, config);
const system = createSystem(defaultConfig, config);
system.breakpoints = {
  ...system.breakpoints,
  conditions: {
    ...system.breakpoints.conditions,
    xs: "@media screen and (min-width: 480px)",
    sm: "@media screen and (min-width: 542px)",
    md: "@media screen and (min-width: 768px)",
    lg: "@media screen and (min-width: 1024px)",
    xl: "@media screen and (min-width: 1280px)",
    "2xl": "@media screen and (min-width: 1536px)",
    customCol: "@media screen and (min-width: 478px) and (max-width: 600px)",
    tableMid: "@media screen and (min-width: 601px) and (max-width: 767px)",
  },
};

system.breakpoints.breakpoints = [
  "base",
  "xs",
  "customCol",
  "sm",
  "tableMid",
  "md",
  "lg",
  "xl",
  "2xl",
];
export { system };

// console.log("Breakpoints:", system.tokens.breakpoints);