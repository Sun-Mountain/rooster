import { getUserById } from "@/lib/prisma/user";
import { logger } from "@/helpers/logger";
import transporter from "@/helpers/email/email_config";

// Send a notification email to set of users based on an array of user IDs. The subject line and text of the email message also need to be provided provided
export async function sendNotificationEmail(users: Array<string>, subjectLine: string, emailText: string){
	try {
		for (const user of users) {
			const userInfo = await getUserById(user);
			if (!userInfo) {
				logger.info('No user ID found for user %s', user);
				continue;
			}
			const info = await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: userInfo.email,
				subject: subjectLine,
				html: emailText
			});

		logger.info("Message sent: %s", info.messageId);
		}
	} catch (err) {
		logger.error('Error while sending mail:', err);
		throw err
	};
}