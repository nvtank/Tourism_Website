import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MouseEffectProvider } from "@/components/providers/MouseEffectProvider";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TravelHub - Khám Phá Thế Giới",
    description: "Trải nghiệm những chuyến phiêu lưu tuyệt vời cùng TravelHub",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className={inter.className}>
                <ClientLayout>
                    <MouseEffectProvider>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </MouseEffectProvider>
                </ClientLayout>
            </body>
        </html>
    );
} 