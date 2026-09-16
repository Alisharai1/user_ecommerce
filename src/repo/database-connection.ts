import { Database } from "./db";

export const db = Database.Connection({
    dbName: "User",
    userName: "user_ecommerce",
    password: "sept"
})