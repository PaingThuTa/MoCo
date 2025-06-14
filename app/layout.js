import "./globals.css";

export const metadata = {
  title: "MoCo Money Splitter",
  description: "Split money between friends easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        background: '#FFB6C1'
      }}>
        {children}
      </body>
    </html>
  );
}
