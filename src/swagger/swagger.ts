import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'CRM',
    description: 'Customer-RelationShip-Management apis'
  },
  host: 'localhost:5050'
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);