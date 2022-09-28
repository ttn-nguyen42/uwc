import { AppBar, Box } from "@mui/material";
import NavBar from "../app_bar/NavBar";
import style from "./PageWrapper.module.scss";

interface PageWrapperProps {
    children: JSX.Element | JSX.Element[] | undefined;
}

export default function PageWrapper({ children }: PageWrapperProps) {
    return <Box sx={{ display: 'flex' }}>
        <NavBar></NavBar>
        <div>Wrapper</div>
    </Box>
}