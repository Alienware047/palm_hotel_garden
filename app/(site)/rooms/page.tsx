import { RoomsHero } from "@/components/frontend/rooms/roomhero";
import RoomsList from "@/components/frontend/rooms/RoomList";
import FacilitiesList from "@/components/frontend/facilities/FacilitiesList";

export default function RoomsPage() {
  return (
    <main className="pb-20">
      <RoomsHero />

      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-20">
        <HeaderBlock />

        <Section title="Rooms">
          <RoomsList />
        </Section>

        <Section title="Facilities">
          <FacilitiesList />
        </Section>
      </section>
    </main>
  );
}

function HeaderBlock() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">
        Our Rooms & Suites
      </h2>

      <p className="text-foreground/70 text-lg">
        Experience refined comfort at{" "}
        <span className="text-primary font-medium">
          Palm Garden Hotel
        </span>
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-8 text-center">
        {title}
      </h3>
      {children}
    </div>
  );
}
