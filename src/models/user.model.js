const pool = require("../config/db");
const createUser = async (username, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

module.exports = { createUser };
