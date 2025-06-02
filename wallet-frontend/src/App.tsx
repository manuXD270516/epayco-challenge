import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Recharge from './pages/Recharge';
import Balance from './pages/Balance';
import Pay from './pages/Pay';
import Confirm from './pages/Confirm';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Registro</Link> | <Link to="/recharge">Recarga</Link> | <Link to="/balance">Saldo</Link> | <Link to="/pay">Pago</Link> | <Link to="/confirm">Confirmar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
