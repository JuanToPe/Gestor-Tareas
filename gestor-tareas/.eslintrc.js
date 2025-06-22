/** @type {import('eslint').Linter.Config} */

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Parser que entiende TypeScript
    parserOptions: {
        ecmaVersion: 2020, // Permite features modernos de JS
        sourceType: 'module', // Usa import/export
        project: ['./tsconfig.json'], // Para reglas avanzadas de TypeScript
    },
    plugins: ['@typescript-eslint'], // Habilita reglas para TS
    extends: [
        'eslint:recommended', // Reglas generales recomendadas
        'plugin:@typescript-eslint/recommended', // Buenas prácticas para TS
        'next/core-web-vitals' // Buenas prácticas específicas para Next.js
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn'], // Marca variables sin uso como advertencia
        'react/react-in-jsx-scope': 'off', // Desactiva la regla que pide React en JSX (Next ya no lo necesita)
        'semi': ['warn', 'always'], // Obliga a usar punto y coma
        'quotes': ['warn', 'single'] // Obliga a usar comillas simples
    }
}
