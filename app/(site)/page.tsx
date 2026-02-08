import {Hero} from "../../components/frontend/homepage/hero";
import { QuickInfoBar } from "../../components/frontend/homepage/quick-info-bar";
import { IntroSection } from "../../components/frontend/homepage/intro-section";
import { Highlights } from "../../components/frontend/homepage/highlights";
import { Reviews } from "../../components/frontend/homepage/review";
import { Gallery } from "../../components/frontend/gallery/gallery";
import { RoomHighlights } from "../../components/frontend/rooms/roomHighlights";
import { HotelServices } from "../../components/frontend/facilities/hotelservices";
import { HotelFacilities } from "../../components/frontend/facilities/hotelfacilities";
import { Header } from "../../components/ui/header";

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
