const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("../view/login");
});

router.get("/register", (req, res) => {
  res.render("../view/register");
});

router.get("/home", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("../view/dashboard", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/profil", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("../view/profil", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

router.post(
  "/profil",
  authController.isLoggedIn,
  authController.updateProfil,
  (req, res) => {
    if (req.user) {
      res.render("../view/profil", {
        user: req.user,
      });
    } else {
      res.redirect("/");
    }
  }
);

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

// Route for pendaftaran page
router.get("/pendaftaran", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("pendaftaran", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

// Route for tambahpendaftaran page
router.get("/tambahpendaftaran", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("tambahpendaftaran", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

// Route for editpendaftaran page
router.get("/editpendaftaran/:id", authController.isLoggedIn, (req, res) => {
  const pendaftaranId = req.params.id;

  if (req.user) {
    // Fetch the pendaftaran data from the database based on the pendaftaranId
    // Replace `fetchPendaftaranData` with the appropriate function to fetch pendaftaran data
    const pendaftaranData = fetchPendaftaranData(pendaftaranId);

    res.render("editpendaftaran", {
      user: req.user,
      pendaftaran: pendaftaranData,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;