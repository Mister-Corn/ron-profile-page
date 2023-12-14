import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailBodySchema = z.object({
  from: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type EmailBody = z.infer<typeof emailBodySchema>;

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    const { subject, message, from } = parsedBody.data;

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [contactEmail],
      subject,
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
            <p>From: ${from}</p>
            <p>${message}</p>
          </body>
        </html>
      `,
    });

    res.status(201);
  } catch (error) {
    res.status(400).json(error);
  }
};
