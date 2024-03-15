import express from "express";
import {connection} from "../connection/pg.js";
import { findUserByEmail } from "./controller.js";
import { transporter } from "./controller.js";
import { users_table } from "../environments/tableConfig.js";

const router = express.Router();
      
function sendEmail(mailData){
    return new Promise(function(myResolve, myReject) {

        try {
            const sendemail = transporter.sendMail(mailData);
            myResolve(sendemail);
        } catch (error) {
            myReject(error);
        }
        // transporter.sendMail(mailData, (err, info) => {
        //     if(err) myReject(err);
        //     if(info){
        //         myResolve(info);
        //     };
        // })
    });
}

function sendMultipleMail(mailList, userName, inviteURL, workspace){
    var mailResponse = [];
    return new Promise(async function(myResolve, myReject) {
        var i = 0;
        try {
            for (const mail of mailList) {

                let existingsUser = await findUserByEmail(mail);

                if(!existingsUser){
                    const name = mail.split('@')[0];
                    const fromEmail = 'noreply@gtmcopilot.com';
                    const toEmail = mail;
                    const username = userName == null || userName == undefined ? mail.split('@')[0] : userName;
                    var inviteMail = await sendEmail({
                        from: fromEmail,
                        to: toEmail,
                        subject: 'Invitation to Join in GTM Copilot',
                        text: '',
                        html: '<table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0" border="0" id="m_-4826849845090692839m_7474946741192123375backgroundTable" style="border-collapse:collapse;border-spacing:0">'+
                        '<tbody>'+
                            '<tr>'+
                                '<td bgcolor="#303C55">'+
                                    '<table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">'+
                                        '<tbody>'+
                                            '<tr>'+
                                                '<td colspan="2">'+
                                                    '<table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">'+
                                                        '<tbody>'+
                                                            '<tr>'+
                                                                '<td style="padding:0px;margin:0px">'+
                                                                    '<table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">'+
                                                                        '<tbody>'+
                                                                            '<tr>'+
                                                                                '<td>'+
                                                                                    '<table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0">'+
                                                                                        '<tbody>'+
                                                                                            '<tr>'+
                                                                                                '<td style="line-height:0;font-size:0;vertical-align:top;padding:0px;text-align:center" height="24">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="line-height:0;font-size:0;vertical-align:top;padding:0px;text-align:center" height="7">'+'</td>'+
                                                                                            '</tr>'+
                                                                                        '</tbody>'+
                                                                                    '</table>'+
                                                                                '</td>'+
                                                                            '</tr>'+
                                                                        '</tbody>'+
                                                                    '</table>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                        '</tbody>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>'+
                                '</td>'+
                            '</tr>'+'<tr>'+
                                '<td style="text-align:center;line-height:0;font-size:0;height:4px">'+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+
                                    '<table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="">'+
                                        '<tbody>'+
                                            '<tr>'+
                                                '<td style="padding:0px;margin:0px">'+
                                                    '<table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0">'+
                                                        '<tbody>'+
                                                            '<tr>'+
                                                                '<td>'+
                                                                    '<img src="https://i.ibb.co/Fmf1dJq/Wz-B-Logo-new.png">'+
                                                                '</td>'+
                                                            '</tr>'+
                                                        '</tbody>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td style="text-align:center;line-height:0;font-size:0;height:23px">'+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td style="padding:0;">'+
                                                    '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0">'+
                                                        '<tbody>'+
                                                            '<tr>'+
                                                                '<td style="padding:0px 16px">'+
                                                                    '<table bgcolor="#fff" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;border-radius:8px">'+
                                                                        '<tbody>'+
                                                                            '<tr>'+
                                                                                '<td style="padding:0px 16px">'+
                                                                                    '<table width="100%" border="0" style="border-collapse:collapse;border-spacing:0;background:#fff;border-radius:8px">'+
                                                                                        '<tbody>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#424242;line-height:19px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;padding-top:16px">'+
                                                                                                    '<div style="padding:0px;margin:0px;background:#fff">'+
                                                                                                        '<p style="padding-bottom:13px;margin:0px;font-size:14px;padding-bottom:8px;line-height:21px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;color:#4a4548">'+
                                                                                                            'Dear '+name.charAt(0).toLocaleUpperCase()+ name.slice(1)+','+
                                                                                                        '</p>'+
                                                                                                        '<p style="padding-bottom:4px;margin:0px;font-size:14px;line-height:21px;font-family:Arial,Helvetica,sans-serif;font-weight:normal;color:#4a4548;padding-bottom:16px">'+
                                                                                                            username.charAt(0).toLocaleUpperCase()+ username.slice(1)+' reaching out to invite you to join in '+workspace+' on GTM Copilot. As a member of this workspace, you will have access to collaborate with our team, share ideas, and work on projects together.'+
                                                                                                        '</p>'+
                                                                                                        '<p style="padding:0;padding-bottom:14px;margin:0px;font-size:14px;line-height:20px;font-family:Arial,Helvetica,sans-serif;color:#4a4548">'+
                                                                                                            'To join, please follow these steps:'+
                                                                                                        '</p>'+
                                                                                                    '</div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>Click on the invitation link provided below. </div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>Create a new account</div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>Once you have signed in, you will be automatically added to the '+workspace+'.</div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div><a href="'+inviteURL+'">Please click here to create a new account.</a></div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>Please note that if you do not already have a GTM Copilot account, you will need to create one in order to join the workspace.</div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>We are excited to have you join us in the '+workspace+' and look forward to collaborating with you! </div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="margin:0;padding:0;font-size:14px;color:#4a4548;line-height:20px;font-family:Arial,Helvetica,sans-serif;font-weight:normal">'+
                                                                                                    '<div>Best regards, <br /><br />GTM Copilot Team</div>'+
                                                                                                '</td>'+
                                                                                            '</tr>'+
                                                                                        '</tbody>'+
                                                                                    '</table>'+
                                                                                '</td>'+
                                                                            '</tr>'+
                                                                            '<tr>'+'<td style="text-align:center;line-height:0;font-size:0;height:24px">'+'</td>'+'</tr>'+
                                                                        '</tbody>'+
                                                                    '</table>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                        '</tbody>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td style="text-align:center;line-height:0;font-size:0;height:16px">'+'</td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>'+
                                '</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td bgcolor="#303C55">'+
                                    '<table cellpadding="0" cellspacing="0" border="0" style="width:100%" align="center">'+
                                        '<tbody>'+
                                            '<tr>'+
                                                '<td colspan="2">'+
                                                    '<table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">'+
                                                        '<tbody>'+
                                                            '<tr>'+
                                                                '<td style="padding:0px;margin:0px">'+
                                                                    '<table bgcolor="#f7f7f7" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0;background-color:#f7f7f7">'+
                                                                        '<tbody>'+
                                                                            '<tr>'+
                                                                                '<td>'+
                                                                                    '<table bgcolor="#f7f7f7" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;border-spacing:0">'+
                                                                                        '<tbody>'+
                                                                                            '<tr>'+
                                                                                                '<td style="line-height:0;font-size:0;vertical-align:top;padding:0px;text-align:center" height="24">'+'</td>'+
                                                                                            '</tr>'+
                                                                                            '<tr>'+
                                                                                                '<td style="line-height:0;font-size:0;vertical-align:top;padding:0px;text-align:center" height="7">'+'</td>'+
                                                                                            '</tr>'+
                                                                                        '</tbody>'+
                                                                                    '</table>'+
                                                                                '</td>'+
                                                                            '</tr>'+
                                                                        '</tbody>'+
                                                                    '</table>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                        '</tbody>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>'+
                                '</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'
                    })
                    mailResponse.push(inviteMail);
                } else {
                    myResolve({code: 'Exists', status: 'error',message: 'User with email '+mail+' already exists'})
                }
                i++;
                if (i === mailList.length){ 
                    myResolve(mailResponse);
                }
            };
        } catch (error) {
            myResolve(error);
        }
    });
}
export const getUserSetting = (request, response) => {
    const { userID } = request.body;
    const query = `SELECT ${users_table.email}, ${users_table.organization_name}, ${users_table.organization_country}, ${users_table.organization_domain}, ${users_table.name}, ${users_table.role}, ${users_table.plan}, ${users_table.google_id}, ${users_table.usertype} FROM ${users_table.schemaTableName} WHERE ${users_table.id} = $1`;

    connection.query(query, [ userID ], function(error, results){
        if(error) throw error;
        if(results.rowCount > 0){
            response.send({
                status: "success",
                data: results.rows
            })
        } else {
            response.send({
                status: "error",
                data: 'No user found'
            })
        }
    })

}

export const updateOrganizations = async(request, response) => {
    const { OrganizationName, OrganizationCountry, userID } = request.body;
    const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.organization_name} =$1, ${users_table.organization_country} =$2 WHERE ${users_table.id} = $3`
    connection.query(query, [ OrganizationName, OrganizationCountry, userID ], function(error, results){
        if(error) throw error;
        if(results.rowCount > 0){
            response.send({
                status: "success",
                data: results
            })
        } else {
            response.send({
                status: "error",
                data: 'No user found'
            })
        }
    });
}

export const updateUser = (request, response) => {
    const { name, role, userID } = request.body;
    const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.name} =$1, ${users_table.role}=$2 WHERE ${users_table.id}=$3`
    connection.query(query, [ name, role, userID ], function(error, results){
        if(error) throw error;
        if(results.rowCount > 0){
            response.send({
                status: "success",
                data: results
            })
        } else {
            response.send({
                status: "error",
                data: 'No user found'
            })
        }
    });
}

export const updatePlan = (request, response) => {
    const { plan, userID } = request.body;
    const query = `UPDATE ${users_table.schemaTableName} SET ${users_table.plan} =$1 WHERE ${users_table.id}=$2`
    connection.query(query, [ plan, userID ], function(error, results){
        if(error) throw error;
        if(results.rowCount > 0){
            response.send({
                status: "success",
                data: results
            })
        } else {
            response.send({
                status: "error",
                data: 'No user found'
            })
        }
    })
}

export const inviteUser = async (request, response) => {
    const mailList = request.body.mailList.split(',');
    const { userName, inviteURL, workspace } = request.body;
    const mailResponse = await sendMultipleMail(mailList, userName, inviteURL, workspace);
    console.log(mailResponse)
    if(mailResponse.length == mailList.length){
        response.send({
            status: "success",
            data: "User invited successfully"
        })
    } else if(mailResponse.responseCode == 550){
        response.send({
            status: "error",
            data: "No such user with the email "+mailResponse.rejected.toString(),
            message: mailResponse
        })
    } else if(mailResponse.code == 'Exists'){
        response.send({
            status: "error",
            data: mailResponse.message,
        })
    } else {
        response.send({
            status: "error",
            data: "Unable to send invite email",
            message: mailResponse
        })
    }
}

export default router;