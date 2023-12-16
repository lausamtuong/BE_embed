// @ts-check

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  useTabs: false,
  endOfLine: 'auto',
  overrides: [
    {
      files: '*',
      options: {
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
  ],
};
