import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.EMAIL_RESEND_API_KEY);

export const emailBodySchema = z.object({
  replyEmail: z.string().email(),
  name: z.string(),
  message: z.string(),
});

export type EmailBody = z.infer<typeof emailBodySchema>;

export default async function (req: VercelRequest, res: VercelResponse) {
  const { body } = req;

  const parsedBody = emailBodySchema.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json(parsedBody.error);
  }

  const contactEmail = process.env.EMAIL_CONTACT;

  if (!contactEmail) {
    return res.status(500).json({ error: "Email configuration error" });
  }

  try {
    const { name, message, replyEmail } = parsedBody.data;

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `New message from ${name}`,
      html: `
        <html>
          <head>
            <style>
              body {
                padding: 20px;
              }
              p {
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <p>From: ${replyEmail}</p>
            <p>${message}</p>
          </body>
        </html>
      `,
    });

    res.status(201);
  } catch (error) {
    res.status(400).json(error);
  }
}
