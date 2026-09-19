import "./globals.css";

export const metadata = {
  title: "Mahsa Portfolio",
  description: "Mahsa's personal portfolio",
  icons: {
    icon: "/assets/avatar1.png",
    shortcut: "/assets/avatar1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}