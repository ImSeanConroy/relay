import User from "../repositories/user.repository.js";

const getAll = async () => {
  try {
    const users = await User.getUsers();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

const findById = async (id: string) => {
  try {
    const user = await User.getUserById(id);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by id");
  }
};

const findByEmail = async (email: string) => {
  try {
    const user = await User.getUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
};

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
    throw new Error("Error creating user");
  }
};

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
    throw new Error("Error updating user");
  }
};

export default { getAll, findById, findByEmail, create, update };
