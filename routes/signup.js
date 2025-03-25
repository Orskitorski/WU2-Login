import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("signup.njk", { 
      title: "Sign Up", 
      message: "Best service, legit.",
      error: ""
    })
})

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const [dbpassword] = await pool.promise().query(`SELECT password FROM login WHERE name = ?`, [username])

  if (dbpassword.length == 0) {
    const hashedPW = await bcrypt.hash(password, 10)

    await pool.promise().query('INSERT INTO login (name, password) VALUES (?, ?)', [username, hashedPW])
    req.session.login = true
    res.redirect("/")
  } else {
    res.render("signup.njk", {
        title: "Sign Up", 
        message: "Best service, legit.", 
        error: "*User already exists"
    })
  }
})

export default router