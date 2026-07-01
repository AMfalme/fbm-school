import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, template, data } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to and subject are required" },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = parseInt(process.env.EMAIL_PORT || "587");
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const emailFrom = process.env.EMAIL_FROM || emailUser;

    if (!emailHost || !emailUser || !emailPassword) {
      console.error("Email configuration is incomplete");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465, // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Generate email content based on template
    let htmlContent = "";
    let textContent = "";

    if (template === "donation-confirmation") {
      const donorName = data?.donorName || "Anonymous";
      const amount = data?.amount || "0.00";
      const reference = data?.reference || "N/A";
      const currency = data?.currency || "USD";

      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Donation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0055b8, #3b82f6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .donation-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0055b8; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: bold; color: #64748b; }
            .detail-value { color: #1e293b; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #64748b; font-size: 12px; }
            .button { display: inline-block; background: #0055b8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🙏 Thank You for Your Generosity!</h1>
            <p>Freedom Baptist Mission</p>
          </div>
          <div class="content">
            <p>Dear ${donorName},</p>
            <p>Thank you for your generous donation to Freedom Baptist Mission. Your support helps us transform lives across Kenya and beyond through spreading the Gospel.</p>
            
            <div class="donation-details">
              <h2 style="margin-top: 0; color: #0055b8;">Donation Details</h2>
              <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">${currency} ${amount}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${reference}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: #10b981;">✓ Payment Successful</span>
              </div>
            </div>

            <p>Your donation has been processed successfully. A receipt has been generated for this transaction.</p>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact us at <a href="mailto:kenyafbmission@gmail.com">kenyafbmission@gmail.com</a>.</p>
            
            <p style="margin-top: 30px;">Blessings,<br><strong>The Freedom Baptist Mission Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Freedom Baptist Mission. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `;

      textContent = `
        Thank You for Your Generosity!
        
        Dear ${donorName},
        
        Thank you for your generous donation to Freedom Baptist Mission. Your support helps us transform lives across Kenya and beyond through spreading the Gospel.
        
        Donation Details:
        - Amount: ${currency} ${amount}
        - Reference: ${reference}
        - Status: Payment Successful
        
        Your donation has been processed successfully.
        
        If you have any questions, please contact us at kenyafbmission@gmail.com.
        
        Blessings,
        The Freedom Baptist Mission Team
      `;
    } else {
      // Generic email template
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0055b8; color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${subject}</h1>
          </div>
          <div class="content">
            <p>${data?.message || "Thank you for your support!"}</p>
          </div>
        </body>
        </html>
      `;

      textContent = `${subject}\n\n${data?.message || "Thank you for your support!"}`;
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Freedom Baptist Mission" <${emailFrom}>`,
      to: to,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    console.log("Email sent successfully:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}