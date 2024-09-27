import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser, 
    parserOptions: {
      ecmaVersion: 6, // Set ECMAScript version to 6
    },
   }},
  pluginReact.configs.flat.recommended,
];