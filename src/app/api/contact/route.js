import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const { results } = await env.DB.prepare(
      "SELECT id, name, phone, message, created_at FROM contact_messages ORDER BY created_at DESC",
    ).all();

    const messages = results.map((message) => ({
      ...message,
      createdAt: message.created_at,
    }));

    return Response.json({ messages });
  } catch (error) {
    return Response.json(
      {
        error: "در خواندن پیام‌های ذخیره‌شده مشکلی پیش آمد.",
      },
      { status: 500 },
    );
  }
}

async function sendSmsToUser({ name, phone, message }, env) {
  const kavenegarApiKey = env.KAVENEGAR_API_KEY || process.env.KAVENEGAR_API_KEY;
  const kavenegarSender = env.KAVENEGAR_SENDER || process.env.KAVENEGAR_SENDER;

  if (!kavenegarApiKey || !kavenegarSender) {
    return;
  }

  const smsText = `سلام ${name}، پیام شما با موفقیت ثبت شد. در اولین فرصت با شما تماس می‌گیرم.\n\nپیام شما:\n${message}`;

  try {
    const response = await fetch(
      `https://api.kavenegar.com/v1/${kavenegarApiKey}/sms/send.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          receptor: phone,
          sender: kavenegarSender,
          message: smsText,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok || result.return?.status !== 200) {
      console.error("Kavenegar SMS error:", result);
    }
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone || !message) {
      return Response.json(
        {
          error: "نام، شماره تماس و پیام اجباری هستند.",
        },
        { status: 400 },
      );
    }

    const newMessage = {
      id: crypto.randomUUID(),
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };

    const { env } = await getCloudflareContext({ async: true });
    await env.DB.prepare(
      "INSERT INTO contact_messages (id, name, phone, message, created_at) VALUES (?, ?, ?, ?, ?)",
    )
      .bind(
        newMessage.id,
        newMessage.name,
        newMessage.phone,
        newMessage.message,
        newMessage.createdAt,
      )
      .run();

    await sendSmsToUser(newMessage, env);

    return Response.json(
      {
        message: "پیام شما با موفقیت ثبت شد و در اولین فرصت با شما تماس می‌گیرم.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        error: "در ثبت پیام شما مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
