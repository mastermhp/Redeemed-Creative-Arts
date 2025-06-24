import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail({ to, subject, html, text }) {
  try {
    const info = await transporter.sendMail({
      from: `"Redeemed Creative Arts" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    })

    return info
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`)
  }
}

export async function sendVerificationEmail(email, token, name) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="color: #f59e0b;">Welcome to Redeemed Creative Arts!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining our faith-based creative community. Please verify your email address by clicking the button below:</p>
      <a href="${verificationUrl}" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
        Verify Email Address
      </a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>Blessings,<br>The Redeemed Creative Arts Team</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: "Verify Your Email - Redeemed Creative Arts",
    html,
    text: `Welcome to Redeemed Creative Arts! Please verify your email by visiting: ${verificationUrl}`,
  })
}

export async function sendPasswordResetEmail(email, token, name) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="color: #f59e0b;">Password Reset Request</h1>
      <p>Hi ${name},</p>
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
        Reset Password
      </a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Blessings,<br>The Redeemed Creative Arts Team</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: "Reset Your Password - Redeemed Creative Arts",
    html,
    text: `Reset your password by visiting: ${resetUrl}`,
  })
}
