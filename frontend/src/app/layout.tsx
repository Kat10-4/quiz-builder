import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import appIcon from '@/assets/icon.png';
import '@/styles/globals.css';

const dmSans = localFont({
  src: [
    {
      path: '../assets/fonts/DMSans-Variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/DMSans-Italic-Variable.woff2',
      weight: '400 700',
      style: 'italic',
    },
  ],
  display: 'swap',
});

const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and manage quizzes',
  icons: {
    icon: [{ url: appIcon.src, type: 'image/png' }],
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

export { metadata };
export default RootLayout;