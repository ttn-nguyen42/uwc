import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./routes/login/Login";
import Overview from "./routes/overview/Overview";
import RequireAuth from "./routes/require_auth/RequireAuth";
import Tasks from "./routes/tasks/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/overview" element={<RequireAuth>
          <Overview />
        </RequireAuth>} />
        <Route path="/tasks" element={<RequireAuth>
          <Tasks />
        </RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
