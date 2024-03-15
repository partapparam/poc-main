import express from "express"
import tenantFetch from "../controllers/tenantFetch.js"

const router = express.Router()

router.post("/tenantFetch", tenantFetch)

export default router
