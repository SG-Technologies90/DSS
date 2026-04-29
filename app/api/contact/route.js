import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, phone, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jobclub.jc@gmail.com",
      subject: `New Website Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center; border-bottom: 2px solid #fcd34d; padding-bottom: 10px;">New Website Inquiry</h2>
          <p style="color: #555; font-size: 16px;">You have received a new contact form submission from your website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email || "Not provided"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ccc; color: #444; white-space: pre-wrap;">${message}</div>
          </div>
          
          <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
            This email was sent automatically from your website's contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}