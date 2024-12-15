import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import type { EmailData } from '@/lib/types';
import { SENDGRID_API_KEY, FROM_EMAIL } from '@/lib/config';

sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST(request: Request) {
  try {
 
    const data: EmailData = await request.json();

    if (data.email === '') {
      return NextResponse.json({ success: false, message: 'Email is required' });
    }
    
    const msg: sgMail.MailDataRequired = {
      to: data.email,
      from: "webpoint.development@gmail.com",
      subject: data.result === 'yes' ? '💖 They Said Yes!' : 'Proposal Response',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${data.result === 'yes' ? '#ec4899' : '#374151'}; text-align: center;">
            ${data.result === 'yes' ? '💖 They Said Yes!' : 'Proposal Response'}
          </h1>
          <div style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p><strong>Original Message:</strong> ${data.message}</p>
            <p><strong>Response:</strong> ${data.result.toUpperCase()}</p>
            ${Number(data?.noCount) > 0 ? `<p><strong>Number of "No" clicks before saying yes:</strong> ${data.noCount}</p>` : ''}
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("=============", "error", error);
    
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
