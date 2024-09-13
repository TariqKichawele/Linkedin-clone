import { mailtrapclient, sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";


export const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recipient = [{ email }];

    try {
        const res = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to LinkedIn!",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: 'welcome'
        })

        console.log('Welcome email sent successfully:', res.message);
    } catch (error) {
        throw error;
    }
}

export const sendCommentNotificationEmail = async (
    recipientEmail, 
    recipientName, 
    commenterName, 
    postUrl, 
    commentContent
) => {
    const recipient = [{ email: recipientEmail }];

    try {
        const res = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: `${commenterName} commented on your post`,
            html: createCommentNotificationEmailTemplate(commenterName, recipientName, postUrl, commentContent),
            category: 'comment'
        })

        console.log('Comment notification email sent successfully:', res.message);
    } catch (error) {
        throw error;
    }
}

export const sendConnectionAcceptedEmail = async (senderEmail, recipientName, senderName, profileUrl) => {
    const recipient = [{ email: senderEmail }];

    try {
        const res = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: `${recipientName} accepted your connection request`,
            html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
            category: 'connection_accepted'
        })

        console.log('Connection accepted email sent successfully:', res.message);
    } catch (error) {
        throw error;
    }
}