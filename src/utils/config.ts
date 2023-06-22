const environment = process.env.NODE_ENV || 'production'
export const config = {
  type: process.env.db_type ?? "postgres",
  host: process.env.db_host ?? "localhost",
  port: parseInt(process.env.db_port) ?? 5432,
  database: process.env.db_database ?? "jbs",
  username: process.env.db_username ?? "postgres",
  password: process.env.db_password ?? "pass",
};
