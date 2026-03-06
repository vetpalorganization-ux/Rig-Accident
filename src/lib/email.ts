// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  timestamp: string;
  answers?: Record<string, string>;
  source: 'chat' | 'form' | 'calculator' | 'attorney';
  metadata?: Record<string, unknown>;
}

export const sendLeadEmail = async (data: LeadData) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not defined. Skipping email sending.');
    return { success: false, message: 'API key missing' };
  }

  const { name, phone, email, timestamp, answers, source, metadata } = data;
  const subject =
    source === 'attorney'
      ? 'New Attorney Network Inquiry — RigAccident.com'
      : 'New Truck Accident Lead — RigAccident.com';

  const answersHtml = answers 
    ? Object.entries(answers).map(([q, a]) => `<li><strong>${q}:</strong> ${a}</li>`).join('')
    : 'No conversation answers provided.';

  const metadataHtml = metadata
    ? Object.entries(metadata).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')
    : 'No additional metadata.';

  try {
    const response = await resend.emails.send({
      from: 'Rig Accident Leads <leads@rigaccident.com>',
      to: ['intake@rigaccident.com'], // In a real app, this should be configurable
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">${source === 'attorney' ? 'New Attorney Network Inquiry' : 'New Truck Accident Lead Captured'}</h2>
          
          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">User Contact Info</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #334155;">Conversation / Form Answers</h3>
            <ul style="padding-left: 20px; color: #475569;">
              ${answersHtml}
            </ul>
          </div>

          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #64748b;">
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <h4 style="margin-bottom: 5px;">Metadata:</h4>
            <ul style="margin-top: 0; padding-left: 20px;">
              ${metadataHtml}
            </ul>
          </div>

          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px;">
            This lead was captured via rigaccident.com
          </p>
        </div>
      `
    });

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error };
  }
};
