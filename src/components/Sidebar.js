import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import myStyles from "../styles/styles";

const Sidebar = ({ showDrawer, toggleDrawer }) => {
    return (
        <Drawer open={showDrawer} onClick={toggleDrawer}>
            <Toolbar />
            <List>
                <ListItem component={Link} to="/" onClick={toggleDrawer}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to="/items" onClick={toggleDrawer}>
                    <ListItemText primary="Items" />
                </ListItem>
                <ListItem component={Link} to="/details" onClick={toggleDrawer}>
                    <ListItemText primary="Details" />
                </ListItem>
                <ListItem component={Link} to="/Register" onClick={toggleDrawer}>
                    <ListItemText primary="Register" />
                </ListItem>



                <ListItem component={Link} to="/courses" onClick={toggleDrawer}>
                    <ListItemText primary="Courses" />
                </ListItem>
                <ListItem component={Link} to="/contact" onClick={toggleDrawer}>
                    <ListItemText primary="Contact Us" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default withStyles(myStyles)(Sidebar);
