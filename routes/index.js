import express, { application } from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"
import session from "express-session"


const router = express.Router()


router.get("/", (req, res) => {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.render("index.njk",
      { title: "Test", message: "Funkar?", views: req.session.views }
    )
})

export default router