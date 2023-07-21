import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { TimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getTagSingle } from "../localStorage/getLocalStorage";
import { Activity } from "../type/user";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { createActivity, createNippo } from "../event/create";
import { getAllTagPartial } from "../event/get";
import { DrawerComponent } from "../component / drawer";
import { useNavigate } from "react-router-dom";

const INITIAL_ACTIVITIES_COUNT = 0;

export const NipposPage = () => {
  const [activitiesCount, setActivitiesCount] = useState(
    INITIAL_ACTIVITIES_COUNT
  );
  const navigate = useNavigate();
  const [activities, setActivities] = useState([] as Activity[]);
  const [date, setDate] = useState<Dayjs | null>(null);

  const tagAll = getAllTagPartial();

  useEffect(() => {
    setDate(dayjs());
    setActivities([
      {
        id: INITIAL_ACTIVITIES_COUNT,
        title: "",
        tag: getTagSingle(0),
        startTime: null as unknown as Dayjs,
        endTime: null as unknown as Dayjs,
      },
    ]);
  }, []);

  const changeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    e.preventDefault();
    setActivities((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        title: e.target.value,
      };
      return updatedItems;
    });
  };

  const changeTag = (e: SelectChangeEvent<number>, index: number) => {
    e.preventDefault();
    setActivities((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        tag: getTagSingle(Number(e.target.value)),
      };
      return updatedItems;
    });
  };

  const clickAddPartButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivitiesCount(activitiesCount + 1);

    setActivities((prevItems) => {
      return [
        ...prevItems,
        {
          id: activitiesCount + 1,
          title: "",
          tag: getTagSingle(0),
          startTime:
            activities.length > 0
              ? activities[activities.length - 1].endTime
              : (null as unknown as Dayjs),
          endTime: null as unknown as Dayjs,
        },
      ];
    });
  };

  const changeStartTime = (newValue: dayjs.Dayjs | null, index: number) => {
    setActivities((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        startTime: dayjs(newValue),
      };
      return updatedItems;
    });
  };

  const changeEndTime = (newValue: dayjs.Dayjs | null, index: number) => {
    setActivities((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        endTime: dayjs(newValue),
      };
      return updatedItems;
    });
  };

  const makeActivitiesArray = async (): Promise<Activity[]> => {
    const newActivitiesArray = [] as Activity[];
    activities.forEach((activity) => {
      createActivity(activity, date).then((activity) => {
        newActivitiesArray.push(activity);
      });
    });
    return newActivitiesArray;
  };

  const clickSubmitButton = (e: React.MouseEvent) => {
    e.preventDefault();
    makeActivitiesArray()
      .then((array) => createNippo(date, array))
      .then(() => navigate("/"));
  };

  const clickDeleteIcon = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setActivities((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  return (
    <>
      <DrawerComponent />
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Stack direction={"column"} spacing={8} alignItems={"center"}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="h1" sx={{ fontSize: 32 }}>
              日報作成
            </Typography>
            <Box>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>
          </Stack>
          <Card>
            <CardContent>
              <Stack spacing={2} alignItems={"center"}>
                {activities.map((activity, key) => (
                  <Card variant="outlined" key={key}>
                    <CardContent>
                      <EventRow>
                        <EventTagContainer>
                          <TextField
                            id="outlined-basic"
                            label="イベント"
                            variant="outlined"
                            value={activity.title}
                            onChange={(event) => changeTitle(event, key)}
                          />
                          <Select
                            label="タグ"
                            value={activity.tag.id}
                            onChange={(event) => changeTag(event, key)}
                            sx={{ width: 180 }}
                          >
                            {tagAll.map((tag, key) => (
                              <MenuItem value={tag.id} key={key}>
                                {tag.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </EventTagContainer>
                        <TimesContainer>
                          <TimeContainer>
                            <TimePicker
                              label="開始時刻"
                              value={activity.startTime}
                              onChange={(newValue) =>
                                changeStartTime(newValue, key)
                              }
                            />
                          </TimeContainer>
                          <Typography>〜</Typography>
                          <TimeContainer>
                            <TimePicker
                              label="終了時刻"
                              value={activity.endTime}
                              onChange={(newValue) =>
                                changeEndTime(newValue, key)
                              }
                            />
                          </TimeContainer>
                        </TimesContainer>
                        <IconButton
                          aria-label="delete"
                          style={{ color: "gray" }}
                          onClick={(e) => clickDeleteIcon(e, key)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </EventRow>
                    </CardContent>
                  </Card>
                ))}
                <Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={clickAddPartButton}
                  >
                    イベントの追加
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Container maxWidth="xs">
            <Button
              variant="contained"
              onClick={clickSubmitButton}
              size="large"
              sx={{ width: "100%" }}
            >
              日報の提出
            </Button>
          </Container>
        </Stack>
        <List></List>
      </Container>
    </>
  );
};

const EventRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const EventTagContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TimesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TimeContainer = styled.div`
  max-width: 152px;
`;
