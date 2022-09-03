/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchAnimes } from "../utils/useAPIRequests";
import { useQuery } from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";
import Head from "next/head";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Content = styled.div`
  min-height: calc(100vh - 166px);
`;

/* Search functions below */
const searchQuery = gql`
  query ($search: String) {
    Page {
      media(search: $search) {
        id
        title {
          english
        }
      }
    }
  }
`;

const searchAnimes = async (searchTerm: String) => {
  const ANILIST_QUERY_URL = "https://graphql.anilist.co";

  const client = new GraphQLClient(ANILIST_QUERY_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const searchResults = await client.request(searchQuery, {
    search: searchTerm,
  });
  return searchResults;
};

interface SearchItemType {
  id: Number;
  title: {
    english: String;
  };
}

/* Component starts here */

const Home = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [resultsList, setResultsList] = useState([]);

  const { status, data } = useQuery(["searchAnimes", searchBar], () =>
    searchAnimes(searchBar)
  );
  // useEffect(() => {
  //   setResultsList(data)
  // }, [])
  useEffect(() => {
    if (data) {
      const cleanResults = data.Page.media.filter(
        (item: SearchItemType) => item.title.english
      );
      //  console.log(cleanResults);
      setResultsList(cleanResults);
      //  console.log(data.Page.media)
      // setResultsList(data.Page.media)
    }
  }, [data]);

  if (data) {
    console.log(resultsList, searchBar);
  }

  return (
    <>
      <Head>
        <title>Anime Search App</title>
      </Head>
      <div>
        <div className="">
          <Header
            searchBar={searchBar}
            setSearchBar={setSearchBar}
            resultsList={resultsList}
            setResultsList={setResultsList}
          />
          <Content>
            <div className="">
              <form action="/" method="get">
                <div className="">
                  <ul>
                    {resultsList.length !== 0 ? (
                      resultsList.map((item: SearchItemType) => (
                        <Link key={String(item.id)} href={`/animes/${item.id}`}>
                          <li>{item.title.english}</li>
                        </Link>
                      ))
                    ) : (
                      <li>No results here!</li>
                    )}
                  </ul>
                </div>
              </form>
            </div>
            <div className="">
              <Link href="/animes">
                <button>All animes</button>
              </Link>
              <Link href="/about">
                <button>About</button>
              </Link>
            </div>
          </Content>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
