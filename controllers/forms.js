const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.tambahPendaftaran = (req, res) => {
  if (req.user) {
    res.render("../view/tambahpendaftaran", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
};

exports.tambahData = (req, res) => {
  console.log(req.body);

  const { judul, deskripsi } = req.body;

  db.query(
    "INSERT INTO forms (user_id, judul, deskripsi) VALUES (?, ?, ?)",
    [req.user.id ,judul, deskripsi],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("../view/pendaftaran", {
          message: "Terjadi kesalahan saat menambahkan data pendaftaran",
        });
      } else {
        console.log(result);
        return res.redirect("/pendaftaran");
      }
    }
  );
};

exports.listTugas = (req, res) => {
  const userId = req.user.id; // Mengambil user ID dari objek req.user

  db.query("SELECT * FROM forms WHERE user_id = ?", [userId], (error, results) => {
    if (error) {
      console.log(error);
      return res.render("../view/pendaftaran", {
        message: "Terjadi kesalahan saat mengambil data tugas",
      });
    } else {
      console.log(results);
      return res.render("../view/pendaftaran", {
        user: req.user,
        data: results,
      });
    }
  });
};


exports.getEditPendaftaran = (req, res) => {
  const pendaftaranId = req.params.id;

  db.query("SELECT * FROM forms WHERE form_id =?",
          [pendaftaranId], (error, results) => {
  if (error) {
    console.error(error)
    res.json("errrrrrorrrrrrror");
  } else {
    console.log(results)
    res.render("../view/editpendaftaran", {
      user: req.user,
      pendaftaran: results[0],
    });
  }
}
);
};

exports.editPendaftaran = (req, res) => {
  const { form_id, judul, deskripsi } = req.body;

  db.query(
    "UPDATE forms SET judul = ?, deskripsi = ? WHERE form_id = ?",
    [judul, deskripsi, form_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("../view/editpendaftaran", {
          message: "Terjadi kesalahan saat mengedit pendaftaran",
        });
      } else {
        console.log(result);
        return res.redirect("/pendaftaran");
      }
    }
  );
};

exports.hapusData = (req, res) => {
  const id = req.params.id; // ID data yang ingin dihapus

  db.query("DELETE FROM forms WHERE form_id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.render("../view/pendaftaran", {
        message: "Terjadi kesalahan saat menghapus data pendaftaran",
      });
    } else {
      console.log(result);
      return res.redirect("back");
    }
  });
};
