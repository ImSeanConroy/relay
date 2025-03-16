import User from "../repositories/user.repository.js";
import { InternalServerException } from "../utils/catch-error.js";

/**
 * Fetch all users.
 */
const getAll = async () => {
  try {
    const users = await User.getUsers();
    return users;
  } catch (error) {
    throw new InternalServerException("Error fetching users");
  }
};

/**
 * Fetch a user by ID.
 */
const findById = async (id: string) => {
  try {
    const user = await User.getUserById(id);
    return user;
  } catch (error) {
    throw new InternalServerException("Error fetching user by id");
  }
};

/**
 * Fetch a user by email.
 */
const findByEmail = async (email: string) => {
  try {
    const user = await User.getUserByEmail(email);
    return user;
  } catch (error) {
    throw new InternalServerException("Error fetching user by email");
  }
};

/**
 * Create a new message.
 */
const create = async (
  fullname: string,
  email: string,
  password: string,
  profilePicture: string
) => {
  try {
    const user = await User.createUser(
      fullname,
      email,
      password,
      profilePicture
    );
    return user;
  } catch (error) {
    throw new InternalServerException("Error creating user");
  }
};

/**
 * Update a user.
 */
const update = async (
  id: string,
  fullname: string,
  email: string,
  profilePicture: string,
  status: string
) => {
  try {
    const user = await User.updateUser(
      id,
      fullname,
      email,
      profilePicture,
      status
    );
    return user;
  } catch (error) {
    throw new InternalServerException("Error updating user");
  }
};

/**
 * Hard delete a user by ID.
 */
const hardDelete = async (id: string) => {
  try {
    const user = await User.deleteUser(id);
    return user;
  } catch (error) {
    throw new InternalServerException("Error deleting user");
  }
};

export default { getAll, findById, findByEmail, create, update, hardDelete };
