import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, subject, message } = body;

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'aadityaamlanpanda@gmail.com',
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
