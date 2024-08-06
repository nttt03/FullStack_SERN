import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    
    router.get('/hoidanit', (rep, res) => {
        return res.send("Hế lô hoidanit ^_^ !")
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;