const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'My API',
version: '1.0.0',
description: 'My API Description',
},
};

const options = {
swaggerDefinition,
apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;