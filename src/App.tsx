import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
