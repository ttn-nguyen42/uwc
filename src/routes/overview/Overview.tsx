import { Button } from "@mui/material";
import useAuth from "../../utils/hooks/UseAuth";

export default function Overview() {
    const auth = useAuth();
    return <div><Button variant="outlined" onClick={() => {
        auth.logout();
    }}>Logout</Button></div>
}