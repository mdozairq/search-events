import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";
import { GetServerSidePropsContext } from "next";

const FilteredEventsPage = (props: {
  filteredEvents: [];
  hasError: boolean;
}) => {
  const router = useRouter();

  if (props.hasError) {
    return (
      <ErrorAlert>
        <p className="center">Invalid Filter, Please Adjust your values!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      {props.filteredEvents.length ? (
        <Fragment>
          <EventList items={props.filteredEvents} />
        </Fragment>
      ) : (
        <ErrorAlert>
          <p className="center">No Events on this Date</p>
        </ErrorAlert>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
> = async (context: any) => {
  // ...
  const { params }: { params: { slug: string[] } } = context;
  const slugArray: string[] = params.slug;

  const filterYear: string = slugArray[0];
  const filterMonth: string = slugArray[1];

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
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({ year: year, month: month });
  return {
    props: {
      filteredEvents: filteredEvents,
    },
  };
};

export default FilteredEventsPage;
