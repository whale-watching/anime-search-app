/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Content = styled.div`
  min-height: calc(100vh - 166px);
`;

interface SearchItemType {
  id: Number;
  title: {
    english: String;
  };
}

const Home = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [resultsList, setResultsList] = useState([]);

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
