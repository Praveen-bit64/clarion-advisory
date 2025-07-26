'use client'
import Counter from "./components/Counter";
import Featured_Listings from "./components/Featured_Listings";
import HeroBanner from "./components/HeroBanner";
import RecentlyAdded from "./components/RecentlyAdded";
import Testimonials from "./components/Testimonials";
import { useHomeComponentDetails } from "./context/HomeComponentDetails";
import { useUserDetails } from "./context/UserDetails";

const page = () => {
  const { userDetails } = useUserDetails()
  const { heroBanner, featured_listings, counter, recentlyadded, testimonials } = useHomeComponentDetails()
  console.log(userDetails, heroBanner, 'hokmepagedatas');

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        {(userDetails.role === 'admin' || heroBanner.isvisible === 'true') && <HeroBanner />}
        {(userDetails.role === 'admin' || featured_listings.isvisible === 'true') && <Featured_Listings />}
        {(userDetails.role === 'admin' || counter.isvisible === 'true') && <Counter />}
        {(userDetails.role === 'admin' || recentlyadded.isvisible === 'true') && <RecentlyAdded />}
        {(userDetails.role === 'admin' || testimonials.isvisible === 'true') && <Testimonials />}



      </div>
    </>
  );
}

export default page;