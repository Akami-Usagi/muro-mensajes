import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterMessage from "./Pages/RegisterMessage";
import MessageViewer from "./Pages/MessageViewer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterMessage />} />
        <Route path="/ver" element={<MessageViewer />} />
      </Routes>
    </Router>
  );
}

