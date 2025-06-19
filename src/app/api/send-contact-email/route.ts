// src/app/api/send-contact-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { fetchContactEmail } from '@/api/strapiMockApi'; // Ensure this path is correct

export async function POST(request: Request) {
    try {
        // Parse the JSON body sent from your contact form
        const { name, number, message } = await request.json();

        // 1. Fetch the recipient email from your mock API (simulating Strapi)
        // This is where the 'editable' email comes from.
        const recipientEmail = await fetchContactEmail();

        if (!recipientEmail) {
            console.error("Recipient email not found from mock API.");
            return NextResponse.json({ message: 'Recipient email not configured.' }, { status: 500 });
        }

        // Get sender email and SMTP configuration from environment variables
        // These variables are now loaded from your .env.local file
        const senderEmail = process.env.SENDER_EMAIL;
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        // Basic check to ensure all necessary environment variables are set
        if (!senderEmail || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            console.error("Missing SMTP environment variables in .env.local! Check if all are defined.");
            return NextResponse.json({ message: 'Server email configuration missing or incomplete.' }, { status: 500 });
        }

        // 2. Configure Nodemailer transporter using Ethereal's SMTP details
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort, 10), // Convert port to a number
            // 'secure' should be true if port is 465 (SSL), false otherwise (like 587 for TLS/STARTTLS)
            secure: parseInt(smtpPort, 10) === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            // Optional: Add logging for debugging in your server's console
            // logger: true,
            // debug: true,
        });

        // 3. Define the email content
        const mailOptions = {
            from: senderEmail,             // The fixed sender email (mattheneshanmugam@gmail.com)
            to: recipientEmail,            // The recipient email (mattheneshanmugam@gmail.com from mock API)
            subject: `New Contact Message from ${name} - Bike Shop`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Number:</strong> ${number}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <br>
                <small>Sent from ${senderEmail} via Ethereal Email for testing.</small>
            `,
        };

        // 4. Send the email
        await transporter.sendMail(mailOptions);

        // Respond to the client that the email was sent successfully
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error in send-contact-email API route:', error);
        // Respond with an error message
        return NextResponse.json({ message: 'Failed to send email.', error: (error as Error).message }, { status: 500 });
    }
}