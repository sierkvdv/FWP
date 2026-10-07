/* Laadt de filmlijst uit src/data/films.ts voor node-scripts (zonder aparte build-stap). */
const fs = require('fs');
const ts = require('typescript');

require.extensions['.ts'] = (mod, bestand) => {
  const bron = fs.readFileSync(bestand, 'utf8');
  const { outputText } = ts.transpileModule(bron, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true },
  });
  mod._compile(outputText, bestand);
};

module.exports = require('../src/data/films.ts');
