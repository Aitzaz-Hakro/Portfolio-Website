import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email template matching portfolio design
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: linear-gradient(180deg, #0d0d14 0%, #0a0a0f 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(30, 79, 168, 0.2);">
                
                <!-- Header with gradient accent -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 4px; background: linear-gradient(90deg, transparent, #1E4FA8, #3B82F6, #1E4FA8, transparent);"></div>
                  </td>
                </tr>
                
                <!-- Logo/Brand Section -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px;">
                      <span style="color: #ffffff;">Aitzaz</span>
                      <span style="color: #1E4FA8;"> Hassan</span>
                    </h1>
                    <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.4); font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Portfolio Contact</p>
                  </td>
                </tr>
                
                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(30, 79, 168, 0.3), transparent);"></div>
                  </td>
                </tr>
                
                <!-- Notification Badge -->
                <tr>
                  <td style="padding: 30px 40px 20px 40px; text-align: center;">
                    <div style="display: inline-block; background: rgba(30, 79, 168, 0.1); border: 1px solid rgba(30, 79, 168, 0.3); border-radius: 50px; padding: 8px 20px;">
                      <span style="color: #3B82F6; font-size: 13px; font-weight: 500;">✨ New Message Received</span>
                    </div>
                  </td>
                </tr>
                
                <!-- Sender Info Card -->
                <tr>
                  <td style="padding: 10px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              
                              <td style="padding-left: 16px;" valign="top">
                                <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">${name}</p>
                                <p style="margin: 4px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 14px;">${email}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                ${subject ? `
                <!-- Subject Card -->
                <tr>
                  <td style="padding: 10px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 8px 0; color: rgba(255, 255, 255, 0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500;">Subject</p>
                          <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Message Card -->
                <tr>
                  <td style="padding: 10px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500;">Message</p>
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Reply Button -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center;">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1E4FA8, #3B82F6); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">
                      Reply to ${name.split(' ')[0]} →
                    </a>
                  </td>
                </tr>
                
                <!-- Footer Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);"></div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: rgba(255, 255, 255, 0.3); font-size: 12px;">
                      Sent from your Portfolio • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <table cellpadding="0" cellspacing="0" style="margin: 16px auto 0 auto;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="https://github.com/Aitzaz-Hakro/" style="color: rgba(255, 255, 255, 0.4); text-decoration: none; font-size: 12px;">GitHub</a>
                        </td>
                        <td style="color: rgba(255, 255, 255, 0.2);">•</td>
                        <td style="padding: 0 8px;">
                          <a href="https://linkedin.com/in/aitzazhassan2005" style="color: rgba(255, 255, 255, 0.4); text-decoration: none; font-size: 12px;">LinkedIn</a>
                        </td>
                        <td style="color: rgba(255, 255, 255, 0.2);">•</td>
                        <td style="padding: 0 8px;">
                          <a href="mailto:aitzazhakro123@gmail.com" style="color: rgba(255, 255, 255, 0.4); text-decoration: none; font-size: 12px;">Email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Bottom Accent Line -->
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 4px; background: linear-gradient(90deg, transparent, #1E4FA8, #3B82F6, #1E4FA8, transparent);"></div>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject ? `Portfolio: ${subject}` : `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ''}\nMessage:\n${message}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
