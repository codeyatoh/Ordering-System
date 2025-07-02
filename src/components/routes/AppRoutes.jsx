import { Routes, Route } from 'react-router-dom'
import LoginPage from '../LoginPage/loginpage'
import DiningLocation from '../DiningLocation/dininglocation'
import CoffeeShop from '../CoffeeShop/CoffeeShop'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dining-location" element={<DiningLocation />} />
      <Route path="/coffee-shop" element={<CoffeeShop />} />
    </Routes>
  );
}

export default AppRoutes;