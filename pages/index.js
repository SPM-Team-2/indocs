import Link from "next/link";
import Logo from "../assets/logo";
import Background from "../components/background";
import Image from "next/image";
import Block from "../components/block";

const LandingPage = () => {
  return (
    <div className="text-slightWhite">
      {/* <Background /> */}

      {/* SCREEN 1 */}
      <div className="grid h-screen w-full">
        <div className="flex items-center justify-center flex-col">
          <div className="text-5xl text-center mb-7">InDocs</div>
          <Logo width={50} />
          <div className="text-2xl text-center my-5 font-extralight opacity-70">
            Your Docs <br /> No App{" "}
          </div>
          <Link href="./scanner">
            <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 rounded-lg">
              Open Scanner
            </button>
          </Link>
        </div>
      </div>

      {/* SCREEN 2 */}
      <div className="h-screen pt-10">
        <div className="flex flex-col items-center">
          <div className="text-lg ml-5 self-start">
            A whole document Scanner
          </div>
          <div className="text-4xl ml-5 w-[8ch] text-left self-start font-extrabold">
            IN YOUR MOBILE BROWSER
          </div>
          {/* <Image src="/Photo.png" /> */}
          <div className="mx-auto">
            <Image width={250} height={300} src="/Phone.png" alt="phone" />
          </div>
          <Link href="./scanner">
            <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 rounded-lg">
              Open Scanner
            </button>
          </Link>
        </div>
      </div>

      {/* SCREEN 3 */}
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
          <button className="p-3 bg-blue-600 border-2 border-slightWhite mt-5 w-1/2 rounded-lg">
            Open Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
