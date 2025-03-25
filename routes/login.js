import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("login.njk", { 
      title: "Login", 
      message: "Best service, legit.",
      error: ""
    })
})

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const [dbpassword] = await pool.promise().query(`SELECT password FROM login WHERE name = ?`, [username])

  if (dbpassword.length == 0) {
    res.render("login.njk", {
      title: "Login", 
      message: "Best service, legit.", 
      error: "*Wrong username or password"
    })
  } else {
    bcrypt.compare(password, dbpassword[0].password, function(err, result) {
      console.log(result, err)
      if (result == true){
        req.session.login=true
        res.redirect("/")
      }
      else {
        res.render("login.njk", {
          title: "Login", 
          message: "Best service, legit.", 
          error: "Wrong username or password"
        })
      }
    })
  }
})

export default router