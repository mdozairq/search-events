import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-details/event-summary";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../data/dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();
  const slugArray = router.query.slug;

  if (!slugArray) {
    return <ErrorAlert><p className="center">Loading...</p></ErrorAlert>;
  }

  const filterYear = slugArray[0];
  const filterMonth = slugArray[1];

  const year = +filterYear;
  const month = +filterMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2026 ||
    year < 2020 ||
    month < 1 ||
    month > 12
  ) {
    return <ErrorAlert><p>Invalid Filter. Please Adjust your values!</p></ErrorAlert>;
  }

  const filteredEvents = getFilteredEvents({ year: year, month: month });
  
  return<>
  {
    filteredEvents.length ? 
      <Fragment>
        <EventList items={filteredEvents} />
      </Fragment>
      : <ErrorAlert><p className="center">No Events on this Date</p></ErrorAlert>
  }
  </>
};

export default FilteredEventsPage;
