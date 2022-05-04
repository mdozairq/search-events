import { GetStaticPaths, NextPage } from "next";
import { getEventById, getAllEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";
import { GetStaticProps } from "next";

const EventId: NextPage<{}, {}> = (props: {
  selectedEvents: {
    title: string;
    image: string;
    date: string;
    location: string;
    description: string;
    id: string;
    isFeatured: boolean;
  };
}) => {
  const event = props.selectedEvents;

  if (!event) {
    return <div className="center"> 
      <p>Loading...</p>
    </div>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvents: event,
    },
  };
  // ...
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const AllEvents = await getAllEvents();
  const paths = AllEvents.map((event: any) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: true,
  };
};

export default EventId;
