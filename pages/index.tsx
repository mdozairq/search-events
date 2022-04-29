import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../data/dummy-data";
import EventList from "../components/events/event-list";

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();
  
  return (
    <div className={styles.container}>
      <h1>Recent Events</h1>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default Home;
