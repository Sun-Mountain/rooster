import { logger } from "@/helpers/logger";
import transporter from "@/helpers/email/email_config";

export async function sendVerificationEmail(email: string, verificationUrl: string){
	try {
 		const info = await transporter.sendMail({
			from: process.env.SMTP_FROM,
			to: email,
    		subject: "Verify your Rooster account",
    		text: `Verify your Rooster account by visiting: ${verificationUrl}`,
			html: `<p>Verify your Rooster account by clicking <a href="${verificationUrl}">this link</a>.</p>`,
  		});

  		logger.info("Message sent: %s", info.messageId);
	} catch (err) {
  		logger.error("Error while sending mail:", err);
		throw err;
	}
}