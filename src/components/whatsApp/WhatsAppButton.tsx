// components/WhatsAppButton.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/9559993758" // <-- Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // <-- Image inside public/ folder
            alt="WhatsApp"
            width={35}
            height={35}
          />
        </div>
      </Link>
    </div>
  );
}
