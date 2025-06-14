"use client";
import FirstPage from "../components/FirstPage.jsx";

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#FFB6C1'
    }}>
      <FirstPage />
    </main>
  );
}
