import eslint_config from '@massimo-cassandro/eslint-config';

// https://github.com/cybozu/eslint-config
// import cybozuEslintConfigBaseline from '@cybozu/eslint-config/flat/presets/css-baseline.js';


export default [

  // ...cybozuEslintConfigBaseline.map((config) => ({
  //   ...config,
  //   files: ['**/*.css']
  // })),

  ...eslint_config,
  {
    // files: ['src/**/*.js'],
    ignores: [
      'archived/',
      'node_modules/'
    ],
  }
  // {
  //   languageOptions: {
  //     globals: {
  //       jQuery: 'readonly',
  //       $: 'readonly',
  //     },
  //   },
  // },
];
