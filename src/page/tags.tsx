import { Button, List, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { createTag } from "../event/create";
import { getAllTagPartial } from "../event/get";
import { Tag } from "../type/user";

export const TagsPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState([] as Omit<Tag, "timeCount">[]);

  const changeTextField = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const clickButton = (e: React.MouseEvent): void => {
    e.preventDefault();
    createTag(inputValue).then(() => {
      setInputValue("");
      const tmpTagArray = getAllTagPartial();
      setTagList(tmpTagArray);
    });
  };

  useEffect(() => {
    const tmpTagArray = getAllTagPartial();
    setTagList(tmpTagArray);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <TextField
          id="outlined-basic"
          label="タグ"
          variant="outlined"
          value={inputValue}
          onChange={changeTextField}
        />
        <Button variant="contained" onClick={clickButton}>
          作成
        </Button>
      </Box>
      <Box>
        <List>
          {tagList.map((tag, key) => (
            <Typography key={key}>{tag.title}</Typography>
          ))}
        </List>
      </Box>
    </Container>
  );
};
