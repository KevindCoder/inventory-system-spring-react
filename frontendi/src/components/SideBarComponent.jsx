import React from "react";
import { Box, List, ListItem, ListItemText, Divider, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Access the auth context for role

const SideBarComponent = () => {
  const navigate = useNavigate();
  const { role } = useAuth(); // Access the role from context to display different links

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
      <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
      >
        <Box sx={{ padding: 2 }}>
          <h3>{role === "ROLE_ADMIN" ? "Admin Dashboard" : role === "ROLE_MANAGER" ? "Manager Dashboard" : "Employee Dashboard"}</h3>
          <Divider />
          <List>
            <ListItem button onClick={() => handleNavigation("/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
            {role === "ROLE_ADMIN" && (
                <>
                  <ListItem button onClick={() => handleNavigation("/admin/statistics")}>
                    <ListItemText primary="Statistics" />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigation("/admin/users")}>
                    <ListItemText primary="Manage Users" />
                  </ListItem>
                </>
            )}
            {role === "ROLE_MANAGER" && (
                <ListItem button onClick={() => handleNavigation("/manager/statistics")}>
                  <ListItemText primary="Manager Statistics" />
                </ListItem>
            )}
            {role === "ROLE_EMPLOYEE" && (
                <>
                  <ListItem button onClick={() => handleNavigation("/employee/tasks")}>
                    <ListItemText primary="My Tasks" />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigation("/employee/time-off")}>
                    <ListItemText primary="Time Off" />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigation("/employee/reports")}>
                    <ListItemText primary="Reports" />
                  </ListItem>
                </>
            )}
            <ListItem button onClick={() => handleNavigation("/logout")}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
  );
};

export default SideBarComponent;
