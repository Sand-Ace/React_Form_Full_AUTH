import { MailtrapClient } from "mailtrap";

const TOKEN = "f4407360ca4f0a9dd2a79a6bf96eb693";

export const Mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Sandesh",
};

// const recipients = [
//   {
//     email: "sandeshk850@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
