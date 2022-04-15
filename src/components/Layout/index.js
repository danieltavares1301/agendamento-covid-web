import React from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  Box,
  List,
  ListItem,
  Drawer,
  ListItemText,
} from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <Box
    sx={{ display: "flex" }}
    style={{
      backgroundColor: "#F0F0F0",
      minHeight: "100vh",
      maxHeight: "100%",
      minWidth: "100%",
    }}
  >
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{ backgroundColor: "#fff" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{ color: "black" }}
        >
          Schedule for vaccination
        </Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {["Home", "Schedules"].map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Outlet />
    </Box>
  </Box>
);

export default Layout;
