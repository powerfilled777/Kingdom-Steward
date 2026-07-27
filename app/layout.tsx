import "./globals.css";

export const metadata = {
  title: "Kingdom Steward",
  description: "Faithful with today. Prepared for tomorrow."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
