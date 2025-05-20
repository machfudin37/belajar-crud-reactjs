import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate("/", { replace: true }); // Gunakan replace untuk mencegah kembali ke login
        window.location.reload(); // Force refresh untuk memastikan state terupdate
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='card-title text-center mb-4'>Login</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type='submit' className='btn btn-primary w-100'>
                Login
              </button>
              <div className='mt-3 text-center'>
                Don't have an account? <Link to='/register'>Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
