"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import nodemailer from "nodemailer";

export const sendOrderConfirmation = action({
  args: {
    orderId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      total: v.number(),
    }),
    emailHtml: v.string(),
  },
  handler: async (ctx, args) => {
    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const emailFrom = process.env.EMAIL_FROM || smtpUser;

    // Debug: Log environment variables (without sensitive data)
    console.log('Email Configuration Check:');
    console.log('- SMTP_HOST:', smtpHost ? '✅ Set' : '❌ Missing');
    console.log('- SMTP_PORT:', smtpPort || 'Using default 587');
    console.log('- SMTP_USER:', smtpUser ? '✅ Set' : '❌ Missing');
    console.log('- SMTP_PASSWORD:', smtpPassword ? '✅ Set (hidden)' : '❌ Missing');
    console.log('- EMAIL_FROM:', emailFrom || 'Using SMTP_USER');
    console.log('- Recipient:', args.customerEmail);

    // Check SMTP configuration
    if (!smtpHost || !smtpUser || !smtpPassword) {
      const errorMsg = "SMTP configuration is missing. Email will not be sent. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables in your Convex Dashboard → Settings → Environment Variables.";
      console.warn(errorMsg);
      // Return success status without sending email - don't block checkout
      return { 
        success: false, 
        messageId: null,
        error: errorMsg
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Send email
    try {
      console.log(`Attempting to send email to ${args.customerEmail}...`);
      
      const info = await transporter.sendMail({
        from: `"Audiophile" <${emailFrom}>`,
        to: args.customerEmail,
        subject: `Order Confirmation - Order #${args.orderId}`,
        html: args.emailHtml,
        // Add headers to prevent spam and improve deliverability
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
          'Auto-Submitted': 'auto-generated',
        },
        // Add proper sender/return information
        replyTo: emailFrom,
        // Add message ID
        messageId: `${Date.now()}-${Math.random().toString(36).substring(7)}@audiophile.com`,
      });

      console.log('✅ Email sent successfully!');
      console.log('- Message ID:', info.messageId);
      console.log('- Response:', info.response);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending email:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
      });
      throw new Error(`Failed to send confirmation email: ${error.message}. Please check your SMTP configuration in Convex Dashboard.`);
    }
  },
});

