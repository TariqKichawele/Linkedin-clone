import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "tariqkichawele66@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    html: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);