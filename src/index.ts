import express from "express"
import { Request, Response } from "express"
import { Database } from "./repo/db"

const app = express()

const port = 3000
app.use(express.json())
app.get('/liveCheck', (_req: Request, res: Response) => {
    res.status(200).json({ message: "my test endpoint" })

})

export const db = Database.Connection({
    dbName: "User",
    userName: "user_ecommerce",
    password: "sept"
})

app.listen(port, async () => {
    console.log("app is up and running fine");

})
