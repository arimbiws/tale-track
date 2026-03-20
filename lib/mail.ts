import nodemailer from "nodemailer";

const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;
  const logoUrl = `${domain}/logo/logo-taletrack.png`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"TaleTrack Support" <noreply@taletrack.com>',
    to: email,
    subject: "Reset Your TaleTrack Password",
    html: `
      <div style="margin:0; padding:0; background-color:#f9fafb; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        
        <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:16px; padding:32px; border:1px solid #e5e7eb;">
          
          <div style="text-align:center; margin-bottom:24px;">
            <img src="${logoUrl}" alt="TaleTrack Logo" style="height:50px;" />
          </div>

          <h2 style="color:#111827; font-size:24px; font-weight:700; text-align:center; margin-bottom:16px;">
            Reset Your Password
          </h2>

          <p style="color:#374151; font-size:15px; line-height:1.6; margin-bottom:16px;">
            Hello,
          </p>

          <p style="color:#374151; font-size:15px; line-height:1.6; margin-bottom:24px;">
            We received a request to reset your TaleTrack account password. Click the button below to set a new one.
          </p>

          <div style="text-align:center; margin:32px 0;">
            <a href="${resetLink}" 
              style="
                background-color:#519a66;
                color:#ffffff;
                padding:14px 28px;
                text-decoration:none;
                border-radius:10px;
                font-weight:600;
                font-size:15px;
                display:inline-block;
              ">
              Reset Password
            </a>
          </div>

          <p style="color:#6b7280; font-size:13px; line-height:1.6; margin-bottom:24px;">
            This link will expire in <strong>1 hour</strong>. If you didn’t request this, you can safely ignore this email.
          </p>

          <hr style="border:none; border-top:1px solid #f3f4f6; margin:24px 0;" />

          <p style="color:#9ca3af; font-size:12px; text-align:center;">
            © ${new Date().getFullYear()} TaleTrack <br/>
            Track your tales, connect your pages.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
