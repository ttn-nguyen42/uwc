import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./routes/login/Login";
import Overview from "./routes/overview/Overview";
import RequireAuth from "./routes/require_auth/RequireAuth";
import Tasks from "./routes/tasks/Tasks";
import { AuthProvider } from "./utils/hooks/UseAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/overview" element={<RequireAuth>
            <Overview />
          </RequireAuth>} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/tasks" element={<RequireAuth>
            <Tasks />
          </RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
