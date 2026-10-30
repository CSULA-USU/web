module.exports = {
  // One key per glob: a second key for the same glob silently replaces the
  // first, which is how the type check went unrun for a long stretch. tsc
  // takes no filenames because it has to check the whole project — passing
  // files to it would ignore tsconfig.json.
  '**/*.(ts|tsx)': (filenames) => [
    'yarn tsc --noEmit',
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
  '**/*.(css|scss)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
