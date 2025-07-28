module.exports = {
  '**/*.(ts|tsx)': filenames => [
    'yarn tsc --noEmit',
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],

  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
  '**/*.(css|scss)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
};