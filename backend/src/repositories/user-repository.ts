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
  const { rows } = await query("SELECT * FROM users WHERE email = $1;", [email]);
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

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
};
