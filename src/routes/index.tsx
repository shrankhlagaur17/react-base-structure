import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function RoutesManager() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/public" element={<PublicRoute />} />
        <Route path="/private" element={<PrivateRoute />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesManager;
