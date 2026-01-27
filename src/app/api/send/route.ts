import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Ivy Group <onboarding@resend.dev>",
      to: ["osmusigah@gmail.com"],
      subject: "Test Email from Next.js",
      html: `
        <h2>Hello Stallone 👋</h2>
        <p>This email was sent successfully using <strong>Resend</strong> from a GET API route.</p>
        <p>All systems are working 🚀</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
