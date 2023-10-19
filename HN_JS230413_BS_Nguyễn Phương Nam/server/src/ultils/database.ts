import mysql2, { PoolOptions, Pool } from "mysql2";

const databaseConfig: PoolOptions = {
  database: "todo_list",
  port: 3306,
  user: "root",
  password: "",
  host: "localhost",
};

const database: Pool = mysql2.createPool(databaseConfig);

export default database.promise();
