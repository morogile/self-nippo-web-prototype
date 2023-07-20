import { Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { getAllTag, getNippoCollection, getTagTimeTotal } from "../event/get";

type GraphData = { name: string; id: number; value: number }[];

const RADIAN = Math.PI / 180;

function getCellColor(tagid: number): string {
  const COLORS = [
    "#DA6272",
    "#B75C9D",
    "#8B90BE",
    "#6A8CC7",
    "#45A1CF",
    "#40BFB0",
    "#3DB680",
    "#F3C759",
  ];
  return COLORS[tagid % COLORS.length];
}

export const GraphPage = () => {
  const [numberOfDay, setNumberOfDay] = useState<number>(14);
  const data: GraphData = [];

  const tags = getAllTag();
  tags.forEach((tag) => {
    data.push({
      name: tag.title,
      id: tag.id,
      value: getTagTimeTotal(tag, numberOfDay),
    });
  });

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const nippos = getNippoCollection(numberOfDay);
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <PieChart width={400} height={300}>
        <Legend verticalAlign="top" height={36} />
        <Pie
          dataKey={"value"}
          data={data}
          cx={"50%"}
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, key) => (
            <Cell key={`cell-${key}`} fill={getCellColor(entry.id)} />
          ))}
        </Pie>
      </PieChart>
      <Stack direction={"column"} spacing={3}>
        {nippos.map((nippo, key) => (
          <Stack direction={"column"} spacing={1} key={key}>
            <Typography>{`${
              nippo.date.month() + 1
            }月${nippo.date.date()}日`}</Typography>
            {nippo.activities.map((activity, key) => (
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"space-between"}
                key={key}
              >
                <Typography width={200}>{activity.title}</Typography>
                <Typography width={60}>{`${activity.startTime.format(
                  "HH:mm"
                )}`}</Typography>
                <Typography width={30}>{"〜"}</Typography>
                <Typography width={60}>{`${activity.endTime.format(
                  "HH:mm"
                )}`}</Typography>
                <Typography color={getCellColor(activity.tag.id)}>
                  {activity.tag.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};
