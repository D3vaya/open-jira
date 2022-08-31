import { useContext } from "react";
import {
  Box,
  List,
  Drawer,
  Divider,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";
import EmailIcon from "@mui/icons-material/Email";
import { UIContext } from "../../context/ui";
const menuItems = ["Imbox", "Starred", "Send Email", "Draft"];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((text, i) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {i % 2 ? <InboxIcon /> : <EmailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};
