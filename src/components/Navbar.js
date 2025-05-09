/*import React, { useState } from "react";  
import { AppBar, IconButton, Tabs, Tab, Toolbar, Menu, MenuItem, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import myStyles from "../styles/styles";
import { AccountCircleSharp, SettingsApplications } from "@material-ui/icons";


const Navbar = ({ openDrawer }) => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = React.useState(0);
    const [anchorElforMenu,setAnchorElforMenu]=React.useState(null);

    const openMenu=(ev)=>{
        setAnchorElforMenu(ev.target.value);
    }
    
    const closeMenu=()=>{
        setAnchorElforMenu(null);
    }

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        if (newValue === 0) navigate("/"); 
        else if (newValue === 1) navigate("/courses"); // Courses
        else if (newValue === 2) navigate("/contact"); // Contact
    };
    const goToTraderComponent = () => {
        navigate("/trader"); 
        closeMenu();
    };

    return (
        <AppBar position="fixed">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                
                <IconButton color="inherit" onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                <Tabs value={tabIndex} onChange={handleTabChange} style={{ flexGrow: 1 }}>
                    <Tab label="Home" />
                    <Tab label="Courses" />
                    <Tab label="Contact Us" />
                </Tabs>

                
                <IconButton color="inherit" style={{ marginLeft: "auto" }} onClick={openMenu}  >
                    <AccountCircleSharp />                    
                </IconButton>
                <Menu
                anchorEl={anchorElforMenu}
                open={Boolean(anchorElforMenu)}
                onClose={closeMenu}
                >
                    <MenuItem
                    onClick={goToTraderComponent}
                    ><SettingsApplications/></MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(myStyles)(Navbar);
*/
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

    // Handle tab navigation
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

                {/* Account Icon with Dropdown Menu */}
                <IconButton color="inherit" style={{ marginLeft: "auto" }} onClick={handleMenuOpen}>
                    <AccountCircleSharp />
                </IconButton>

                {/* Dropdown Menu */}
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
