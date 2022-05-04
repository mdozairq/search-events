import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";
import { GetServerSidePropsContext } from "next";
import useSWR from "swr";
import Head from "next/head";

interface dataType {
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  id: string;
  isFeatured: boolean;
}

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<dataType[] | null>();
  const router = useRouter();
  const filterData: string[] = router.query.slug;

  const { data, error } = useSWR(
    "https://dummy-de406-default-rtdb.firebaseio.com/dummyData.json"
  );

  console.log(data);
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  useEffect(() => {
    if (data) {
      const events: {
        title: string;
        image: string;
        date: string;
        location: string;
        description: string;
        id: string;
        isFeatured: boolean;
      }[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  const pageHeadData = (
    <Head>
      <title>Filtered Data</title>
      <meta
        name="description"
        content={`All Events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }

  const filteredEvents: {
    title: string;
    image: string;
    date: string;
    location: string;
    description: string;
    id: string;
    isFeatured: boolean;
  }[] = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2026 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid Filter, Please Adjust your values!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      {filteredEvents.length ? (
        <Fragment>
          {pageHeadData}
          <EventList items={filteredEvents} />
        </Fragment>
      ) : (
        <>
          {pageHeadData}
          <ErrorAlert>
            <p className="center">No Events on this Date</p>
          </ErrorAlert>
        </>
      )}
    </>
  );
};

// export const getServerSideProps: GetServerSidePropsContext<
//   ParsedUrlQuery,
//   PreviewData
// > = async (context: any) => {
//   // ...
//   const { params }: { params: { slug: string[] } } = context;
//   const slugArray: string[] = params.slug;

//   const filterYear: string = slugArray[0];
//   const filterMonth: string = slugArray[1];

//   const year = +filterYear;
//   const month = +filterMonth;

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2026 ||
//     year < 2020 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({ year: year, month: month });
//   return {
//     props: {
//       filteredEvents: filteredEvents,
//     },
//   };
// };

export default FilteredEventsPage;
