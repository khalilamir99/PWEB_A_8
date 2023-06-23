const express = require("express");
const authController = require("../controllers/auth");
const formsController = require("../controllers/forms");
const router = express.Router();

router.get("/", authController.isLoggedIn, authController.dashboard);

router.get("/profil", authController.isLoggedIn, authController.getProfil);

router.post("/editprofil", authController.isLoggedIn, authController.updatePassword);

router.get("/pendaftaran", authController.isLoggedIn, formsController.listTugas);

router.get("/tambahpendaftaran", authController.isLoggedIn, formsController.tambahPendaftaran);

router.post("/tambahpendaftaran", authController.isLoggedIn, formsController.tambahData);

router.get("/editpendaftaran/:id", authController.isLoggedIn, formsController.getEditPendaftaran);

router.post("/editpendaftaran/:id", authController.isLoggedIn, formsController.editPendaftaran);

router.get("/hapuspendaftaran/:id", authController.isLoggedIn, formsController.hapusData);

router.get("/tugas", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("../view/tugas", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/editTugas", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("../view/editTugas", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/tambahTugas", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("../view/tambahtugas", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
