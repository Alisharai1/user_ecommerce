import express from "express"
import { Request, Response } from "express"
import { bootstrap } from "./bootstrap"
import 'dotenv/config'
import { Database } from "./repo/db"

export const db = Database.Connection({
    dbName: process.env.DB_NAME!,
    userName: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
})

const app = express()

const port = Number(process.env.PORT) || 4000;


app.use(express.json())

app.get('/liveCheck', (_req: Request, res: Response) => {
    res.status(200).json({ message: "my test endpoint" })
})


bootstrap(app)


app.listen(port, async () => {
    console.log("app is up and running fine");

})
