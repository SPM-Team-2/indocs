import Image from "next/image";
import Link from "next/link";

function Screen2() {
  return (
    <div className="h-screen pt-10">
      <div className="flex flex-col items-center">
        <div className="text-lg ml-5 self-start">A whole document Scanner</div>
        <div className="text-4xl ml-5 w-[8ch] text-left self-start font-extrabold">
          IN YOUR MOBILE BROWSER
        </div>
        {/* <Image src="/Photo.png" /> */}
        <div className="mx-auto">
          <Image width={250} height={300} src="/Phone.png" alt="phone" />
        </div>
        <Link href="./scanner">
          <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 max-w-xs rounded-lg z-10">
            Open Scanner
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Screen2;
