import React from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Navbar = () => {
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
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
