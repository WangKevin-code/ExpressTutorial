import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import data from "./data.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("Secret Key"));
app.use(session({
    secret: 'Secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))

//middleware 位置順序很重要
app.use((request, response, next) => {
    console.log(`${request.method}-${request.url}`)
    next();
})

app.get("/", (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie("HelloWorld", "testValue", { maxAge: 6000, signed: true });
    response.status(200).send("Hello World");
});

app.post("/api/auth", (request, response) => {
    const { body: { id, password } } = request;
    const finduser = data.Users.find(x => Number(x.id) === Number(id));
    if (!finduser || finduser.password !== password) return response.status(401).send({ msg: "not find user" });

    request.session.user = finduser;
    return response.status(200).send(finduser);
})

app.get("/api/auth/status", (request, response) => {
    request.sessionStore.get(request.session.id, (err, sessionData) => {
        console.log(sessionData)
    })


    return request.session.user ?
        response.status(200).send(request.session.user) :
        response.status(401).send({ msg: "auth not user" });
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Running On Port ${PORT}`);
});