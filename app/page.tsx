import {Hero} from "./components/hero";
import { QuickInfoBar } from "./components/quick-info-bar";
import { IntroSection } from "./components/intro-section";
import { Highlights } from "./components/highlights";
import { Reviews } from "./components/review";
import { Gallery } from "./components/gallery";
import { RoomHighlights } from "./components/roomHighlights";
import { HotelServices } from "./components/hotelservices";
import { HotelFacilities } from "./components/hotelfacilities";

export default function Home() {
  return (
    <>
      <Hero/>
      <QuickInfoBar/>
      <IntroSection/>
       <Highlights/>
      <RoomHighlights/>
      <Gallery/>
      <HotelFacilities/>
      <HotelServices/>
      <Reviews/>
    </>
  );
}
