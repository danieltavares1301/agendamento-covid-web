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
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
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
            <ListItem button>
              <ListItemText primary="Home" onClick={() => navigate("/")} />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Schedules"
                onClick={() => navigate("/Schedules")}
              />
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
