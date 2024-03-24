import { Router } from 'express'
import data from '../data.mjs'

const router = Router();

router.get("/api/Products", (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies);
    return response.send(data.Products);
})

export default router;