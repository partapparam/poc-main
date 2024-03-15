import express from "express";
import { forgotPassword, googleRegister, login, register, resetPassword, verifyUser, changeUserType, leadsUpdate } from '../controllers/users_controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/googleRegister', googleRegister);
router.post('/register', register);
router.post('/verifyUser', verifyUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/changeUserType', changeUserType);
router.post('/leadsUpdate', leadsUpdate);


export default router
