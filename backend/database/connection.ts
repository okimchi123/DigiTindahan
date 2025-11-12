import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
});

const useUsername = async (username: string) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM user WHERE BINARY username = ? LIMIT 1",
      [username]
    );
    return rows;
}

export {pool, useUsername};