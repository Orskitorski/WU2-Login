import express, { application } from "express"

const router = express.Router()


router.get("/", (req, res) => {
    if (req.session.login) {
      res.render("secret.njk", { 
        title: "Du är inloggad", 
        message: "Hej" }
      )
    } else {
      res.redirect("/login")
    }
})

export default router