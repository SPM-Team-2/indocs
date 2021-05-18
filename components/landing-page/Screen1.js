import Link from "next/link";
import Logo from "../../assets/logo";

const Screen1 = () => {
  return (
    <div className="grid h-screen w-full">
      <div className="flex items-center justify-center flex-col">
        <div className="text-5xl text-center mb-7 z-10">InDocs</div>
        <div className="w-1/4 md:w-20 z-10">
          <Logo />
        </div>
        <div className="text-2xl text-center my-5 font-extralight opacity-70 z-10">
          Your Docs <br /> No App{" "}
        </div>
        <Link href="./scanner">
          <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 max-w-xs rounded-lg z-10">
            Open Scanner
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Screen1;
