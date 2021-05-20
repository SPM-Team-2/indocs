import React from "react";
import Block from "../block";
import Link from 'next/link'

function Screen3() {
  return (
    <div className="h-screen pt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-5">Why use Indocs?</h1>
        <Block
          background="bg-red-600"
          bigText="Fast"
          line2="Runs on Nextjs"
          line3="The fastest frontend framework"
        />
        <Block
          background="bg-blue-600"
          bigText="Light"
          line2="Progressive Web App (PWA)"
          line3="Light on resources"
        />
        <Link href="./scanner">
          <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 max-w-xs rounded-lg z-10">
            Open Scanner
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Screen3;
