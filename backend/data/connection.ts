import { createPool } from "mysql2/promise";

const pool = createPool ({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "auctionhouse"
});

export const connection = pool.getConnection();