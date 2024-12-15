import EventCalendarContainer from "@/components/EventCalendarContainer";

const Events = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return <EventCalendarContainer searchParams={searchParams} />;
};

export default Events;
