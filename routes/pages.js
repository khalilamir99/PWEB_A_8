const express = require("express");
const multer  = require('multer');
const path = require('path');
const authController = require("../controllers/auth");
const formsController = require("../controllers/forms");
const tugasController = require("../controllers/tugas");
const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../uploads/'));
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null,  Date.now().toString() + '_' + file.originalname)
    }
})

const uploadTugas = multer({
    storage: fileStorage,
})

router.get("/", authController.isLoggedIn, authController.dashboard);

router.get("/profil", authController.isLoggedIn, authController.getProfil);

router.post("/editprofil", authController.isLoggedIn, authController.updatePassword);

router.get("/pendaftaran", authController.isLoggedIn, formsController.listTugas);

router.get("/tambahpendaftaran", authController.isLoggedIn, formsController.tambahPendaftaran);

router.post("/tambahpendaftaran", authController.isLoggedIn, formsController.tambahData);

router.get("/editpendaftaran-:id", authController.isLoggedIn, formsController.getEditPendaftaran);

router.post("/editpendaftaran", authController.isLoggedIn, formsController.editPendaftaran);

router.get("/hapuspendaftaran-:id", authController.isLoggedIn, formsController.hapusData);

router.get("/tugas", authController.isLoggedIn, tugasController.listForm);

router.get("/editTugas-:id", authController.isLoggedIn, tugasController.getEditTugas);

router.post("/editTugas", authController.isLoggedIn, tugasController.editTugas);

router.get("/submitTugas-:id", authController.isLoggedIn, tugasController.getSubmitTugas);

router.post("/submittugas", authController.isLoggedIn, uploadTugas.single('uploaded_file'), tugasController.submitTugas);

module.exports = router;