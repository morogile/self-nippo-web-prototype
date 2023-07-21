import {
  Button,
  Divider,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DrawerComponent } from "../component / drawer";
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
    <>
      <DrawerComponent />
      <Container maxWidth="sm" sx={{ my: 10 }}>
        <Stack sx={{ my: 4 }} spacing={2} direction={"row"}>
          <TextField
            id="outlined-basic"
            label="タグ"
            variant="outlined"
            value={inputValue}
            onChange={changeTextField}
          />
          <Button variant="contained" onClick={clickButton} size={"large"}>
            作成
          </Button>
        </Stack>
        <Divider />
        <Box sx={{ my: 3 }}>
          <List>
            {tagList.map((tag, key) => (
              <Typography key={key}>{tag.title}</Typography>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
};
