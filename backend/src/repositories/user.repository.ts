import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

const getUsers = async () => {
  const { rows } = await query("SELECT * FROM users;");
  return toCamelCase(rows);
};

const getUserById = async (id: string) => {
  const { rows } = await query("SELECT * FROM users WHERE id = $1;", [id]);
  return toCamelCase(rows)[0];
};

const getUserByEmail = async (email: string) => {
  const { rows } = await query("SELECT * FROM users WHERE email = $1;", [
    email,
  ]);
  return toCamelCase(rows)[0];
};

const createUser = async (
  fullname: string,
  email: string,
  password: string,
  profilePicture: string
) => {
  const { rows } = await query(
    "INSERT INTO users (fullname, email, password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *;",
    [fullname, email, password, profilePicture]
  );
  return toCamelCase(rows)[0];
};

const updateUser = async (
  id: string,
  fullname: string,
  email: string,
  profilePicture: string,
  status: string
) => {
  const { rows } = await query(
    "UPDATE users SET fullname = $1, email = $2, profile_picture = $3, status = $4 WHERE id = $5 RETURNING *;",
    [fullname, email, profilePicture, status, id]
  );
  return toCamelCase(rows)[0];
};

const deleteUser = async (id: string) => {
  return await query("DELETE FROM users WHERE id = $1", [id]);
};

// =================

const findByIdAndUpdate = async (
  id: string,
  updates: {
    fullname?: string;
    email?: string;
    profilePicture?: string;
    status?: string;
    email_verified: boolean;
  }
) => {
  // Fetch the existing user
  const { rows } = await query("SELECT * FROM users WHERE id = $1;", [id]);
  const user = toCamelCase(rows)[0];

  if (!user) {
    throw new Error("User not found");
  }

  // Merge updates with existing user data
  const updatedUser = {
    fullname: updates.fullname || user.fullname,
    email: updates.email || user.email,
    profilePicture: updates.profilePicture || user.profilePicture,
    status: updates.status || user.status,
    emailVerified: updates.email_verified || user.emailVerified,
  };

  // Update the user in the database
  const { rows: updatedRows } = await query(
    "UPDATE users SET fullname = $1, email = $2, profile_picture = $3, status = $4, email_verified = $5 WHERE id = $6 RETURNING *;",
    [
      updatedUser.fullname,
      updatedUser.email,
      updatedUser.profilePicture,
      updatedUser.status,
      updatedUser.emailVerified,
      id,
    ]
  );

  return toCamelCase(updatedRows)[0];
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  findByIdAndUpdate,
};
