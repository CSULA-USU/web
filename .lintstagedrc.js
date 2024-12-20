module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  '**/*.(ts|tsx)': filenames => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],

  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
  '**/*.(css|scss)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
};