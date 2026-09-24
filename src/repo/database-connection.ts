import { Database } from "./db";

export const db = Database.Connection({
    dbName: "user_ecommerce",
    userName: "User",
    password: "sept",
    host: "localhost"
})
