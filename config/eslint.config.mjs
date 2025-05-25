import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * WebNode Base ESlint config
 * 
 * @example
 * import webnodeEslint from "@webnode-ecosystem/eslint-config";
 * 
 * export default defineConfig([
 *   ...webnodeEslint.config.recommended,
 * ]);
*/
export default {
    config: {

        /**
         * @type {import("eslint").Linter.FlatConfig[]}
         */
        recommended: [
            {
                ignores: [".nx", "dist/", "tmp/", "out-tsc/", "tsconfig.json", "tsconfig.*.json"]
            },
            // Base JavaScript and TypeScript common configurations
            {
                files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.tsx"],
                languageOptions: {
                    globals: globals.node
                },
                plugins: {
                    jsdoc // Ensure JSDoc plugin is available
                },
                extends: [js.configs.recommended] // Apply ESLint's recommended JS rules
            },
            // JSDoc recommended flat config
            jsdoc.configs['flat/recommended'],

            // TypeScript recommended configurations (this is an array, so spread it)
            ...tseslint.configs.recommended,

            // JSON, JSONC, JSON5 files - @eslint/json handles these
            // json.configs.recommended is a pre-configured object for JSON files.
            json.configs.recommended,

            // Markdown files - @eslint/markdown handles these
            // markdown.configs.recommended is a pre-configured object for Markdown.
            markdown.configs.recommended,
            
            // Prettier config should be last to override other styling rules.
            // For eslint-config-prettier v9+ (recommended for flat config),
            // use the direct import.
            eslintConfigPrettier,
        ]
    }
}