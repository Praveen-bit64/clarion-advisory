'use client'

import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import Featured_Listings from "./components/Featured_Listings";
import HeroBanner from "./components/HeroBanner";
import Loader from "./components/Loader";
import RecentlyAdded from "./components/RecentlyAdded";
import Testimonials from "./components/Testimonials";
import { useHomeComponentDetails } from "./context/HomeComponentDetails";
import { useUserDetails } from "./context/UserDetails";

export default function Page() {
  const { userDetails } = useUserDetails();
  const { heroBanner, featured_listings, counter, recentlyadded, testimonials } = useHomeComponentDetails();

  const [pageLoader, setPageLoader] = useState(true);

  const isAdmin = userDetails?.role === 'admin';
  const isVisible = (val?: string) => val === 'true';

  useEffect(() => {
    // Check if all required data is available
    if (
      userDetails &&
      heroBanner &&
      featured_listings &&
      counter &&
      recentlyadded &&
      testimonials
    ) {
      setPageLoader(false);
    }
  }, [userDetails, heroBanner, featured_listings, counter, recentlyadded, testimonials]);

  if (pageLoader) {
    return <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader type="dots" height={80} width={80} />
      </div>
    </>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {(isAdmin || isVisible(heroBanner?.isvisible)) && <HeroBanner />}
      {(isAdmin || isVisible(featured_listings?.isvisible)) && <Featured_Listings />}
      {(isAdmin || isVisible(counter?.isVisible)) && <Counter />}
      {(isAdmin || isVisible(recentlyadded?.isvisible)) && <RecentlyAdded />}
      {(isAdmin || isVisible(testimonials?.isvisible)) && <Testimonials />}
    </div>
  );
}
