import {
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import DrawerAdmin from "./DrawerAdmin";

const AdminNav = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography sx={{ display: "flex" }}>
              <h2 style={{ textAlign: "center" }}>Bus Ticket App</h2>
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
                  <Tab href="/admin/home" label="Home" />
                  <Tab href="/admin/yourbus" label="Your Bus" />
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
