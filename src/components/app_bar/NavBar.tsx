import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./AppBar.module.scss";
import Typography from "@mui/material/Typography";

export default function NavBar() {
    return <AppBar position="fixed">
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component={"div"}>
                Waste Collection System
            </Typography>
        </Toolbar>
    </AppBar>
}