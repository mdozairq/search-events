import { NextPage } from "next"
import { useRouter } from "next/router"
import { getEventById } from "../../data/dummy-data";
import {Fragment} from "react"
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";

const EventId: NextPage = () => {
  const router = useRouter();

  const eventId:any = router.query.eventId;
  const event = getEventById(eventId);

  if(!event){
    return <p>No Event Found</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventId