import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { phone, message, interest } = await request.json()

    // Walidacja danych
    if (!phone) {
      return NextResponse.json(
        { error: 'Numer telefonu jest wymagany' },
        { status: 400 }
      )
    }

    // Konfiguracja SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true dla portu 465, false dla innych portów
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Mapowanie rodzaju zapytania
    const interestLabels = {
      general: 'Informacje ogólne',
      apartment: 'Pytanie o mieszkanie',
      presentation: 'Prezentacja osiedla',
      financing: 'Finansowanie'
    }

    const interestLabel = interestLabels[interest as keyof typeof interestLabels] || 'Informacje ogólne'

    // Treść emaila
    const emailContent = `
DOSTAŁEŚ KONTAKT W SPRAWIE MIESZKAŃ OSIEDLE SKOWRONKÓW

Dane kontaktowe:
- Numer telefonu: ${phone}
- Rodzaj zapytania: ${interestLabel}
- Wiadomość: ${message || 'Brak wiadomości'}

---
Wiadomość wysłana z formularza kontaktowego na stronie skowronkow.com
Data: ${new Date().toLocaleString('pl-PL')}
    `.trim()

    // Wysyłka emaila
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // skowronkow@grupaborys.com
      to: process.env.EMAIL_USER,   // skowronkow@grupaborys.com
      subject: `KONTAKT W SPRAWIE MIESZKAŃ SKOWRONKÓW - ${interestLabel}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">
            DOSTALIŚMY KONTAKT W SPRAWIE MIESZKAŃ OSIEDLE SKOWRONKÓW
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Dane kontaktowe:</h3>
            <p><strong>Numer telefonu:</strong> ${phone}</p>
            <p><strong>Rodzaj zapytania:</strong> ${interestLabel}</p>
            <p><strong>Wiadomość:</strong> ${message || 'Brak wiadomości'}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">Wiadomość wysłana z formularza kontaktowego na stronie skowronkow.com</p>
            <p style="margin: 5px 0 0 0;">Data: ${new Date().toLocaleString('pl-PL')}</p>
          </div>
        </div>
      `
    })

    console.log('Email wysłany:', info.messageId)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Wiadomość została wysłana pomyślnie',
        messageId: info.messageId
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Błąd wysyłania emaila:', error)
    
    return NextResponse.json(
      { 
        error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
