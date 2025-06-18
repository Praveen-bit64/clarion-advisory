import Counter from "./components/Counter";
import ExploreCities from "./components/ExploreCities";
import Featured_Listings from "./components/Featured_Listings";
import HeroBanner from "./components/HeroBanner";
import RecentlyAdded from "./components/RecentlyAdded";
import SimpleSlider from "./components/SimpleSlider";
import SliderCenterMode from "./components/SliderCenterMode";
import Testimonials from "./components/Testimonials";

const page = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center">
        <HeroBanner />
        <Featured_Listings />
        {/* <ExploreCities /> */}
        <Counter />
        <RecentlyAdded />
        <Testimonials />
        {/* <SimpleSlider /> */}
        {/* <SliderCenterMode /> */}
        {/* <SliderCenterMode /> */}
      </div>
    </>
  );
}

export default page;