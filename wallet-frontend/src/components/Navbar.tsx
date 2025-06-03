import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm px-4 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ePayco Wallet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["register", "recharge", "balance", "pay", "confirm"].map(route => (
              <li className="nav-item" key={route}>
                <Link className="nav-link" to={`/${route}`}>
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
