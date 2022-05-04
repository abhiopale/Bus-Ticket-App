import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import DrawerUser from "./DrawerUser";

const UserNav = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ display: "flex" }}>
              <h2>Bus Ticket App</h2>
              <ConfirmationNumberIcon
                style={{
                  fontSize: "40px",
                  marginTop: "20px",
                  marginLeft: "auto",
                }}
              />
            </Typography>
          </Toolbar>
          {isMatch ? (
            <>
              <Typography></Typography>
              <DrawerUser />
            </>
          ) : (
            <>
              <Typography sx={{ marginLeft: "auto" }}>
                <Tabs
                  textColor="inherit"
                  sx={{ justifyContent: "space-between" }}
                >
                  <Tab label="Book Tickets" />
                  <Tab label="Your Tickets" />
                </Tabs>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default UserNav;
