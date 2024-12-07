import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import { AuthProvider } from "./context/auth.js";
import { TaskProvider } from "./context/task.js";
import "./App.css";
import PageNotFound from "./pages/404.js";
import Main from "./component/nav/Main.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.js";
import PrivateRoute from "./component/form/PrivateRoute.js";
import Tasks from "./pages/Tasks.js";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Main />
          <Toaster toastOptions={{ duration: 1000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="" element={<Dashboard />} />{" "}
              <Route path="tasks" element={<Tasks />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
