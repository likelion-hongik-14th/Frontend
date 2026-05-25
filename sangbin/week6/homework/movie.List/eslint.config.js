import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";


import { defineConfig } from "eslint/config";
import { rules } from "eslint-plugin-react-hooks";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {rules: {
    'react/react-in-jsx-scope' : 'off',
     'react/prop-types': 'off', 
    }}
]);
