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

// exports.getEditTugas = (req, res) => {
//   const tugasId = req.params.id;

//   db.query("SELECT * FROM submission WHERE form_id = ?",
//           [tugasId], (error, result) => {
//       if (error) {
//         res.json("errrrrrorrrrrrror");
//       } else {
//         console.log("ini result"+ result + tugasId);
//         res.render("../view/editTugas", {
//           user: req.user,
//           tugas: result[0],
//         });
//       }
//     }
//   );
// };

// exports.editTugas = (req, res) => {
//   const { tugas_id, deskripsi, uploaded_file } = req.body;

//   db.query(
//     "UPDATE tugas SET deskripsi = ?, uploaded_file = ? WHERE tugas_id = ?",
//     [deskripsi, uploaded_file, tugas_id],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         return res.render("../view/edittugas", {
//           message: "Terjadi kesalahan saat mengedit tugas",
//         });
//       } else {
//         console.log(result);
//         return res.render("../view/edittugas", {
//           message: "Tugas berhasil diedit",
//         });
//       }
//     }
//   );
// };

exports.getSubmitTugas = (req, res) => {
  const pendaftaranId = req.params.id;

  db.query("SELECT * FROM forms WHERE form_id =?",
          [pendaftaranId], (error, results) => {
  if (error) {
    res.json("error submit tugas");
  } else {
    console.log(results)
    res.render("../view/submitTugas", {
      user: req.user,
      submit: results[0]
    });
  }
}
  );
};

// exports.submitTugas = (req, res) => {
//   const { form_id, deskripsi, uploaded_file } = req.body;

//   db.query(
//     "INSERT INTO tugas (user_id, form_id, deskripsi, uploaded_file) VALUES (?, ?, ?, ?)",
//     [req.user.id, form_id, deskripsi, uploaded_file],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         return res.render("../view/tugas", {
//           message: "Terjadi kesalahan saat mengirimkan tugas",
//         });
//       } else {
//         console.log(result);
//         return res.redirect("/tugas");
//       }
//     }
//   );
// };

exports.submitTugas = (req, res) => {
  console.log(req.body);

  const { form_id, description } = req.body;

  const file = req.file.filename;
  db.query(
    "INSERT INTO submission (user_id, form_id, description, uploaded_file) VALUES (?, ?, ?, ?)",
    [req.user.id, form_id, description, file],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("../view/tugas", {
          message: "Terjadi kesalahan saat menambahkan data pendaftaran",
        });
      } else {
        console.log(result);
        return res.redirect("/tugas");
        
      }
    }
  );
};

exports.detailTugas = (req, res) =>  {
  const detailId = req.params.id;
  db.query("SELECT * FROM submission JOIN users ON submission.user_id = users.id WHERE form_id = ?",
  [detailId],

  (error, results) => {
    if (error) {
      console.log(error);
      return res.render("../view/detailTugas", {
        message: "Terjadi kesalahan saat mengambil data tugas",
      });
    } else {
      console.log(results);
      return res.render("../view/detailTugas", {
        user: req.user,
        data: results,
      });
    }
  });
};
