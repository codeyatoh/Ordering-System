import { Routes, Route } from 'react-router-dom'
import LoginPage from '../LoginPage/loginpage'
import DiningLocation from '../Dining Location/dininglocation'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dining-location" element={<DiningLocation />} />
    </Routes>
  );
}

export default AppRoutes;