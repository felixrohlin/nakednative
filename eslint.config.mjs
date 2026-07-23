import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendor design-system export, not app code.
    "design/**",
  ]),
  {
    rules: {
      // Literal[value=...] matches string/number literals but not template
      // literals — a raw token typed inside a `${}`-style template (e.g. the
      // DS's own Input.jsx border style) would slip through undetected. Each
      // rule below is paired with a TemplateElement[value.raw=...] twin
      // matching the same pattern against a template literal's static text.
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Raw hex color — use a design-system color token via var().",
        },
        {
          selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Raw hex color — use a design-system color token via var().",
        },
        {
          selector: "Literal[value=/\\b\\d+px\\b/]",
          message: "Raw px value — use a design-system spacing token via var().",
        },
        {
          selector: "TemplateElement[value.raw=/\\b\\d+px\\b/]",
          message: "Raw px value — use a design-system spacing token via var().",
        },
        {
          selector: "Literal[value=/var\\(--nn-/]",
          message:
            "Raw primitive token (--nn-*) — use a semantic token via var() instead (e.g. --accent-primary, --text-primary). Primitive tokens are only referenced inside styles/tokens/colors.css.",
        },
        {
          selector: "TemplateElement[value.raw=/var\\(--nn-/]",
          message:
            "Raw primitive token (--nn-*) — use a semantic token via var() instead (e.g. --accent-primary, --text-primary). Primitive tokens are only referenced inside styles/tokens/colors.css.",
        },
        {
          selector: "Literal[value=/font-family\\s*:\\s*(?!['\"]?(?:Jost|Work Sans))/i]",
          message: "Font not provided by the design system. Available: Jost, Work Sans.",
        },
        {
          selector: "TemplateElement[value.raw=/font-family\\s*:\\s*(?!['\"]?(?:Jost|Work Sans))/i]",
          message: "Font not provided by the design system. Available: Jost, Work Sans.",
        },
      ],
    },
  },
]);

export default eslintConfig;
