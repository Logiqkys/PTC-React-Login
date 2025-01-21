import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import ViewerPage from "./views/ViewerPage";
import EditorPage from "./views/EditorPage";

const App: React.FC = () => {
  return (
    <Router basename="/PTC-React-Login">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
