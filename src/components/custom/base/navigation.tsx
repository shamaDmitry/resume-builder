import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="py-2 px-4 border-b border-primary text-primary">
      <nav className="flex justify-end items-center container mx-auto">
        <Link
          href="/deploy"
          className="font-medium text-sm px-4 py-1.5 hover:bg-primary hover:text-white rounded transition"
        >
          Deploy
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
