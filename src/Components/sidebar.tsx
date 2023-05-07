import React from 'react';
import {List, ListItemButton, ListItemText} from "@mui/material";
import {Home, LibraryMusic, Search} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const styleLink = {
    textDecoration: "none",
    color: "white"
}

const Sidebar = () => {
    return (
        <List sx={{width: "300px", background: "black", color: "white", height: "100vh", float: "left"}}>
            <NavLink to="/" style={styleLink}>
                <ListItemButton>
                    <Home/><ListItemText primary="&nbsp;Home"/>
                </ListItemButton>
            </NavLink>

            <NavLink to="/search" style={styleLink}>
                <ListItemButton>
                    <Search/><ListItemText primary="&nbsp;Search"/>
                </ListItemButton>
            </NavLink>
            <div style={{display: "flex", justifyContent: "center"}}><hr style={{width: "90%", opacity: "0.5", textAlign: "center", }}/></div>
            <NavLink to="/my-library" style={styleLink}>
                <ListItemButton>
                    <LibraryMusic/><ListItemText primary="&nbsp;Yor Library"/>
                </ListItemButton>
            </NavLink>
        </List>
    );
};

export default Sidebar;