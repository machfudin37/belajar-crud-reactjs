import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductList from "./components/products/ProductList";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });
  return (
    <div className='container mt-5'>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to='/' replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />{" "}
        <Route path='/register' element={!isAuthenticated ? <Register /> : <Navigate to='/' />} />
        <Route path='/' element={isAuthenticated ? <ProductList setIsAuthenticated={setIsAuthenticated} /> : <Navigate to='/login' replace />} />
        <Route path='/add' element={isAuthenticated ? <AddProduct /> : <Navigate to='/login' />} />
        <Route path='/edit/:id' element={isAuthenticated ? <EditProduct /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
