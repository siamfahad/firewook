import { Inter } from "next/font/google";
import Navbar from './components/Navbar';
import { CartProvider } from './CartContext';
import './globals.css';
import ContactButton from './components/ContactButton'; // Import the new component

const inter = Inter({ subsets: ["latin"] });

// This metadata object is where you set the title and icon for the browser tab
export const metadata = {
  title: "Firewook",
  description: "Experience the electrifying flavors of modern Chinese cuisine in the heart of Toronto.",
  icons: {
    icon: 'firewooklogo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <ContactButton />
        </CartProvider>
      </body>
    </html>
  );
}
