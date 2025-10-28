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

"colorScheme.brand": { value: "{colors.brand.500}" }
  }
}
}
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
