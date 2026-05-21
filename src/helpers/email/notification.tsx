const nodemailer = require("nodemailer");

import { NextResponse, NextRequest } from "next/server";
import { getUserById } from "@/lib/prisma/user";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send a notification email to set of users based on an array of user IDs. The subject line and text of the email message also need to be provided provided
export async function sentNotificationEmail(users: Array(String), subjectLine: String, emailText: String){
	try {
		for user in users{
			const userInfo = getUserById(user)
			if (!userinfo) {
				console.log('No user ID found for user %s', user)
				continue
			}
			const info = await transporter.sendMail({
				from: '"No Reply" <no-reply@rooster.com>',
				to: userInfo.email,
				subject: subjectLine,
				html: emailText
			});

		console.log("Message sent: %s, info.messageId);
		} catch (err) {
			console.error('Error while sending mail:' err);
			throw err
		}
	}
}