import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.EMAIL_RESEND_API_KEY);

export const emailBodySchema = z.object({
  replyEmail: z.string().email(),
  name: z.string(),
  message: z.string(),
});

export type EmailBody = z.infer<typeof emailBodySchema>;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const parsedBody = emailBodySchema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify(parsedBody.error), { status: 400 });
    }

    const contactEmail = process.env.EMAIL_CONTACT;

    if (!contactEmail) {
      return new Response(
        JSON.stringify({ error: "Email configuration error" }),
        { status: 500 },
      );
    }

    const { name, message, replyEmail } = parsedBody.data;

    await resend.emails.send({
      from: "Ron's Web Page <onboarding@resend.dev>",
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

    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
};
