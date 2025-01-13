"use client";

import Header from "../components/Header";
import {Pagination} from "@nextui-org/react";

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">

      </main>
       <footer>
      <Pagination color="success" initialPage={1} total={10} />
      </footer>
    </div>
  );
}
