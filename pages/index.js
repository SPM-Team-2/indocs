import Background from "../components/background";
import Screen1 from "../components/landing-page/Screen1";
import Screen2 from "../components/landing-page/Screen2";
import Screen3 from "../components/landing-page/Screen3";

const LandingPage = () => {
  return (
    <div className="text-slightWhite font-nunito">
      <Background />
      <Screen1 />
      <Screen2 />
      <Screen3 />
    </div>
  );
};
export default LandingPage;
