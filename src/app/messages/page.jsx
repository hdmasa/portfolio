import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "contact-messages.json");

async function getMessages() {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(dataFile);
    } catch {
      await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf-8");
    }

    const fileContents = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(fileContents || "[]");
  } catch {
    return [];
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <main className="min-h-screen p-6 text-white bg-[#0a0a0f]">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">پیام‌های کاربران</h1>

        {messages.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-neutral-300">
            هنوز هیچ پیامی ثبت نشده است.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{message.name}</p>
                    <p className="text-sm text-neutral-400">{message.phone}</p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {new Date(message.createdAt).toLocaleString("fa-IR")}
                  </p>
                </div>

                <p className="whitespace-pre-wrap leading-7 text-neutral-200">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
