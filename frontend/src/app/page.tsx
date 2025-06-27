import Counter from "./components/Counter";
import Featured_Listings from "./components/Featured_Listings";
import HeroBanner from "./components/HeroBanner";
import RecentlyAdded from "./components/RecentlyAdded";
import Testimonials from "./components/Testimonials";

const page = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        <HeroBanner />
        <Featured_Listings />
        <Counter />
        <RecentlyAdded />
        <Testimonials />
      </div>
    </>
  );
}

export default page;