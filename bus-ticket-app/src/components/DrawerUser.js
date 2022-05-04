import React, { useState } from "react";

import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const DrawerAdmin = () => {
  const [openDrawer, setopenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setopenDrawer(false)}>
        <List>
          <ListItemButton onClick={() => setopenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>Book Tickets</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={() => setopenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>Your Tickets </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setopenDrawer(!openDrawer)}
      >
        <MenuIcon></MenuIcon>
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerAdmin;
