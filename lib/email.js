import nodemailer from "nodemailer"

const createTransporter = () => {
  if (process.env.NODE_ENV === "development") {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ethereal.user@ethereal.email",
        pass: "ethereal.pass",
      },
    })
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}


// Email templates
const getEmailTemplate = (type, data) => {
  const baseStyle = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
      .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
      .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
      .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
      .button:hover { background: #d97706; }
      .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0; }
    </style>
  `

  switch (type) {
    case "verification":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email - Redeemed Creative Arts</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 Redeemed Creative Arts</h1>
              <h2>Welcome to Our Community!</h2>
            </div>
            <div class="content">
              <h3>Hello ${data.name}!</h3>
              <p>Thank you for joining Redeemed Creative Arts! We're excited to have you as part of our faith-based creative community.</p>
              
              <div class="highlight">
                <p><strong>🎉 Welcome Bonus:</strong> Verify your email to earn <strong>50 bonus points</strong> and unlock all platform features!</p>
              </div>
              
              <p>To complete your registration and start your creative journey, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${data.token}" class="button">
                  Verify My Email Address
                </a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">
                ${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${data.token}
              </p>
              
              <p><strong>This verification link will expire in 24 hours.</strong></p>
              
              <p>If you didn't create an account with us, please ignore this email.</p>
              
              <p>Blessings,<br>The Redeemed Creative Arts Team</p>
            </div>
            <div class="footer">
              <p>© 2024 Redeemed Creative Arts. All rights reserved.</p>
              <p>This email was sent to ${data.email}</p>
            </div>
          </div>
        </body>
        </html>
      `

    case "passwordReset":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password - Redeemed Creative Arts</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
              <h2>Redeemed Creative Arts</h2>
            </div>
            <div class="content">
              <h3>Hello ${data.name}!</h3>
              <p>We received a request to reset your password for your Redeemed Creative Arts account.</p>
              
              <div class="highlight">
                <p><strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account is still secure.</p>
              </div>
              
              <p>To reset your password, click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${data.token}" class="button">
                  Reset My Password
                </a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">
                ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${data.token}
              </p>
              
              <p><strong>This reset link will expire in 10 minutes for security reasons.</strong></p>
              
              <p>If you continue to have problems, please contact our support team.</p>
              
              <p>Blessings,<br>The Redeemed Creative Arts Team</p>
            </div>
            <div class="footer">
              <p>© 2024 Redeemed Creative Arts. All rights reserved.</p>
              <p>This email was sent to ${data.email}</p>
            </div>
          </div>
        </body>
        </html>
      `

    default:
      return ""
  }
}

// Send verification email
export async function sendVerificationEmail(email, token, name) {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Redeemed Creative Arts" <${process.env.EMAIL_FROM || "noreply@redeemedcreative.com"}>`,
      to: email,
      subject: "Verify Your Email - Welcome to Redeemed Creative Arts! 🎨",
      html: getEmailTemplate("verification", { email, token, name }),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Verification email sent:", info.messageId)

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info))
    }

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Failed to send verification email:", error)
    throw new Error("Failed to send verification email")
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email, token, name) {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Redeemed Creative Arts" <${process.env.EMAIL_FROM || "noreply@redeemedcreative.com"}>`,
      to: email,
      subject: "Reset Your Password - Redeemed Creative Arts 🔐",
      html: getEmailTemplate("passwordReset", { email, token, name }),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Password reset email sent:", info.messageId)

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info))
    }

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error)
    throw new Error("Failed to send password reset email")
  }
}

// Send welcome email (after verification)
export async function sendWelcomeEmail(email, name, userType) {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Redeemed Creative Arts" <${process.env.EMAIL_FROM || "noreply@redeemedcreative.com"}>`,
      to: email,
      subject: `Welcome to Redeemed Creative Arts, ${name}! 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Redeemed Creative Arts</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1>🎨 Welcome to Redeemed Creative Arts!</h1>
            </div>
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
              <h3>Hello ${name}!</h3>
              <p>Your email has been verified and your account is now active! Welcome to our community of faith-based creatives.</p>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>🎉 You've earned 50 bonus points for verifying your email!</strong></p>
              </div>
              
              <p>As a ${userType}, you now have access to:</p>
              <ul>
                ${
                  userType === "artist"
                    ? `
                  <li>Upload and showcase your artwork</li>
                  <li>Participate in contests and challenges</li>
                  <li>Connect with patrons and churches</li>
                  <li>Earn points and rewards</li>
                `
                    : userType === "patron"
                      ? `
                  <li>Discover and support Christian artists</li>
                  <li>Purchase original artwork and prints</li>
                  <li>Participate in funding campaigns</li>
                  <li>Build your art collection</li>
                `
                      : userType === "church"
                        ? `
                  <li>Connect with local Christian artists</li>
                  <li>Post art requests and projects</li>
                  <li>Host events and workshops</li>
                  <li>Build your arts ministry</li>
                `
                        : `
                  <li>Full platform access</li>
                  <li>Community features</li>
                  <li>Points and rewards system</li>
                `
                }
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Go to Dashboard
                </a>
              </div>
              
              <p>If you have any questions, feel free to reach out to our support team.</p>
              
              <p>Blessings,<br>The Redeemed Creative Arts Team</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280;">
              <p>© 2024 Redeemed Creative Arts. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Welcome email sent:", info.messageId)

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error)
    // Don't throw error for welcome email as it's not critical
    return { success: false, error: error.message }
  }
}
