import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardItem from "../components/CardItem";
import { fetchAnimeData } from "../store/actions/main";
import { Box, Button, TextField, Icon, ListItem } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Content = styled.div`
  min-height: calc(100vh - 200px);
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
`;

interface SearchItemType {
  mal_id: Number;
  title: String;
  image_url: String;
}

const Home = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resultsList, setResultsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchAnimeData(pageNumber));
  }, [pageNumber, dispatch]);

  const pageData = useSelector((state: any) => state.main.currentPageData);

  console.log("pageData", pageData);
  
  useEffect(() => {
    if (pageData.length !== 0) {
      setResultsList(pageData.data.map((value:any) => {
        return {
          mal_id: value.mal_id,
          title: value.title,
          image_url: value.images.webp.image_url
        }
      }))
    }
  }, [pageData])

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
              <Link key={String(item.mal_id)} href={`/animes/${item.mal_id}`}>
                <CardItem title={item.title} image_url={item.image_url} />
              </Link>
            ))
          ) : (
            <li>No results here!</li>
          )}
        </Content>
        <Pagenation>
          <Button disabled={pageNumber === 1} onClick={handlePagePrevious}>
            <ArrowBackIosIcon />
          </Button>
          <TextField
            type="number"
            inputProps={{ min: 0, max: pageData?.pagination?.last_visible_page }}
            value={pageNumber}
          />
          <Button
            disabled={!pageData?.pagination?.has_next_page}
            onClick={handlePageNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Pagenation>
        <Footer />
      </div>
    </>
  );
};

export default Home;
