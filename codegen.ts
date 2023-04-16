import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://static.fussy.fun/api/schema.graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "lib/graphql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
