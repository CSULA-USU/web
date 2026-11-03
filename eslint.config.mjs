import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const unusedVarsOptions = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
};

export default [
  { ignores: ['src/scripts/**'] },

  ...nextCoreWebVitals,

  // Rules only: eslint-config-next already registers the jsx-a11y plugin, and
  // ESLint refuses a second registration under the same name.
  { rules: jsxA11y.flatConfigs.recommended.rules },

  // Turns off formatting rules that would fight Prettier, so it goes after
  // every config that might enable one.
  prettierConfig,

  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'error',
        { ...unusedVarsOptions, caughtErrorsIgnorePattern: '^_' },
      ],
      // React Compiler rules that eslint-plugin-react-hooks 7 turned on as
      // errors. They flag about 60 existing sites, none introduced by the
      // Next 16 upgrade that brought the plugin in, so they warn until those
      // sites are refactored in their own change. Promote each back to
      // 'error' once its count reaches zero.
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // The base rule misreads type-only names, so TypeScript files use the
      // typescript-eslint version instead.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', unusedVarsOptions],
    },
  },
];
