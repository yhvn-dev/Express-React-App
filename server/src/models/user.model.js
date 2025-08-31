import { pool } from "../config/db.js";


export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0]; 
}


export async function descTable() {
  const [rows] = await pool.query("DESC users");
  return rows;
}


export async function deleteUser(id) {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
}

export async function updateUser(id, username, firstname, lastname, password) {
  const [result] = await pool.query(
    "UPDATE users SET username = ?, firstname = ?, lastname = ?, password = ? WHERE id = ?",
    [username, firstname, lastname, password, id]
  );
  return result;
}


// ✅ Insert new user
export async function insertUsers(username, firstname, lastname, password) {
  const [result] = await pool.query(
    "INSERT INTO users (username, firstname, lastname, password) VALUES (?, ?, ?, ?)",
    [username, firstname, lastname, password]
  );

  const id = result.insertId;
  return getUser(id); 

}
