// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

// Simple font loading
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'BaziStudio',
  description: 'Modern web development studio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans bg-background text-foreground">
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Main content with proper spacing */}
        <main className="min-h-screen pt-16 px-4 md:px-6">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}