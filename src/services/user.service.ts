const userRepository = require('../repositories/user.repository');
import { User } from '@prisma/client';
const { ApiError } = require('../middlewares/errorHandler');

// In a real app, you would hash the password
const hashPassword = async (password: string): Promise<string> => {
    // For this example, we'll just return the plain text password.
    // In production, use a library like bcrypt.
    return password;
};

exports.createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    // This is where you'd hash the password before saving
    const hashedPassword = await hashPassword(userData.password);
    
    const userToCreate = {
        ...userData,
        password: hashedPassword,
    };

    return userRepository.create(userToCreate);
};

exports.getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
    return userRepository.findAll();
};

exports.getUserById = async (id: number): Promise<Omit<User, 'password'> | null> => {
    return userRepository.findById(id);
};

exports.updateUser = async (id: number, userData: Partial<Pick<User, 'name' | 'email'>>): Promise<Omit<User, 'password'> | null> => {
    // Check if user exists first
    const existingUser = await userRepository.findById(id);
    if (!existingUser) {
        throw new ApiError(404, 'User not found');
    }

    return userRepository.update(id, userData);
};

exports.deleteUser = async (id: number): Promise<void> => {
    // Check if user exists first
    const existingUser = await userRepository.findById(id);
    if (!existingUser) {
        throw new ApiError(404, 'User not found');
    }

    await userRepository.remove(id);
};
