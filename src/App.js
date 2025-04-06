import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterMessage from "./Pages/RegisterMessage";
import MessageViewer from "./Pages/MessageViewer";
import MessageAdmin from "./Pages/MessageAdmin";
import Login from "./Pages/Login";
import Page404 from "./Pages/page404";
import { useState } from "react";

export default function App() {

  const [logged, setLogged] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterMessage />} />
        <Route path="/ver" element={<MessageViewer />} />
        <Route path="/login" element={<Login setLogged={setLogged}/>} />
        <Route path="/admin" element={logged ? <MessageAdmin/> : <Page404/>} />
      </Routes>
    </Router>
  );
}

