import Background from "../components/background";
import Screen1 from "../components/landing-page/Screen1";
import Screen2 from "../components/landing-page/Screen2";
import Screen3 from "../components/landing-page/screen3";

const LandingPage = () => {
  return (
    <div className="text-slightWhite">
      <Background />
      <Screen1 />
      <Screen2 />
      <Screen3 />
    </div>
  );
};
export default LandingPage;
