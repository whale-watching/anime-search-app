import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "../utils/useMediaQuery";
import { useSearchAnimes } from "../utils/useAPIRequests";
import {
  TextField,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props: any) => (
  <TextField
    sx={{
      maxHeight: "35px",
      minWidth: "30px",
      width: "400px",
      background: "#eeeeee",
      borderRadius: "30px",
      "& input": {
        padding: 0,
        height: "35px",
      },
    }}
    {...props}
  >
    {props.children}
  </TextField>
);

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
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
    month: "long",
  };

  const dateFormat = new Intl.DateTimeFormat(useRouter().locale, dateOptions);
  const fecha = dateFormat.format(new Date());
  const fechaMonth = fecha.split(" ")[0];
  const fechaDay = fecha.split(" ")[1];

  const { searchBar, setSearchBar, resultsList, setResultsList } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "58px",
        borderBottom: "solid 1px #dddddd",
      }}
    >
      <Typography variant="h4">Anime</Typography>
      <Search
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Search
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchBar}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setSearchBar(e.target.value);
              }}
            />
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
          </Box>
        </Fade>
      </Modal>
      
      <Typography variant="body1">
        {matches
          ? `Today is the ${fechaDay}th of ${fechaMonth}.`
          : `${fechaMonth} ${fechaDay}th`}
      </Typography>
    </Box>
  );
};

export default Header;
