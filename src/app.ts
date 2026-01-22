const express = require('express');
import { Application, Request, Response } from 'express';
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./utils/swagger');
const userRoutes = require('./routes/user.routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the User Management API!');
});
app.use('/api', userRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
