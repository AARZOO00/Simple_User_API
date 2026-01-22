import { prisma } from "../utils/prisma";
import type { User } from "@prisma/client";

// Create user
export const create = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  return prisma.user.create({
    data,
  });
};

// Get all users
export const findAll = async (): Promise<Omit<User, "password">[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Get user by ID
export const findById = async (
  id: number
): Promise<Omit<User, "password"> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Get user by email
export const findByEmail = async (
  email: string
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Update user
export const update = async (
  id: number,
  data: Partial<Pick<User, "name" | "email">>
): Promise<Omit<User, "password">> => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Delete user
export const remove = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};
