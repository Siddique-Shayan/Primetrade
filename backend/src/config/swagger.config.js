import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {

    definition: {
        openapi: "3.0.0",

        info: {
            title: "Primetrade Backend API",
            version: "1.0.0",
            description:
                "REST API documentation for Primetrade backend assignment"
        },

        servers: [
            {
                url: "http://localhost:8000/api/v1"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

export {
    swaggerUi,
    swaggerSpec
};