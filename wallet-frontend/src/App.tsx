import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Recharge from "./pages/Recharge";
import Balance from "./pages/Balance";
import Pay from "./pages/Pay";
import Confirm from "./pages/Confirm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </Router>
  );
}

export default App;
