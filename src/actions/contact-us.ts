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
}

export async function sendContactEmail(data: ContactFormPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Ivy Group <onboarding@resend.dev>",
      to: ["osmusigah@gmail.com"],
      replyTo: data.email,
      subject: `New Contact Inquiry – ${data.inquiryType}`,
      html: `
        <h2>New Contact Us Message</h2>

        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
        <p><strong>Property Interest:</strong> ${data.propertyInterest || "N/A"}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact email failed:", error);
    return { success: false, error: "Failed to send message" };
  }
}
