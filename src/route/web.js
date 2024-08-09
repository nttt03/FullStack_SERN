import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.getDataCRUD);
    router.post('/post-crud', homeController.postCRUD);
    
    // router.get('/hoidanit', (rep, res) => {
    //     return res.send("Hế lô hoidanit ^_^ !")
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;