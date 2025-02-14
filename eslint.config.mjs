import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  //disable the rule that  @typescript-eslint/no-explicit-any
  "no-explicit-any",
   "off",
   //diable @typescript-eslint/no-unused-vars
    "no-unused-vars",
];

export default eslintConfig;
