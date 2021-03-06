// Swagger definition
const swaggerDefinition = {
  info: {
    title: "REST API for my App", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "This is the REST API for my product" // short description of the app
  },
  // host: 'localhost:2222', // the host or url of the app
  basePath: "/api/v1" // the basepath of your endpoint
};

// options for the swagger docs
export const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./swagger-docs/**/*.yaml"]
};
