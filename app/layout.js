import "./globals.css";

export const metadata = {
  title: "MoCo Money Splitter",
  description: "Split money between friends easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
