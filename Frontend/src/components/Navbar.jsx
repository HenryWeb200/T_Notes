import React from 'react';
import { Link } from 'react-router-dom'; // ✅ fixed import
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-[#001F3F] border-b border-[#009DFF33] sticky top-0 z-20 shadow-md">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl tracking-tight font-mono text-[#00A6FF] font-bold">
            T_Notes
          </h1>
          <div className="flex items-center justify-between">
            <Link
              to="/create"
              className="btn bg-[#009DFF] text-white border-none hover:bg-[#007ACC]"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
