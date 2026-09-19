import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

async function getMessages() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB.prepare(
    "SELECT id, name, phone, message, created_at FROM contact_messages ORDER BY created_at DESC",
  ).all();

  return results.map((message) => ({
    ...message,
    createdAt: message.created_at,
  }));
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
