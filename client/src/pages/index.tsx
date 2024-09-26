import { Outlet, useLocation } from "react-router-dom";
import Dashboard from './Dashboard.js';

function Index() {
  const location = useLocation();

  return (
    <div className="container-fluid h-full w-full">
      {location.pathname === "/" ? <Dashboard /> : <Outlet />}
    </div>
  );
}

export default Index;
