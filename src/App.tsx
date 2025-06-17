import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import AI from "./routes/AI";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<AI />} />
      </Routes>
    </div>
  );
};

export default App;
