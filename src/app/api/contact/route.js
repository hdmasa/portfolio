import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "contact-messages.json");

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf-8");
  }
}

async function loadMessages() {
  await ensureDataFile();

  try {
    const fileContents = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(fileContents || "[]");

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
}

export async function GET() {
  try {
    const messages = await loadMessages();

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

async function sendSmsToUser({ name, phone, message }) {
  const kavenegarApiKey = process.env.KAVENEGAR_API_KEY;
  const kavenegarSender = process.env.KAVENEGAR_SENDER;

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
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return Response.json(
        {
          error: "نام، شماره تماس و پیام اجباری هستند.",
        },
        { status: 400 },
      );
    }

    const messages = await loadMessages();

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    messages.unshift(newMessage);

    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2), "utf-8");

    await sendSmsToUser(newMessage);

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
