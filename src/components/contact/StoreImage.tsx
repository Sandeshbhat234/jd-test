"use client";

import Image from "next/image";
import { useSelectedStore } from "@/lib/useSelectedStore";

export default function StoreImage({ className }: { className?: string }) {
  const { store } = useSelectedStore();
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <Image
        src={store.image}
        alt={store.name}
        fill
        sizes="(min-width: 1024px) 50vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}
