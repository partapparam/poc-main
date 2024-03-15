import express from "express"
import bodyParser from "body-parser"
import multer from "multer"

import testRoutes from "./routes/test.js"
import diamondRoutes from "./routes/diamond.js"
import usersRoutes from "./routes/users.js"
import amariAPI from "./routes/amariAPI.js"
import settingRoutes from "./routes/settings.js"
import semanticRoutes from "./routes/semantic.js"
import insuranceRoutes from "./routes/insurance.js"
import gtmJSRoutes from "./routes/gtmJS.js"
import tenantAPI from "./routes/tenantAPI.js"

const app = express()
const upload = multer()

//middleware
app.use(function (req, res, next) {
  const method = req?.method || ""
  if (method !== "OPTIONS") {
    console.log("Request Method : " + req?.method)
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl
    console.log("Request URL : " + fullUrl)
  }

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.none())
app.use(express.static("public"))

// Calling ALL the routes
app.use("/test", testRoutes)
app.use("/diamond", diamondRoutes)
app.use("/users", usersRoutes)
app.use("/amariAPI", amariAPI)
app.use("/tenantAPI", tenantAPI)
app.use("/settings", settingRoutes)
app.use("/semantic", semanticRoutes)
app.use("/insurance", insuranceRoutes)
app.use("/gtm", gtmJSRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
