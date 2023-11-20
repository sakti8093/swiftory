import "./App.css";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/navbar/NavBar";

import { AuthProvider } from "./context/authContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
  }, [localStorage.getItem("token")]);
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Toaster position="top-center" />
      </AuthProvider>
    </>
  );
}

export default App;
