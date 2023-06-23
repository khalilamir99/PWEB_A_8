const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.tugas = (req, res) => {
  try {
    if (req.user) {
      res.render("../view/tugas", {
        user: req.user,
      });
    }
    //  else {
    //   res.redirect("/");
    // }
    
  } catch (error) {
    console.log(error)
  }
};

exports.editTugas = (req, res) => {
  if (req.user) {
    res.render("../view/editTugas", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
};

exports.tambahTugas = (req, res) => {
  if (req.user) {
    res.render("../view/tambahtugas", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
};