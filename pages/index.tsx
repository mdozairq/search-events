import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import { GetStaticProps } from "next";

const Home: NextPage = (props: {
  events: {
    title: string;
    image: string;
    date: string;
    location: string;
    id: string;
    isFeatured: boolean;
  }[];
}) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div className={styles.container}>
      <Head>
        <title>Featured Events</title>
        <meta name='description' 
        content='Find lot of Great Events that allow you to evolve...' />
      </Head>
      <h1>Featured Events</h1>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // ...
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
};
export default Home;
