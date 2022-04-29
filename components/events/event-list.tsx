import EventItem from "./event-item";
import classes from './event-list.module.css';

const EventList = ({
  items,
}: {
  items: {
    title: string;
    image: string;
    date: string;
    location: string;
    id: string;
    isFeatured: boolean;
  }[];
}) => {
  return (
    <div>
      <ul className={classes.list}>
        {items.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            isFeatured={event.isFeatured}
            image={event.image}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
