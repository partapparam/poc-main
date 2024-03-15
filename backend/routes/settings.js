import express from "express";
import { updateOrganizations, getUserSetting, updateUser, updatePlan, inviteUser} from "../controllers/setting_controller.js"; 

const router = express.Router();

router.post('/getUserSetting', getUserSetting);
router.post('/updateOrganizations', updateOrganizations);
router.post('/updateUser', updateUser);
router.post('/updatePlan', updatePlan);
router.post('/inviteUser', inviteUser);

export default router