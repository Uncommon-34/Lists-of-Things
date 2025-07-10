import postgres from "postgres";

//the database connection
export const sql = postgres({
  host: "192.168.7.14",
  port: 5431,
  database: "synoptic",
  username: "synoptic",
  password: "synoptic",
});
