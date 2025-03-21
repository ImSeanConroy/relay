import resend from "../config/resend.js";
import { config } from "../constants/app.config.js";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Returns the sender email address based on the environment.
 * In development, the sender is set to "onboarding@resend.dev", 
 * and in production, it uses the email specified in the config.
 * 
 * @returns The email address to send from.
 */
const getFromEmail = () => {
  return config.NODE_ENV === "development" ? "onboarding@resend.dev" : config.RESEND.SENDER_MAILER;
}

/**
 * Returns the recipient email address based on the environment.
 * In development, the recipient is set to "delivered@resend.dev",
 * and in production, it uses the email provided in the function parameter.
 * 
 * @param to - The recipient email address.
 * @returns The email address to send to.
 */
const getToEmail = (to: string) => {
  return config.NODE_ENV === "development" ? "delivered@resend.dev" : to;
}

/**
 * Sends an email using the Resend email service.
 * 
 * This function sends an email with the provided subject, plain-text content,
 * and HTML content to a specified recipient. The sender address is set to
 * "onboarding@resend.dev" for simplicity, and the recipient is currently hardcoded
 * to "delivered@resend.dev" for testing purposes.
 *
 * @param params - The email parameters.
 * @param params.to - The recipient's email address.
 * @param params.subject - The subject of the email.
 * @param params.text - The plain-text content of the email.
 * @param params.html - The HTML version of the email content.
 * @returns A promise that resolves when the email is sent.
 */
export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });