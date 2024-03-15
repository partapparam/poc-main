import express from "express"
import { connection } from "../connection/pg.js"
// import gtmcopilotLogo from "../../client_v3/src/assets//gtmcopilot_logo_s.png";
import { environment } from "../environments/environment.js"
import { transporter } from "./controller.js"
import { levenshteinEditDistance } from "levenshtein-edit-distance"
import {
  chat_table,
  tenant_table,
  users_table,
} from "../environments/tableConfig.js"
const router = express.Router()

function verificationCode(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

function generateWelcomeEmail(name) {
  const welcomeEmailHTML = `
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0">
    <tr>
        <td bgcolor="white">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">
                <tr>
                    <td colspan="2">
                        <table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">
                            <tr>
                                <td style="padding:0px;margin:0px">
                                    <table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:red">
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;line-height:0;font-size:0;height:4px"></td>
                </tr>
                <tr>
                    <td>
                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #F6F6ED; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:56px">
                                    <p style="margin:0px; margin-bottom: 20px; font-size:27px;padding-bottom:8px;letter-spacing: 1.5px;line-height:65px;font-family:Arial;font-weight:bold;color: #132231;">GTM CoPilot</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0">
                                        <tr>
                                                                                      <td width="30%">
                                                <table bgcolor="transparent" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0; margin-left: 50px; margin-top: 30px">
                                                    <tr>
                                                        <td style="padding: 0;">
                                                            <img style="display: block;" width="100%" src="https://i.postimg.cc/4Nc8396N/Group-32-3.png" alt="Logo">
                                                        </td>
                                                        <td>
                                                        <div style="width: 0; height: 0; border-top: 25px solid transparent; border-right: 36px solid #D95E3D; border-bottom: 25px solid transparent; margin-left: 110%; margin-bottom: 200%"></div>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="50%" style="padding:0px 16px">
                                                <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0; margin-left: 10px;">
                                                    <tr>
                                                        <td style="padding:0px 0px" width="300px">
                                                            <table width="100%" border="0" style="border-collapse:collapse;border-spacing:0;background:#D95E3D;border-radius:15px">
                                                                <tr>
                                                                    <td style="margin:0;padding:0;font-size:14px;color:#424242;line-height:19px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;padding-top:16px; border-radius: 15px">
                                                                        <div style="padding-left:20px;margin:0px;background:#D95E3D; border-radius: inherit">
                                                                            <p style="margin:0px; margin-bottom: 10px; font-size:20px;line-height:30px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;color: white;">Welcome aboard navigator!</p>
                                                                            <p style="padding-bottom:4px;margin:0px;font-size:16px;line-height:21px;font-family:Helvetica;letter-spacing:3px;font-weight:normal;color:white;padding-bottom:16px">I'm ADA ("Analytical Data Application"), a GenAI powered smart agent here to help you achieve your GTM goals and beyond.</p>
                                                                        </div>
                                                                    </td>
                                                                    
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px"></td>
                            </tr>
                        </table>

                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #98C0C4;  border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px">
                                    <div style="padding:5%;margin:0px; text-align: left;">
                                        <p style="padding-bottom:25px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">Hey ${name},</p>
                                        <p style="padding-bottom:25px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;"> Thanks for signing up for GTM COPILOT. With AI powered Task Agents, the GTM COPILOT platform helps you uncover relevant data, insights, and create impactful actions across your tech stack.</p>
                                        <p style="padding-bottom:4px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">We're excited to see how you will scale your digital self with our platform, Navigator! Login now to get started, and as ADA always says,</p>
                                        <p style="padding-bottom:35px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:100%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">"Wrangle less, revenue more!"</p>
                                        <table width="35%"  border="0" align="center" cellpadding="0" cellspacing="0"  style="background-color: #D95E3D; border-radius: 15px; float: left; margin-bottom: 30px">
                                            <tr>
                                                <td style="text-align:center;line-height:0;font-size:0; padding: 12px">
                                                    <a href="https://app.gtmcopilot.com/#/login" target="_blank" style="display: inline-block; width: 80%; height: 100%; padding: 10px 20px; text-decoration: none; color: white; font-size: 20px; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Login</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `

  return welcomeEmailHTML
}
function generatePasswordResetEmail(code, id) {
  const passwordResetEmail = `
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0">
    <tr>
        <td bgcolor="white">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">
                <tr>
                    <td colspan="2">
                        <table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">
                            <tr>
                                <td style="padding:0px;margin:0px">
                                    <table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:red">
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;line-height:0;font-size:0;height:4px"></td>
                </tr>
                <tr>
                    <td>
                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #F6F6ED; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:56px">
                                    <p style="margin:0px; margin-bottom: 20px; font-size:27px;padding-bottom:8px;letter-spacing: 1.5px;line-height:65px;font-family:Arial;font-weight:bold;color: #132231;">GTM CoPilot</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0">
                                        <tr>
                                                                                      <td width="30%">
                                                <table bgcolor="transparent" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0; margin-left: 50px; margin-top: 30px">
                                                    <tr>
                                                        <td style="padding: 0;">
                                                            <img style="display: block;" width="100%" src="https://i.postimg.cc/4Nc8396N/Group-32-3.png" alt="Logo">
                                                        </td>
                                                        <td>
                                                        <div style="width: 0; height: 0; border-top: 25px solid transparent; border-right: 36px solid #D95E3D; border-bottom: 25px solid transparent; margin-left: 110%; margin-bottom: 200%"></div>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="50%" style="padding:0px 16px">
                                                <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0; margin-left: 10px;">
                                                    <tr>
                                                        <td style="padding:0px 0px" width="300px">
                                                            <table width="100%" border="0" style="border-collapse:collapse;border-spacing:0;background:#D95E3D;border-radius:15px">
                                                                <tr>
                                                                    <td style="margin:0;padding:0;font-size:14px;color:#424242;line-height:19px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;padding-top:16px; border-radius: 15px">
                                                                        <div style="padding-left:20px;margin:0px;background:#D95E3D; border-radius: inherit">
                                                                            <p style="margin:0px; margin-bottom: 10px; font-size:20px;line-height:30px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;color: white;">Password Reset</p>
                                                                            <p style="padding-bottom:4px;margin:0px;font-size:16px;line-height:21px;font-family:Helvetica;letter-spacing:3px;font-weight:normal;color:white;padding-bottom:16px">ADA to the rescue! Need help resetting your password? Click the reset link below!</p>
                                                                        </div>
                                                                    </td>
                                                                    
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px"></td>
                            </tr>
                        </table>

                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #98C0C4;  border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px">
                                    <div style="padding:25% 0% 20%;margin:0px ;text-align: left;">
                                        <table width="40%"  border="0" align="center" cellpadding="0" cellspacing="0"  style="background-color: #D95E3D; border-radius: 15px; float: center; margin-bottom: 30px">
                                            <tr>
                                                <td style="text-align:center;line-height:0;font-size:0;padding: 12px 18px 12px 0px;">
                                                    <a href=${
                                                      environment.resetPassword +
                                                      code +
                                                      "/" +
                                                      id
                                                    } target="_blank" style="display: inline-block; width: 100%; height: 100%; padding: 10px; text-decoration: none; color: white; font-size: 20px; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Password Reset</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `

  return passwordResetEmail
}
function generateLeadUpdates() {
  const leadsUpdateEmail = `
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0">
    <tr>
        <td bgcolor="white">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">
                <tr>
                    <td colspan="2">
                        <table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">
                            <tr>
                                <td style="padding:0px;margin:0px">
                                    <table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:red">
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;line-height:0;font-size:0;height:4px"></td>
                </tr>
                <tr>
                    <td>
                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #F6F6ED; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:56px">
                                    <p style="margin:0px; margin-bottom: 20px; font-size:27px;padding-bottom:8px;letter-spacing: 1.5px;line-height:65px;font-family:Arial;font-weight:bold;color: #132231;">GTM CoPilot</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0">
                                        <tr>
                                                                                      <td width="30%">
                                                <table bgcolor="transparent" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0; margin-left: 50px; margin-top: 30px">
                                                    <tr>
                                                        <td style="padding: 0;">
                                                            <img style="display: block;" width="100%" src="https://i.postimg.cc/4Nc8396N/Group-32-3.png" alt="Logo">
                                                        </td>
                                                        <td>
                                                        <div style="width: 0; height: 0; border-top: 25px solid transparent; border-right: 36px solid #D95E3D; border-bottom: 25px solid transparent; margin-left: 110%; margin-bottom: 200%"></div>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="50%" style="padding:0px 16px">
                                                <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0; margin-left: 10px;">
                                                    <tr>
                                                        <td style="padding:0px 0px" width="300px">
                                                            <table width="100%" border="0" style="border-collapse:collapse;border-spacing:0;background:#D95E3D;border-radius:15px">
                                                                <tr>
                                                                    <td style="margin:0;padding:0;font-size:14px;color:#424242;line-height:19px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;padding-top:16px; border-radius: 15px">
                                                                        <div style="padding-left:20px;margin:0px;background:#D95E3D; border-radius: inherit">
                                                                            <p style="margin:0px; margin-bottom: 10px; font-size:20px;line-height:30px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;color: white;">Lead Updates</p>
                                                                            <p style="padding-bottom:4px;margin:0px;font-size:16px;line-height:21px;font-family:Helvetica;letter-spacing:3px;font-weight:normal;color:white;padding-bottom:16px">ADA reporting in Navigator! After tirelessly scanning the known universe of data, it looks like we have lead updates for you. Click below to see what I found!</p>
                                                                        </div>
                                                                    </td>
                                                                    
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px"></td>
                            </tr>
                        </table>

                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #98C0C4;  border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px">
                                    <div style="padding:25% 0% 20%;margin:0px ;text-align: left;">
                                        <table width="40%"  border="0" align="center" cellpadding="0" cellspacing="0"  style="background-color: #D95E3D; border-radius: 15px; float: center; margin-bottom: 30px">
                                            <tr>
                                                <td style="text-align:center;line-height:0;font-size:0;padding: 12px 18px 12px 0px;">
                                                    <a href=${environment.leadUpdates} target="_blank" style="display: inline-block; width: 100%; height: 100%; padding: 10px; text-decoration: none; color: white; font-size: 20px; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Lead Updates</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `

  return leadsUpdateEmail
}
function generateVerificationEmail(name, code, id) {
  const verificationEmail = `
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0">
    <tr>
        <td bgcolor="white">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">
                <tr>
                    <td colspan="2">
                        <table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">
                            <tr>
                                <td style="padding:0px;margin:0px">
                                    <table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:red">
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;line-height:0;font-size:0;height:4px"></td>
                </tr>
                <tr>
                    <td>
                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #F6F6ED; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:56px">
                                    <p style="margin:0px; margin-bottom: 20px; font-size:27px;padding-bottom:8px;letter-spacing: 1.5px;line-height:65px;font-family:Arial;font-weight:bold;color: #132231;">GTM CoPilot</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0">
                                        <tr>
                                                                                      <td width="30%">
                                                <table bgcolor="transparent" cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse;border-spacing:0; margin-left: 50px; margin-top: 30px">
                                                    <tr>
                                                        <td style="padding: 0;">
                                                            <img style="display: block;" width="100%" src="https://i.postimg.cc/4Nc8396N/Group-32-3.png" alt="Logo">
                                                        </td>
                                                        <td>
                                                        <div style="width: 0; height: 0; border-top: 25px solid transparent; border-right: 36px solid #D95E3D; border-bottom: 25px solid transparent; margin-left: 110%; margin-bottom: 200%"></div>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="50%" style="padding:0px 16px">
                                                <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0; margin-left: 10px;">
                                                    <tr>
                                                        <td style="padding:0px 0px" width="300px">
                                                            <table width="100%" border="0" style="border-collapse:collapse;border-spacing:0;background:#D95E3D;border-radius:15px">
                                                                <tr>
                                                                    <td style="margin:0;padding:0;font-size:14px;color:#424242;line-height:19px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;padding-top:16px; border-radius: 15px">
                                                                        <div style="padding-left:20px;margin:0px;background:#D95E3D; border-radius: inherit">
                                                                            <p style="margin:0px; margin-bottom: 10px; font-size:20px;line-height:30px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;color: white;">Welcome aboard navigator!</p>
                                                                            <p style="padding-bottom:4px;margin:0px;font-size:16px;line-height:21px;font-family:Helvetica;letter-spacing:3px;font-weight:normal;color:white;padding-bottom:16px">I'm ADA ("Analytical Data Application"), a GenAI powered smart agent here to help you achieve your GTM goals and beyond.</p>
                                                                        </div>
                                                                    </td>
                                                                    
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px"></td>
                            </tr>
                        </table>

                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #98C0C4;  border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <tr>
                                <td style="text-align:center;line-height:0;font-size:0;height:16px">
                                    <div style="padding:5%;margin:0px; text-align: left;">
                                        <p style="padding-bottom:25px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">Hey ${name},</p>
                                        <p style="padding-bottom:25px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;"> Thanks for signing up for GTM COPILOT. With AI powered Task Agents, the GTM COPILOT platform helps you uncover relevant data, insights, and create impactful actions across your tech stack.</p>
                                        <p style="padding-bottom:4px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:135%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">We're excited to see how you will scale your digital self with our platform, Navigator! Verify now to get started, and as ADA always says,</p>
                                        <p style="padding-bottom:35px;margin:0px;font-size:17px; letter-spacing: 3px; line-height:100%;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;">"Wrangle less, revenue more!"</p>
                                        <table width="35%"  border="0" align="center" cellpadding="0" cellspacing="0"  style="background-color: #D95E3D; border-radius: 15px; float: left; margin-bottom: 30px">
                                            <tr>
                                                <td style="text-align:center;line-height:0;font-size:0; padding: 12px">
                                                    <a href=${
                                                      environment.verifyUser +
                                                      code +
                                                      "/" +
                                                      id
                                                    } target="_blank" style="display: inline-block; width: 80%; height: 100%; padding: 10px 20px; text-decoration: none; color: white; font-size: 20px; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Verify</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `

  return verificationEmail
}

function sendEmail(mailData) {
  return new Promise(function (myResolve, myReject) {
    console.log("email sending promise")
    transporter.sendMail(mailData, (err, info) => {
      console.log(err)
      if (err) throw myReject(err)
      if (info) {
        console.log("email sent successfully")
        myResolve(info)
      }
    })
  })
}

function sendMail(id, code, email, type) {
  console.log("sendEmail")
  const name = email.split("@")[0]
  const fromEmail = "noreply@gtmcopilot.com"
  const toEmail = email
  var mailData = {}
  if (type == "verification") {
    console.log("building mailData for verification email")
    var mailData = {
      from: fromEmail,
      to: toEmail,
      subject: "Verification email",
      text: "Verification Email",
      html: generateVerificationEmail(name, code, id),
    }
    console.log("mailData built successfully", mailData)
  }
  if (type == "passwordReset") {
    console.log("building mailData for passwordReset email")
    var mailData = {
      from: fromEmail,
      to: toEmail,
      subject: "Reset Password for your GTM COPILOT account",
      text: "Reset Password for your GTM COPILOT account",
      html: generatePasswordResetEmail(code, id),
    }
    console.log("mailData built successfully", mailData)
  }
  if (type == "welcome") {
    var mailData = {
      from: fromEmail,
      to: toEmail,
      bcc: [
        "jiten@icustomer.ai",
        "sandeep@icustomer.ai",
        "nachiket@icustomer.ai",
        "ravi@icustomer.ai",
      ],
      subject:
        "Welcome to GTM COPILOT " +
        name.charAt(0).toLocaleUpperCase() +
        name.slice(1),
      text: "Welcome",
      html: generateWelcomeEmail(name),
    }
    console.log("newMailData built successfully", mailData)
  }
  if (type == "leadsUpdate") {
    var mailData = {
      from: fromEmail,
      to: toEmail,
      bcc: [
        "jiten@icustomer.ai",
        "sandeep@icustomer.ai",
        "nachiket@icustomer.ai",
        "ravi@icustomer.ai",
      ],
      subject: "New Leads Identified for GTM COPILOT Account",
      text: "New Leads Identified for GTM COPILOT Account",
      html: generateLeadUpdates(),
    }
    console.log("newMailData built successfully", mailData)
  }
  console.log("sending email")
  return sendEmail(mailData)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const query = `SELECT * FROM ${users_table.schemaTableName} WHERE ${users_table.email} = $1`
  connection.query(query, [email], function (error, results, fields) {
    if (error) throw error
    if (results.rows.length > 0) {
      var pass = false
      var verify = false
      if (results.rows[0].password == password) {
        pass = true
        // res.send({status: "success", data: results.rows[0]});
      } else {
        pass = false
        res.send({ status: "error", message: "Email or Password is wrong" })
      }

      if (
        results.rows[0].verify == 1 &&
        results.rows[0].verification_code == "verified"
      ) {
        verify = true
      } else {
        verify = false
        res.send({
          status: "error",
          message: "Please verify your email to Login",
        })
      }
      if (pass && verify) {
        res.send({
          status: "success",
          message: "Login successful",
          data: results.rows[0],
        })
      }
    } else {
      res.send({
        status: "error",
        message: "Email not found, Please register",
        data: [],
        errors: { user: "Invalid user!!!" },
      })
    }
  })
}

export const googleRegister = async (req, res) => {
  const {
    googleID,
    username,
    email,
    organization_name,
    organization_domain,
    name,
  } = req.body
  console.log(req.body)
  const query = `SELECT * FROM ${users_table.schemaTableName} WHERE ${users_table.email} = $1`
  connection.query(query, [email], function (error, results, fields) {
    if (error) throw error
    if (results.rows.length > 0) {
      if (
        results.rows[0].google_id != "" &&
        results.rows[0].google_id != null
      ) {
        if (results.rows[0].google_id == googleID) {
          // console.log(results)
          res.send({ status: "success", data: results.rows })
        } else {
          // console.log(results)
          res.send({ status: "error", message: "Invalid Email" })
        }
      } else {
        const query2 = `UPDATE ${users_table.schemaTableName} SET ${users_table.google_id} = $1 WHERE ${users_table.email} =$2 RETURNING *`
        connection.query(
          query2,
          [googleID, email],
          function (error, update_results, fields) {
            if (error) throw error
            // console.log(update_results)
            if (update_results.rows) {
              res.send({ status: "success", data: results.rows })
            }
          }
        )
      }
    } else {
      const query3 = `INSERT INTO ${users_table.schemaTableName} (${users_table.username}, ${users_table.email}, ${users_table.google_id}, ${users_table.verification_code}, ${users_table.verify}, ${users_table.organization_name}, ${users_table.organization_domain}, ${users_table.name}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ${users_table.id}`
      connection.query(
        query3,
        [
          username,
          email,
          googleID,
          "verified",
          1,
          organization_name,
          organization_domain,
          name,
        ],
        function (error, results, fields) {
          if (error) throw error
          if (results.rows.length > 0) {
            sendMail("id", "code", email, "welcome")
              .then((mail) => {
                if (mail.response.includes("250 OK")) {
                  console.log("Welcome email sent")
                } else {
                  console.log("Welcome email sending error")
                }
                connection.query(
                  query,
                  [email],
                  function (error, user_results, fields) {
                    if (error) throw error
                    if (results.rows.length > 0) {
                      let id = results.rows[0].id
                      const checkQuery = `SELECT * FROM ${tenant_table.schemaTableName} WHERE ${tenant_table.tenantname} = $1`

                      connection.query(
                        checkQuery,
                        [organization_domain],
                        (error, check_results, fields) => {
                          if (error) throw error
                          if (check_results.rows.length > 0) {
                            // Update existing row by appending userId to userids array
                            const existingUserIds =
                              check_results.rows[0].userids
                            const updatedUserIds = [...existingUserIds, id]

                            const updateQuery = `
                                UPDATE ${tenant_table.schemaTableName}
                                SET ${tenant_table.userids} = $1
                                WHERE ${tenant_table.tenantname} = $2
                                RETURNING ${tenant_table.tenantid}
                                `

                            const updateValues = [
                              updatedUserIds,
                              organization_domain,
                            ]

                            connection.query(
                              updateQuery,
                              updateValues,
                              (updateError, update_results, updateFields) => {
                                if (updateError) throw updateError
                                // Handle the rest of your logic here
                              }
                            )
                          } else {
                            // Insert a new row with the given data
                            const insertQuery = `
                                INSERT INTO ${tenant_table.schemaTableName} (
                                ${tenant_table.tenantname},
                                ${tenant_table.userids},
                                ${tenant_table.firstuserid},
                                ${tenant_table.firsttimeregdate},
                                ${tenant_table.createddate}
                                ) VALUES ($1, ARRAY[$2]::text[], $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING ${tenant_table.tenantid}`

                            const insertValues = [organization_domain, id, id]

                            connection.query(
                              insertQuery,
                              insertValues,
                              (insertError, insert_results, insertFields) => {
                                if (insertError) throw insertError
                                // Handle the rest of your logic here
                              }
                            )
                          }
                        }
                      )
                      const chat_query = `INSERT INTO ${chat_table.schemaTableName} (${chat_table.chat_name}, ${chat_table.user_id}, ${chat_table.is_deleted}) VALUES ($1, $2, $3) RETURNING ${chat_table.id}`
                      connection.query(
                        chat_query,
                        ["New Chat", results.rows[0].id, 0],
                        (error, chat_results, fields) => {
                          // console.log(results)
                          if (error) throw error
                          res.send({
                            status: "success",
                            data: user_results.rows[0],
                          })
                        }
                      )
                    }
                  }
                )
              })
              .catch((sendMailError) => {
                console.error("Error sending Welcome email:", sendMailError)
              })
          }
        }
      )
    }
  })
}

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    organization_name,
    organization_domain,
    name,
  } = req.body
  const query = `SELECT * FROM ${users_table.schemaTableName} WHERE ${users_table.email} = $1`
  console.log(query)
  connection.query(query, [email], function (error, results, fields) {
    if (error) throw error
    // Chech the email is already registered or not
    if (results.rows.length > 0) {
      // If the email is already registered
      console.log("email exist")
      res.send({
        status: "error",
        data: results.rows,
        message: "Email already exists, Please Login",
      })
    } else {
      // If the email is not registered
      console.log("Inserting into users table")
      const query2 = `INSERT INTO ${users_table.schemaTableName} (${users_table.username}, ${users_table.email}, ${users_table.password}, ${users_table.organization_name}, ${users_table.organization_domain}, ${users_table.name}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${users_table.id}`
      connection.query(
        query2,
        [
          username,
          email,
          password,
          organization_name,
          organization_domain,
          name,
        ],
        function (error, users_results, fields) {
          var datas = []
          if (error) throw error
          if (users_results.rows.length > 0) {
            datas.push(users_results)
            console.log("inserted in users table")
            let code = verificationCode(16)
            let id = users_results.rows[0].id
            const checkQuery = `SELECT * FROM ${tenant_table.schemaTableName} WHERE ${tenant_table.tenantname} = $1`

            connection.query(
              checkQuery,
              [organization_domain],
              (error, check_results, fields) => {
                if (error) throw error
                if (check_results.rows.length > 0) {
                  // Update existing row by appending userId to userids array
                  const existingUserIds = check_results.rows[0].userids
                  const updatedUserIds = [...existingUserIds, id]

                  const updateQuery = `
                UPDATE ${tenant_table.schemaTableName}
                SET ${tenant_table.userids} = $1
                WHERE ${tenant_table.tenantname} = $2
                RETURNING ${tenant_table.tenantid}
                `

                  const updateValues = [updatedUserIds, organization_domain]

                  connection.query(
                    updateQuery,
                    updateValues,
                    (updateError, update_results, updateFields) => {
                      if (updateError) throw updateError
                      // Handle the rest of your logic here
                    }
                  )
                } else {
                  // Insert a new row with the given data
                  const insertQuery = `
                INSERT INTO ${tenant_table.schemaTableName} (
                ${tenant_table.tenantname},
                ${tenant_table.userids},
                ${tenant_table.firstuserid},
                ${tenant_table.firsttimeregdate},
                ${tenant_table.createddate}
                ) VALUES ($1, ARRAY[$2]::text[], $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING ${tenant_table.tenantid}`

                  const insertValues = [organization_domain, id, id]

                  connection.query(
                    insertQuery,
                    insertValues,
                    (insertError, check_results, insertFields) => {
                      if (insertError) throw insertError
                      // Handle the rest of your logic here
                    }
                  )
                }
              }
            )

            //----------------------Future Referrence to update complete tenant_table with all columns-------------------------------------------

            // INSERT INTO ${tenant_table.schemaTableName} (
            //     ${tenant_table.tenantname},
            //     ${tenant_table.userids},
            //     ${tenant_table.firstuserid},
            //     ${tenant_table.firsttimeregdate},
            //     ${tenant_table.subscriptionstatus},
            //     ${tenant_table.subscriptiontype},
            //     ${tenant_table.subscriptionstartdate},
            //     ${tenant_table.subscriptionexpdate},
            //     ${tenant_table.allotedcredits},
            //     ${tenant_table.remainingcredits},
            //     ${tenant_table.createddate},
            //     ${tenant_table.updateddate},
            //     ${tenant_table.tenantid}
            //   ) VALUES (
            //     $1, ARRAY[$2]::text[], $3, CURRENT_TIMESTAMP, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $10
            //   ) RETURNING ${tenant_table.id}

            function chatQuery(verification_status) {
              const chat_query = `INSERT INTO ${chat_table.schemaTableName} (${chat_table.chat_name}, ${chat_table.user_id}, ${chat_table.is_deleted}) VALUES ($1, $2, $3) RETURNING ${chat_table.id}`
              connection.query(
                chat_query,
                ["New Chat", users_results.rows[0].id, "0"],
                (error, chat_results, fields) => {
                  if (error) {
                    console.log("inserting into chat table error")
                    res.send({
                      status: "error",
                      data: chat_results,
                      message: "Unable to create a new get a sample",
                    })
                  }
                  if (chat_results) {
                    console.log("inserted into chat table")
                    datas.push(chat_results)
                    res.send({
                      status: "success",
                      data: datas,
                      message:
                        "Registration successful, " + verification_status,
                    })
                  }
                }
              )
            }
            let verficationcode = new Promise(function (myResolve, myReject) {
              const verification_query = `UPDATE ${users_table.schemaTableName} SET ${users_table.verification_code} = $1 WHERE ${users_table.email} = $2`
              connection.query(
                verification_query,
                [code, email],
                async function (error, verification_results, fields) {
                  if (error) {
                    console.log(
                      "inserting verification_code in users table error"
                    )
                    res.send({
                      status: "error",
                      data: verification_results,
                      message: "Unable to send verification email",
                    })
                    myReject(error)
                  }
                  if (verification_results) {
                    console.log("Inserted verification code in users table")
                    let mail = await sendMail(id, code, email, "verification")
                    if (mail.response.includes("250 OK")) {
                      console.log("verification email sent")
                      datas.push(verification_results)
                      myResolve(chatQuery("verification email sent"))
                    } else {
                      console.log("verification email sending error")
                      myResolve(chatQuery("Unable to send verification email"))
                      // res.send({ status: 'error', data: verification_results, message: 'Unable to send verification email'})
                    }
                  }
                }
              )
            })
            // sendVerificationEmail(email, users_results.rows[0].id);
          }
          // res.send({ status: 'success', data: results.rows})
        }
      )
    }
  })
}
export const leadsUpdate = async (req, res) => {
  var { user_id } = req.body
  const query = `SELECT ${users_table.email} FROM ${users_table.schemaTableName} WHERE ${users_table.id} =$1`
  connection.query(query, [user_id], function (error, results, fields) {
    console.log(results)
    if (error) throw error
    if (results) {
      console.log(results, "dsfsljdsdlkfsdlkfjsdlfkjsdlkfjdjaklsdjadkjgf")
      sendMail("id", "code", results.rows[0].email, "leadsUpdate")
        .then((mail) => {
          if (mail.response.includes("250 OK")) {
            console.log("Welcome email sent")
          } else {
            console.log("Welcome email sending error")
          }
          res.send({ status: "success", message: "Mail sent successfully" })
        })
        .catch((sendMailError) => {
          console.error("Error sending Welcome email:", sendMailError)
          res.send({ status: "error", message: "Error sending mail" })
        })
    }
  })
}
export const verifyUser = async (req, res) => {
  var { verification_code, user_id } = req.body
  console.log(verification_code)
  console.log(user_id)
  const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.verification_code} =$1, ${users_table.verify} = $2 WHERE ${users_table.verification_code} =$3 AND ${users_table.id} =$4 RETURNING ${users_table.email}`
  connection.query(
    query,
    ["verified", 1, verification_code, user_id],
    function (error, results, fields) {
      console.log(results)
      if (error) throw error
      if (results) {
        res.send({ status: "success", message: "Verified Successfully" })
        console.log(results, "dsfsljdsdlkfsdlkfjsdlfkjsdlkfjdjaklsdjadkjgf")
        sendMail("id", "code", results.rows[0].email, "welcome")
          .then((mail) => {
            if (mail.response.includes("250 OK")) {
              console.log("Welcome email sent")
            } else {
              console.log("Welcome email sending error")
            }
          })
          .catch((sendMailError) => {
            console.error("Error sending Welcome email:", sendMailError)
          })
      } else {
        res.send({ status: "error", message: "Verification code expired" })
      }
    }
  )
}

export const forgotPassword = async (req, res) => {
  const email = req.body.email
  const reset_code = verificationCode(16)
  console.log("password reset")
  const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.passwod_reset_token}=$1 WHERE ${users_table.email} = $2 RETURNING *`
  connection.query(query, [reset_code, email], async function (error, results) {
    console.log("password reset code inserting in users table")
    if (error) throw error
    if (results.rowCount > 0) {
      console.log("password reset code inserted in users table")
      const id = results.rows[0].id
      let mail = await sendMail(
        results.rows[0].id,
        reset_code,
        email,
        "passwordReset"
      )
      if (
        mail.response.includes("250 Ok") ||
        mail.response.includes("250 2.0.0 Ok")
      ) {
        console.log("password reset email sent successfully")
        res.send({
          status: "success",
          message: "Password reset link sent to you email",
        })
      } else {
        console.log("password reset email sending failed", mail.response)
        res.send({
          status: "error",
          message: "Unable to send password reset link to you email",
        })
      }
    } else {
      console.log("email not found")
      res.send({ status: "error", message: "Email not found, Please sign up" })
    }
  })
}

export const resetPassword = async (req, res) => {
  const { reset_code, user_id, password } = req.body
  console.log(reset_code)
  console.log(user_id)
  console.log(password)
  const query = `SELECT * FROM ${users_table.schemaTableName} WHERE ${users_table.id}=$1 AND ${users_table.passwod_reset_token} = $2`
  console.log(query)
  let user = await connection.query(query, [user_id, reset_code])
  console.clear()
  // console.log(user);
  console.table({
    password: password,
    user_password: user.rows[0].password,
    validation: levenshteinEditDistance(password, user.rows[0].password),
    result: levenshteinEditDistance(password, user.rows[0].password) > 3,
    query:
      "UPDATE sfdc.users SET password=" +
      password +
      " AND passwod_reset_token=" +
      0 +
      " WHERE id=" +
      user_id,
  })
  if (levenshteinEditDistance(password, user.rows[0].password) > 3) {
    const query2 = `UPDATE ${users_table.schemaTableName} SET ${users_table.password} =$1, ${users_table.passwod_reset_token} = $2 WHERE ${users_table.id} = $3`
    connection.query(query2, [password, 0, user_id], function (error, results) {
      if (error) throw error
      if (results) {
        console.log(results)
        res.send({
          status: "success",
          message: "Password updated successfully!",
        })
      }
    })
  } else {
    res.send({
      status: "error",
      code: "old password",
      message:
        "New Password should not be similar to current password, please try again",
    })
  }
}

export const changeUserType = async (req, res) => {
  const { userID } = req.body
  const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.usertype} = 'premium' WHERE ${users_table.id} = $1`

  connection.query(query, [userID], function (error, results) {
    if (error) {
      res.status(500).json({ message: "Error changing user type" })
      console.log(error, "asdasda")
    } else {
      res.send({ status: "success", data: "Updated" })
      console.log(results)
    }
  })
}

export default router
