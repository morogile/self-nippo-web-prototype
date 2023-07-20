import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import { ProTip } from "../ProTip";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export const Main = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Create React App with styled-components in typescript
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};
