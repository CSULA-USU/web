const fs = require('fs');
const TJS = require('typescript-json-schema');

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

const sectionNames = getDirectories('src/sections');

// optionally pass argument to schema generator
const settings = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
};

const program = TJS.getProgramFromFiles(
  sectionNames.map((sectionName) => `src/sections/${sectionName}/props.ts`),
  compilerOptions,
);

// We can either get the schema for one file and one type...
// const schema = TJS.generateSchema(program, 'MyType', settings);

// ... or a generator that lets us incrementally get more schemas

const generator = TJS.buildGenerator(program, settings);

// generator can be also reused to speed up generating the schema if usecase allows:
// const schemaWithReusedGenerator = TJS.generateSchema(
//   program,
//   'MyType',
//   settings,
//   [],
//   generator,
// );

const schema = generator.getSchemaForSymbols(
  sectionNames.map((sectionName) => `${sectionName}Props`),
);

fs.writeFileSync('src/sections/schema.json', JSON.stringify(schema, null, 2));
