const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.tambahData = (req, res) => {
  console.log(req.body);

  const { judul, deskripsi } = req.body;

  db.query(
    "INSERT INTO forms (judul, deskripsi) VALUES (?, ?)",
    [judul, deskripsi],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("pendaftaran", {
          message: "Terjadi kesalahan saat menambahkan data pendaftaran",
        });
      } else {
        console.log(result);
        return res.render("pendaftaran", {
          message: "Data pendaftaran berhasil ditambahkan",
        });
      }
    }
  );
};

exports.listTugas = (req, res) => {
  db.query("SELECT * FROM forms", (error, results) => {
    if (error) {
      console.log(error);
      return res.render("tugas", {
        message: "Terjadi kesalahan saat mengambil data tugas",
      });
    } else {
      console.log(results);
      return res.render("tugas", {
        data: results,
      });
    }
  });
};

exports.editPendaftaran = (req, res) => {
  const { forms_id, judul, deskripsi } = req.body;

  db.query(
    "UPDATE forms SET judul = ?, deskripsi = ? WHERE forms_id = ?",
    [judul, deskripsi, forms_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.render("edit_pendaftaran", {
          message: "Terjadi kesalahan saat mengedit pendaftaran",
        });
      } else {
        console.log(result);
        return res.render("edit_pendaftaran", {
          message: "Pendaftaran berhasil diedit",
        });
      }
    }
  );
};
