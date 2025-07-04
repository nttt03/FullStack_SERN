import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import chatbotController  from "../controllers/chatbotController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getDataCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get("/api/allcode", userController.getAllCode);

    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctor", doctorController.getGetAllDoctor);
    router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleByDate);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getEtraInforDoctorById);
    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

    router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
    router.post("/api/send-remedy", doctorController.sendRemedy);


    router.post("/api/patient-book-appointment", patientController.postBookApointment);
    router.post("/api/verify-book-appointment", patientController.postVerifyBookApointment);

    router.post("/api/create-new-specialty", specialtyController.createSpecialty);
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);

    router.post("/api/create-new-clinic", clinicController.createClinic);
    router.get("/api/get-all-clinic", clinicController.getAllClinic);
    router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicById);

    /////////////

    router.get("/api/get-new-appointment", patientController.getNewAppointment);
    router.get("/api/get-done-appointment", patientController.getDoneAppointment);

    router.post('/api/chat', chatbotController.handleChat);
    
    // router.get('/hello', (rep, res) => {
    //     return res.send("Hế lô world ^_^ !")
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;