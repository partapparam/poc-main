import express from "express";
import {connection} from "../connection/pg.js";
import nodemailer from "nodemailer";
import { users_table } from "../environments/tableConfig.js";

const router = express.Router();

export const findUserByEmail = async (mail) => {
    const email = mail;
    let foundUser = true;
    const query = `SELECT * FROM ${users_table.schemaTableName} WHERE ${users_table.email} = $1`
    let user = await connection.query(query, [ email ]);

    if(user.rowCount == 0){
        foundUser = false;
    }
    
    return foundUser;
}

export const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@gtmcopilot.com', // generated ethereal user
      pass: 'gtmcopilot_noreply!123', // generated ethereal password
    },
});

export default router;