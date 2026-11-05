/**
 * Jest transformer for ESM-only packages in node_modules, used for `jotai`.
 *
 * Why not the ts-jest `.js` entry the other ESM packages go through: ts-jest
 * caches one compiler config per Jest config, not per transform entry, so the
 * options on every ts-jest entry in package.json are ignored in favor of
 * tsconfig.json — and its `target: es5` compiles `for…of` over a Set into an
 * index loop over `.length`, which a Set does not have. Jotai keeps its store
 * listeners in Sets, so under ES5 every subscription silently never fires:
 * components render their first value and never update. This compiles to
 * CommonJS (all Jest's runtime here accepts) at a target Node runs natively.
 *
 * Only Jest uses this. Next compiles node_modules with SWC and is unaffected.
 */
const crypto = require('crypto');
const fs = require('fs');
const ts = require('typescript');

const thisFile = fs.readFileSync(__filename, 'utf8');

module.exports = {
  process(sourceText, sourcePath) {
    const { outputText, sourceMapText } = ts.transpileModule(sourceText, {
      fileName: sourcePath,
      compilerOptions: {
        allowJs: true,
        esModuleInterop: true,
        module: ts.ModuleKind.CommonJS,
        sourceMap: true,
        target: ts.ScriptTarget.ES2020,
      },
    });
    return { code: outputText, map: sourceMapText };
  },

  /* Without this, Jest keys its cache on file content alone and would keep
     serving output from an older version of this transformer. */
  getCacheKey(sourceText, sourcePath) {
    return crypto
      .createHash('sha256')
      .update(thisFile)
      .update(ts.version)
      .update(sourcePath)
      .update(sourceText)
      .digest('hex');
  },
};
