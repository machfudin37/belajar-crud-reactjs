import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
        phone,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='card-title text-center mb-4'>Register</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone Number</label>
                <input type='tel' className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <button type='submit' className='btn btn-primary w-100'>
                Register
              </button>
              <div className='mt-3 text-center'>
                Already have an account? <Link to='/login'>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
