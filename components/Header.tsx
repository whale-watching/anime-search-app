import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { FormControl } from "react-bootstrap";
import useMediaQuery from "../utils/useMediaQuery";
import { request, gql, GraphQLClient } from "graphql-request";
import { useSearchAnimes } from "../utils/useAPIRequests";

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  border-bottom: solid 1px #dddddd;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Search = styled(FormControl)`
  min-height: 35px;
  min-width: 50px;
  background: #eeeeee;
  border-radius: 30px;
  border: 0px;
  padding-left: 38px;
`;

const TimeDisplay = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

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

const Header = (props: any) => {
  const matches = useMediaQuery("(min-width: 560px)");

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const dateFormat = new Intl.DateTimeFormat(useRouter().locale, dateOptions);
  const fecha = dateFormat.format(new Date());
  const fechaMonth = fecha.split(" ")[0];
  const fechaDay = fecha.split(" ")[1];

  const { searchBar, setSearchBar, resultsList, setResultsList } = props;

  const { status, data } = useQuery(["searchAnimes", searchBar], () =>
    searchAnimes(searchBar)
  );
  useEffect(() => {
    if (data) {
      const cleanResults = data.Page.media.filter(
        (item: SearchItemType) => item.title.english
      );
      setResultsList(cleanResults);
    }
  }, [data, setResultsList]);

  console.log("resultList", resultsList);

  return (
    <Navbar>
      <Logo>Anime</Logo>
      <Search
        placeholder="Search"
        value={searchBar}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchBar(e.target.value);
        }}
      />
      <TimeDisplay>
        {matches
          ? `Today is ${fechaDay}th of ${fechaMonth}.`
          : `${fechaMonth} ${fechaDay}th`}
      </TimeDisplay>
    </Navbar>
  );
};

export default Header;
