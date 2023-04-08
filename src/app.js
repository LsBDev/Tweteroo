import express, { json } from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(json());
const PORT = 5000;
const users = [];
const tweets = [];


app.post("/sign-up", (req, res) => {
    console.log(req);
    const {username, avatar} = req.body;
    const user = {username: username, avatar: avatar};
    users.push(user);
    return res.status(200).send("OK");
})

app.post("/tweets", (req, res) => {
    const {username , tweet} = req.body;
    const newTweet = {username: username, tweet: tweet};
    const nome = users.find((u) => u.username === username ? true: false)
    if(!username || username === "" || !nome) {
        return res.status(400).send("UNAUTHORIZED");
    }
    tweets.push(newTweet);
    res.status(200).send("OK");
})

app.get("/tweets", (req, res) => {
        const publish = tweets.map((t) => {
            const user = users.find((us) => us.username === t.username)
            const newItem = {...t, avatar: user.avatar};
            return newItem;
        })
    return res.send(publish.slice(-10));
})


app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`))