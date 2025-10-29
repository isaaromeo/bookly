import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
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
        "primary.50":   { "value": "#EAF1F8" },
  "primary.100":  { "value": "#CBDDEE" },
  "primary.200":  { "value": "#AAC7E2" },
  "primary.300":  { "value": "#88B0D5" },
  "primary.400":  { "value": "#729FCB" },
  "primary.500":  { "value": "#6785AB" },
  "primary.600":  { "value": "#597293" },
  "primary.700":  { "value": "#4A5E7B" },
  "primary.800":  { "value": "#3C4A63" },
  "primary.900":  { "value": "#2D364B" },

  "secondary.50":  { "value": "#E9F4F3" },
  "secondary.100": { "value": "#CBE7E4" },
  "secondary.200": { "value": "#ACD9D4" },
  "secondary.300": { "value": "#8ECBC4" },
  "secondary.400": { "value": "#7FBFB7" },
  "secondary.500": { "value": "#7BA6A2" },
  "secondary.600": { "value": "#6A908C" },
  "secondary.700": { "value": "#587A76" },
  "secondary.800": { "value": "#476460" },
  "secondary.900": { "value": "#354E4A" },

        "colorScheme.brand": { value: "{colors.brand.500}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

console.log("System creado:", system);
console.log("Colores disponibles:", system.tokens.colors);
// const config = defineConfig({
//   theme: {
//     tokens: {
//       colors: {
         
//         brand: {
//           50: { value: "#f0e6ff" },
//           100: { value: "#d4bfff" },
//           200: { value: "#b899ff" },
//           300: { value: "#9d73ff" },
//           400: { value: "#814dff" },
//           500: { value: "#836e99" }, 
//           600: { value: "#6a5a7d" },
//           700: { value: "#514761" },
//           800: { value: "#383445" },
//           900: { value: "#1f2129" },
//         },
//         primary: {
//           500: { value: "#836e99" },
//           600: { value: "#6a5a7d" },
//         },
//         secondary: {
//           500: { value: "#d53f8c" },
//         },
//         accent: {
//           500: { value: "#22c55e" },
//         },
//       },
//     },
//     semanticTokens: {
//       colors: {

//         "bg.canvas": { value: "{colors.gray.50}" },
//         "bg.surface": { value: "{colors.white}" },
//       },
//     },
//   },
// });

// export const system = createSystem(defaultConfig, config);
