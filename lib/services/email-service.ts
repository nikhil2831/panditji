import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendBookingEmailInput {
  bookingId: string;
  name: string;
  phone?: string;
  serviceName: string;
  preferredDate: string;
  address: string;
  createdAt: string;
}

export async function sendBookingNotificationEmail(input: SendBookingEmailInput) {
  const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) {
    console.warn("Notification recipient email is not set, skipping email notification");
    return;
  }

  const mailOptions = {
    from: `"Pandit Ji Platform" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `🚩 New Pooja Booking Received: ${input.serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #f0e6df; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #6d1b1b, #c83a2a); color: white; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">नया अनुष्ठान बुकिंग अनुरोध</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">🚩 विश्व धर्मार्थ सेवा ट्रस्ट 🚩</p>
        </div>
        <div style="padding: 24px; background-color: #fffaf7;">
          <h2 style="color: #6d1b1b; border-bottom: 2px solid #f0e6df; padding-bottom: 8px; margin-top: 0; font-size: 18px;">बुकिंग विवरण (Booking Details)</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555; width: 35%;">नाम (Name):</td>
              <td style="padding: 10px 0; color: #222; font-weight: bold;">${input.name}</td>
            </tr>
            ${input.phone ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">मोबाइल (Phone):</td>
              <td style="padding: 10px 0; color: #222; font-weight: bold;">${input.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">सेवा (Service):</td>
              <td style="padding: 10px 0; color: #6d1b1b; font-weight: bold;">${input.serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">पसंदीदा तिथि (Date):</td>
              <td style="padding: 10px 0; color: #222;">${input.preferredDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">पता (Address):</td>
              <td style="padding: 10px 0; color: #222; white-space: pre-wrap;">${input.address}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">बुक किया गया समय:</td>
              <td style="padding: 10px 0; color: #666; font-size: 13px;">${new Date(input.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #ede5dd; color: #6d1b1b; padding: 15px; text-align: center; font-size: 13px; font-weight: bold; border-top: 1px solid #f0e6df;">
          ।। सर्वे भवन्तु सुखिनः ।।
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
