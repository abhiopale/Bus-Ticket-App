import React from "react";

import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import DrawerAdmin from "./DrawerAdmin";

const AdminNav = () => {
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
              <DrawerAdmin />
            </>
          ) : (
            <>
              <Typography sx={{ marginLeft: "auto" }}>
                <Tabs
                  textColor="inherit"
                  sx={{ justifyContent: "space-between" }}
                >
                  <Tab label="Upload Bus" />
                  <Tab label="Your Sales" />
                </Tabs>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AdminNav;
