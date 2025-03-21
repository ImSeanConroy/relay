/**
 * Function to generate the Password Reset email template.
 * This template is sent when a user requests to reset their password. It includes a unique reset link.
 *
 * @param url - The URL to reset the user's password.
 * @returns - An object representing the email with subject, plain text, and HTML content.
 */
export const getPasswordResetTemplate = (url: string) => ({
  subject: "Password Reset",
  text: `Click on the link to reset your password: ${url}`,
  html: `<!DOCTYPE html><html><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"><title>Reset Your Password</title><meta name="description" content="Reset Your Password."><style>body{margin:0;padding:0;text-align:center;font-family:Inter,sans-serif}.container{width:100%;max-width:600px;margin:40px auto;background-color:#fff;padding:24px;text-align:left}.content{display:flex;flex-direction:column;gap:1.25rem}.heading{font-weight:700;font-size:2.25rem;line-height:2.5rem;margin:0}.text{font-size:1rem;line-height:1.5rem;margin:0;color:gray}.button{display:inline-block;background-color:oklch(.21 .006 285.885);color:oklch(.985 0 0);padding:.6rem .8rem;border-radius:.5rem;cursor:pointer;text-decoration:none;font-size:.9rem;line-height:1.5rem;margin-top:10px;text-align:center;transition:opacity .3s}.button:hover{opacity:.9}</style></head><body><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td><table role="presentation" class="container" cellspacing="0" cellpadding="0"><tr><td class="content"><p class="text" style="font-weight:600">Authentication Tester</p><h2 class="heading">Reset Your Password</h2><p class="text">We received a request to reset your password. Click the button below to set a new password. If you didn't request this, please ignore this email.</p><a target="_blank" href="${url}" class="button">Reset Password</a></td></tr></table></td></tr></table></body></html>`,
});

/**
 * Function to generate the Verify Email Address email template.
 * This template is sent when a user needs to verify their email address after signing up.
 *
 * @param url - The URL to verify the user's email address.
 * @returns - An object representing the email with subject, plain text, and HTML content.
 */
export const getVerifyEmailTemplate = (url: string) => ({
  subject: "Verify Email Address",
  text: `Click on the link to verify your email address: ${url}`,
  html: `<!DOCTYPE html><html><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"><title>Verify Your Email Address</title><meta name="description" content="Verify Your Email Address."><style>body{margin:0;padding:0;text-align:center;font-family:Inter,sans-serif}.container{width:100%;max-width:600px;margin:40px auto;background-color:#fff;padding:24px;text-align:left}.content{display:flex;flex-direction:column;gap:1.25rem}.heading{font-weight:700;font-size:2.25rem;line-height:2.5rem;margin:0}.text{font-size:1rem;line-height:1.5rem;margin:0;color:gray}.button{display:inline-block;background-color:oklch(.21 .006 285.885);color:oklch(.985 0 0);padding:.6rem .8rem;border-radius:.5rem;cursor:pointer;text-decoration:none;font-size:.9rem;line-height:1.5rem;margin-top:10px;text-align:center;transition:opacity .3s}.button:hover{opacity:.9}</style></head><body><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td><table role="presentation" class="container" cellspacing="0" cellpadding="0"><tr><td class="content"><p class="text" style="font-weight:600">Authentication Tester</p><h2 class="heading">Verify Your Email Address</h2><p class="text">To complete your sign-up, please verify your email address by clicking the button below. If you didn't sign up, please ignore this email.</p><a target="_blank" href="${url}" class="button">Verify Email</a></td></tr></table></td></tr></table></body></html>`,
});
