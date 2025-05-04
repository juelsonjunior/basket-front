"use client";

import { PlayersTable } from "@/components/playersTable";

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <PlayersTable />
      </div>
    </main>
  );
} 