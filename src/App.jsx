import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserMenu from './pages/UserMenu';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminCustomers from './pages/AdminCustomers';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/products" element={<AdminProducts />} />
                <Route path="/categories" element={<AdminCategories />} />
                <Route path="/orders" element={<AdminDashboard />} />
                <Route path="/customers" element={<AdminCustomers />} />
                <Route path="*" element={<AdminDashboard />} />
              </Routes>
            </AdminLayout>
          } />

          {/* Main App Routes */}
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/user-menu" element={<UserMenu />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
