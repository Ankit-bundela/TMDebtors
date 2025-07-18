/*
import React, { useState } from "react";  
import { AppBar, IconButton, Tabs, Tab, Toolbar, Menu, MenuItem, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import myStyles from "../styles/styles";
import { AccountCircleSharp, Settings, SettingsApplications, Usb } from "@material-ui/icons";

const Navbar = ({ openDrawer }) => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        if (newValue === 0) navigate("/"); 
        else if (newValue === 1) navigate("/courses"); 
        else if (newValue === 2) navigate("/contact");
    };

    // Open menu when AccountCircle is clicked
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Navigate to TraderComponent when clicking "Settings"
    const goToTraderComponent = () => {
        navigate("/trader");
        handleMenuClose(); // Close menu after navigating
    };

    return (
        <AppBar position="fixed">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                
                <IconButton color="inherit" onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                
                <Tabs value={tabIndex} onChange={handleTabChange} style={{ flexGrow: 1 }}>
                    <Tab label="Home" />
                    <Tab label="Item" />
                    <Tab label="Invoice" />
                </Tabs>

                <IconButton color="inherit" style={{ marginLeft: "auto" }} onClick={handleMenuOpen}>
                    <AccountCircleSharp />
                </IconButton>
              <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={goToTraderComponent} size="small" ><Settings/></MenuItem>
                    <MenuItem></MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(myStyles)(Navbar);

/*
import React, { useState } from "react";  
import { 
    AppBar, 
    IconButton, 
    Tabs, 
    Tab, 
    Toolbar, 
    Menu, 
    MenuItem, 
    Typography 
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import {
    AccountCircle,
    Settings,
    ExitToApp
} from "@material-ui/icons";

const Navbar = ({ openDrawer }) => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        if (newValue === 0) navigate("/");
        else if (newValue === 1) navigate("/items");
        else if (newValue === 2) navigate("/contact");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const goToTraderComponent = () => {
        navigate("/trader");
        handleMenuClose();
    };

    return (
        <AppBar
            position="fixed"
            style={{
                background: "#1a237e", // Dark Blue
                zIndex: 1300 // Keep on top of Drawer
            }}
        >
            <Toolbar>
                <IconButton 
                    color="inherit" 
                    onClick={openDrawer}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    style={{ marginLeft: 16 }}
                    indicatorColor="secondary"
                    textColor="inherit"
                >
                    <Tab label="Home" />
                    <Tab label="Items" />
                    <Tab label="Contact" />
                </Tabs>

                <div style={{ flexGrow: 1 }} />
                <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                >
                    <AccountCircle />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    keepMounted
                >
                    <MenuItem onClick={goToTraderComponent}>
                        <Settings fontSize="small" style={{ marginRight: 8 }} />
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <ExitToApp fontSize="small" style={{ marginRight: 8 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
*/
import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Tabs,
  Tab,
  Toolbar,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import {
  AccountCircleSharp,
  Settings
} from "@material-ui/icons";
import myStyles from "../styles/styles";

const Navbar = ({ openDrawer }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue === 0) navigate("/");
    else if (newValue === 1) navigate("/courses");
    else if (newValue === 2) navigate("/contact");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToTraderComponent = () => {
    navigate("/trader");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      style={{
        backgroundColor: "#283593", // Indigo dark
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px"
        }}
      >
        {/* Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          style={{
            flexGrow: 1,
            marginLeft: 24
          }}
        >
          <Tab
            label="Home"
            style={{ minWidth: 80 }}
          />
          <Tab
            label="Item"
            style={{ minWidth: 80 }}
          />
          <Tab
            label="Invoice"
            style={{ minWidth: 80 }}
          />
        </Tabs>

        {/* Account Icon */}
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          style={{
            marginLeft: "auto",
            transition: "background 0.3s",
          }}
        >
          <AccountCircleSharp />
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem
            onClick={goToTraderComponent}
            style={{ gap: 8 }}
          >
            <Settings fontSize="small" />
            Settings
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(myStyles)(Navbar);

