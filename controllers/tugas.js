const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.listForm = (req, res) =>  {

  db.query("SELECT * FROM forms", (error, results) => {
    if (error) {
      console.log(error);
      return res.render("../view/tugas", {
        message: "Terjadi kesalahan saat mengambil data tugas",
      });
    } else {
      console.log(results);
      return res.render("../view/tugas", {
        user: req.user,
        data: results,
      });
    }
  });
};

exports.getEditTugas = (req, res) => {
  const tugasId = req.params.id;

  db.query(
    "SELECT * FROM tugas WHERE tugas_id = ?",
    [tugasId],
    (error, results) => {
      if (error) {
        res.redirect("/");
      } else {
        res.render("../view/edittugas", {
          user: req.user,
          tugas: results,
        });
      }
    }
  );
};

exports.editTugas = (req, res) => {
  const { tugas_id, deskripsi, uploaded_file } = req.body;

  db.query(
    "UPDATE tugas SET deskripsi = ?, uploaded_file = ? WHERE tugas_id = ?",
    [deskripsi, uploaded_file, tugas_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("../view/edittugas", {
          message: "Terjadi kesalahan saat mengedit tugas",
        });
      } else {
        console.log(result);
        return res.render("../view/edittugas", {
          message: "Tugas berhasil diedit",
        });
      }
    }
  );
};

exports.getSubmitTugas = (req, res) => {
  const pendaftaranId = req.params.id;

  db.query("SELECT * FROM forms WHERE forms_id =?",
          [pendaftaranId], (error, results) => {
  if (!error) {
    res.redirect("/");
  } else {
    res.render("../view/submitTugas", {
      user: req.user,
      submit: results
    });
  }
}
  );
};

exports.getEditPendaftaran = (req, res) => {
  const pendaftaranId = req.params.id;

  db.query("SELECT * FROM forms WHERE forms_id =?",
          [pendaftaranId], (error, results) => {
  if (!error) {
    res.redirect("/");
  } else {
    res.render("../view/editTugas", {
      user: req.user,
      submit: results,
    });
  }
}
);
};

exports.submitTugas = (req, res) => {
  const { form_id, deskripsi, uploaded_file } = req.body;

  db.query(
    "INSERT INTO tugas (user_id, form_id, deskripsi, uploaded_file) VALUES (?, ?, ?, ?)",
    [req.user.id, form_id, deskripsi, uploaded_file],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("../view/tugas", {
          message: "Terjadi kesalahan saat mengirimkan tugas",
        });
      } else {
        console.log(result);
        return res.redirect("/tugas");
      }
    }
  );
};