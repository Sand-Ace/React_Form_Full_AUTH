import { Mailtrapclient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Verification email send sucessfully", response);
  } catch (error) {
    console.log("Error while sending verificationemail:", error.message);
    throw new Error("Error while sending error:", error.message);
  }
};

export const sendWelcomeEmail = async (uEmail, uName) => {
  const recipient = [{ email: uEmail }];
  console.log(uEmail, uName);
  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Welcome message",
      html: WELCOME_EMAIL_TEMPLATE.replace("{username}", uName),
      category: "Welcome Message",
    });
    console.log("Welcome, email sent sucessfully", response);
  } catch (error) {
    throw new Error(`Error while sending welcome email: ${error.message}`);
  }
};

export const sendPasswordForgotEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password reset",
    });
    console.log("Reset password email sent sucessfully", response);
  } catch (error) {
    throw new Error(
      `Error while sending password reset email: ${error.message}`
    );
  }
};

export const sendResetSucessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipient,
      subject: "Sucessfully reset your password",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "pasword reset",
    });

    console.log("Reset password sucessfull email sent", response);
  } catch (error) {
    console.log(
      "Error while sending password reset sucessfull email",
      error.message
    );
    throw new Error(
      `Error while sending reset sucessfull email: ${error.message}`
    );
  }
};
