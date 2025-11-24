import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully!");
    connection.release();
  } catch (err: unknown) {
    console.error("Error connecting to MySQL:", (err as Error).message);
  }
})();

const useUsername = async (username: string) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM user WHERE BINARY username = ? LIMIT 1",
      [username]
    );
    return rows;
}

export {pool, useUsername};