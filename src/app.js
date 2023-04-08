import express from "express";
import cors from "cors";


const app = express();
const PORT = 5000;
const users = [];
const tweets = [];


app.post("/sign-up", (req, res) => {
    const {username , avatar} = req.body;
    const user = {username: username, avatar: avatar};
    users.push(user);
    return res.send("OK");
})

app.post("/tweets", (req, res) => {
    const {username , tweet} = req.body;
    const newTweet = {username: username, tweet: tweet};
    if(!username || username === "") {
        return res.send("UNAUTHORIZED");
    }
    tweets.push(newTweet);
    res.send("OK");
})

app.get("/tweets", (req, res) => {
    const publish = tweets.map((t) => {
        const newItem = {...t, avatar: users.filter((user) => user.username === t.username ? user.avatar : "")};
        return newItem;
    })

    return res.send(publish);    
})


app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`))