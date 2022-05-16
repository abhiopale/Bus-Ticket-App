import React from "react";
import { Toolbar, Typography } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "crimson", color: "white" }}>
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
      <div style={{ textAlign: "center", backgroundColor: "red" }}>
        © 2022 Copyright: www.busticketapp.com
      </div>
    </div>
  );
};

export default Footer;
