import { Router } from 'express'
import { body, checkSchema, query, validationResult } from "express-validator"
import { createUserValidationSchema } from '../uilts/validationSchemas.mjs'
import data from '../data.mjs'
import session from 'express-session';

const router = Router();

router.get("/api/users",
    query("filter")
        .isString()
        .notEmpty().withMessage("not Empty")
        .isLength({ min: 3, max: 10 }).withMessage("length error"),
    (request, response) => {
        console.log(request.query);
        console.log(request.session.id);
        console.log(request.session.user);
        request.sessionStore.get(request.session.id, (err, sessionData) => {
            if (err) {
                console.log(err);
                throw err;
            }
            //request.session.visited = true 才有東西
            console.log(sessionData);
        })

        const error = validationResult(request);
        // console.log(error);
        // if (!error.isEmpty())
        //     return response.status(400).send({ errors: error.array() });

        const {
            query: { filter, value },
        } = request;
        //when filter and value are undfined
        if (!filter && !value) return response.send(data.Users);
        if (filter && value) return response.send(data.Users.filter(x => x[filter].includes(value)));
        response.send(data.Users)
    })

router.post("/api/createUser",
    checkSchema(createUserValidationSchema),
    (request, response) => {
        console.log(request.body);
        const error = validationResult(request);
        console.log(error);
        if (!error.isEmpty())
            return response.status(400).send({ errors: error.array() });

        const postData = request.body;
        data.Users.push(
            {
                id: data.Users.length + 1,
                name: postData.name,
                age: postData.age
            }
        )
        return response.status(200).send(data.Users[data.Users.length - 1]);
    })

router.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);

    if (isNaN(parsedId)) return response.status(400).send("Bad Request");

    const findUser = data.Users.find(x => x.id === parsedId);

    if (!findUser) return response.status(404).send("Not Found");
    return response.send(findUser);
})

export default router;