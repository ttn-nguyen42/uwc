import { Button } from "@mui/material";
import PageWrapper from "../../components/page_wrapper/PageWrapper";
import useAuth from "../../utils/hooks/UseAuth";

export default function Overview() {
    const auth = useAuth();

    return <PageWrapper>
        <Button variant="outlined" onClick={() => {
            auth.logout();
        }}>Logout</Button>
    </PageWrapper>
}