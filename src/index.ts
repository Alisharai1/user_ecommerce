import express from "express"
import { Request, Response } from "express"
import { bootstrap } from "./bootstrap"

const app = express()

const port = 3000

app.use(express.json())

app.get('/liveCheck', (_req: Request, res: Response) => {
    res.status(200).json({ message: "my test endpoint" })
})


bootstrap(app)


app.listen(port, async () => {
    console.log("app is up and running fine");

})
