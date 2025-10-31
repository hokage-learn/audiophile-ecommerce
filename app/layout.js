import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import ConvexClientProvider from "./components/ConvexProvider";
import ToastProvider from "./components/ToastProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Audiophile - Premium Audio Equipment",
  description: "Experience premium audio equipment at Audiophile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <ConvexClientProvider>
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
