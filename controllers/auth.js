const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const moment = require("moment");
const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");




const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        return res.render("../view/register", {
          message: "Email telah digunakan",
        });
      } else if (password !== passwordConfirm) {
        return res.render("../view/register", {
          message: "Password tidak sama",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedPassword,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            return res.render("../view/register", {
              message: "User Berhasil didaftarkan",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      async (error, results) => {
        console.log(results);
        if (!results || results.length === 0) {
          res.status(401).render("../view/login", {
            message: "Email belum terdaftar",
          });
        } else if (!(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render("../view/login", {
            message: "Password salah",
          });
        } else {
          const id = results[0].id;

          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      async (error, results) => {
        console.log(results);
        if (error) {
          console.log(error);
        } else if (!results || results.length === 0) {
          return res.send(
            '<script>alert("User tidak ditemukan"); window.location.href = "/profil";</script>'
          );
        } else if (!(await bcrypt.compare(password, results[0].password))) {
          return res.send(
            '<script>alert("Password salah"); window.location.href = "/profil";</script>'
          );
        } else {
          let hashedPassword = results[0].password;
          if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 8);
          }

          db.query(
            "UPDATE users SET email = ?, password = ?, updated_at = ? WHERE id = ?",
            [email, hashedPassword, currentDate, results[0].id],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
                return res.send(
                  '<script>alert("Password berhasil diupdate"); window.location.href = "/profil";</script>'
                );
              }
            }
          );                  
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      //2)check if the user still exists
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (error, result) => {
          console.log(result);

          if (!result) {
            return next();
          }

          req.user = result[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/auth/login");
};

exports.getRegister = async (req, res) => {
  res.render("../view/register");
};

exports.getLogin = async (req, res) => {
  res.render("../view/login");
};

exports.dashboard = (req, res) => {
  if (req.user==undefined||null) {
    res.redirect("/auth/login");
    
  } else {
    const userId = req.user.id;
    db.query(
      "SELECT * FROM forms WHERE user_id = ?", [userId], (error, result) => {
        if (error) {
          console.log(error);
          return res.render("../view/dashboard", {
            message: "Terjadi kesalahan saat mengambil data tugas",
          });
        } else {
          console.log(result);
          return res.render("../view/dashboard", {
            user: req.user,
            data: result,
          });
          // return res.json(result);
        }
      }
    );
  }
 
};


exports.getProfil = async (req, res) => {
  if (req.user) {
    res.render("../view/profil", {
      user: req.user,
    });
  } else {
    res.redirect("/auth/login");
  }
};
