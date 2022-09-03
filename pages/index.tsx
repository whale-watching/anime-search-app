import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchAnimeData } from "../store/actions/main";
import { Box, Button, TextField, Icon } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resultsList, setResultsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchAnimeData(pageNumber));
  }, [pageNumber]);

  const pageData = useSelector((state: any) => state.main.currentPageData);

  const handlePagePrevious = () => {
    setPageNumber(pageNumber - 1);
  };
  const handlePageNext = () => {
    setPageNumber(pageNumber + 1);
  };
  return (
    <>
      <Head>
        <title>Anime Search App</title>
      </Head>
      <div>
        <Header
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          resultsList={resultsList}
          setResultsList={setResultsList}
        />
        <Content>
          {resultsList.length !== 0 ? (
            resultsList.map((item: SearchItemType) => (
              <Link key={String(item.id)} href={`/animes/${item.id}`}>
                <li>{item.title.english}</li>
              </Link>
            ))
          ) : (
            <li>No results here!</li>
          )}
        </Content>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button disabled={pageNumber === 1} onClick={handlePagePrevious}>
            <ArrowBackIosIcon />
          </Button>
          <TextField value={pageNumber} />
          <Button
            disabled={!pageData?.pagination.has_next_page}
            onClick={handlePageNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
        <Footer />
      </div>
    </>
  );
};

export default Home;
