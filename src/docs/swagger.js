import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Controle de Vendas",
      version: "1.0.0",
      description: "API para controle de vendas diárias",
    },
  },
  apis: ["./src/routes/*.js"], // onde o swagger vai ler os comentários
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };