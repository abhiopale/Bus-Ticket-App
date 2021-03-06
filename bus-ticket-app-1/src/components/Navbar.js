import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import DrawerUser from "./DrawerUser";

const Nav = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "crimson" }}>
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
              <DrawerUser />
            </>
          ) : (
            <>
              <Typography sx={{ marginLeft: "auto" }}>
                <Tabs
                  textColor="white"
                  sx={{ justifyContent: "space-between" }}
                >
                  <Tab href="/user/signin" label="User" />
                  <Tab href="/admin/signin" label="Admin" />
                </Tabs>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Nav;
