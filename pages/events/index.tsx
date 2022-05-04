import { Fragment } from "react";
import { GetStaticProps } from "next";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-utils";
import { useRouter } from "next/router";

const Events = (props: { allEvents: object[] }) => {
  const router = useRouter();
  const findEventsHandler = (year: number, month: number) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={props.allEvents} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // ...
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents: allEvents,
    },
  };
};
export default Events;
