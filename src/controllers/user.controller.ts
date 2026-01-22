import { Request, Response, NextFunction } from 'express';
const userService = require('../services/user.service');
const { ApiError } = require('../middlewares/errorHandler');

exports.createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        // Exclude password from the response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const user = await userService.getUserById(id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const user = await userService.updateUser(id, req.body);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        await userService.deleteUser(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
