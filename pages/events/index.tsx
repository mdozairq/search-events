import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../data/dummy-data";
import { useRouter } from "next/router";

const Events = () => {
  const allEvents = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year: number, month: number) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export default Events;
