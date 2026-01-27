"use server";

import { Resend } from "resend";

export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  propertyInterest?: string;
  message: string;
  formType?: "contact" | "reservation" | "newsletter";
}

function getEmailTemplate(data: ContactFormPayload, type: "contact" | "reservation" | "newsletter") {
  switch (type) {
    case "reservation":
      return {
        subject: `New Reservation Request – ${data.propertyInterest || "Property"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
              🏡 New Reservation Request
            </h2>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Client Information</h3>
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Reservation Details</h3>
              <p><strong>Property:</strong> ${data.propertyInterest || "Not specified"}</p>
              <p><strong>Request Type:</strong> ${data.inquiryType}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Additional Information</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>This reservation request was submitted via the Ivy Group website.</p>
              <p>Please respond within 24 hours to maintain excellent customer service.</p>
            </div>
          </div>
        `
      };

    case "newsletter":
      return {
        subject: `📧 New Newsletter Subscription`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
              📧 New Newsletter Subscription
            </h2>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Subscription Date:</strong> ${new Date().toLocaleDateString("en-US", { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
              <p style="margin: 0;">✅ Add this email to your mailing list</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>This subscription was submitted via the Ivy Group website footer.</p>
            </div>
          </div>
        `
      };

    case "contact":
    default:
      return {
        subject: `New Contact Inquiry – ${data.inquiryType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
              💬 New Contact Us Message
            </h2>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Inquiry Details</h3>
              <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
              <p><strong>Property Interest:</strong> ${data.propertyInterest || "N/A"}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>This message was submitted via the Ivy Group website contact form.</p>
              <p>Please respond within 24 hours to maintain excellent customer service.</p>
            </div>
          </div>
        `
      };
  }
}

export async function sendContactEmail(data: ContactFormPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const formType = data.formType || "contact";

  try {
    const template = getEmailTemplate(data, formType);

    await resend.emails.send({
      from: "Ivy Group <onboarding@resend.dev>",
      to: ["osmusigah@gmail.com"],
      replyTo: data.email,
      subject: template.subject,
      html: template.html,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact email failed:", error);
    return { success: false, error: "Failed to send message" };
  }
}