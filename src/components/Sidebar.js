/*
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  withStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";

import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import InfoIcon from "@material-ui/icons/Info";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SchoolIcon from "@material-ui/icons/School";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";



import myStyles from "../styles/styles";

const Sidebar = ({ showDrawer, toggleDrawer }) => {
  return (
    <Drawer
      open={showDrawer}
      onClose={toggleDrawer}
      PaperProps={{
        style: {
          width: 190,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid #ddd",
          zIndex: 1500,
        },
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Typography variant="h6" style={{ fontWeight: 600, color: "#1976d2" }}>
          TMDebtors
        </Typography>
        <CloseIcon
          onClick={toggleDrawer}
          style={{ cursor: "pointer", color: "#444" }}
        />
      </Toolbar>

      <Divider />

      <List>
        {[
          { text: "Home", icon: <HomeIcon />, path: "/" },
          { text: "Items", icon: <ListAltIcon />, path: "/items" },
          { text: "Coustomer Details", icon: <InfoIcon />, path: "/details" },
          { text: "Bank Details", icon: <PersonAddIcon />, path: "/register" },
          { text: "Create Invoice", icon: <ReceiptIcon />, path: "/create-invoice" },
           { text: "View Invoices", icon: <DescriptionIcon />, path: "/invoices" },
           { text: "Courses", icon: <SchoolIcon />, path: "/courses" },
           { text: "About Us", icon: <ContactMailIcon />, path: "/contact" },


          
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            onClick={toggleDrawer}
            style={{
              borderRadius: "8px",
              margin: "6px 12px",
              padding: "10px",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ListItemIcon style={{ color: "#1976d2" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ style: { color: "#333", fontWeight: 500 } }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default withStyles(myStyles)(Sidebar);
*/
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Switch,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  Info as InfoIcon,
  PersonAdd as PersonAddIcon,
  School as SchoolIcon,
  ContactMail as ContactMailIcon,
  Close as CloseIcon,
  Receipt as ReceiptIcon,
  Description as DescriptionIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  OpenInBrowser,
  NewReleases,
} from "@material-ui/icons";

const Sidebar = ({ showDrawer, toggleDrawer }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Items", icon: <ListAltIcon />, path: "/items" },
    { text: "Customer Details", icon: <InfoIcon />, path: "/details" },
    { text: "Bank Details", icon: <PersonAddIcon />, path: "/bankDetails" },
    { text: "Create Invoice", icon: <ReceiptIcon />, path: "/create-invoice" },
    { text: "View Invoices", icon: <DescriptionIcon />, path: "/invoices" },
    { text: "Courses", icon: <SchoolIcon />, path: "/courses" },
    { text: "About Us", icon: <ContactMailIcon />, path: "/about" },
    {text:"Login",icon: <OpenInBrowser/>, path:"/login"},
    {text:"Register",icon: <NewReleases/>, path:"/register"}
  ];

  const sidebarStyles = {
    width: 190,
    background: darkMode ? "#1f1f1f" : "rgba(255, 255, 255, 0.95)",
    color: darkMode ? "#f0f0f0" : "#333",
    backdropFilter: "blur(10px)",
    borderRight: darkMode ? "1px solid #444" : "1px solid #ddd",
    zIndex: 1500,
  };

  return (
    <Drawer open={showDrawer} onClose={toggleDrawer} PaperProps={{ style: sidebarStyles }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: 600, color: darkMode ? "#90caf9" : "#1976d2" }}
        >
          TMDebtors
        </Typography>
        <CloseIcon onClick={toggleDrawer} style={{ cursor: "pointer", color: darkMode ? "#ccc" : "#444" }} />
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            onClick={toggleDrawer}
            style={{
              borderRadius: "8px",
              margin: "6px 12px",
              padding: "10px",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = darkMode ? "#333" : "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ListItemIcon style={{ color: darkMode ? "#90caf9" : "#1976d2" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                style: { color: darkMode ? "#ddd" : "#333", fontWeight: 500 },
              }}
            />
          </ListItem>
        ))}

        <Divider style={{ margin: "10px 0" }} />

        <ListItem>
          <ListItemIcon style={{ color: darkMode ? "#ffca28" : "#444" }}>
            {darkMode ? <DarkIcon /> : <LightIcon />}
          </ListItemIcon>
          <ListItemText
            primary={darkMode ? "Dark Mode" : "Light Mode"}
            primaryTypographyProps={{
              style: { color: darkMode ? "#ccc" : "#333" },
            }}
          />
          <Switch checked={darkMode} onChange={toggleTheme} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
