import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Login = () => {
  const [loginInput, setloginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const navigate = useNavigate();
  const back_api = process.env.REACT_APP_API_URL ;

  useEffect(()=>{
    const logout = async ()=>{
      await fetch(`${back_api}/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
    }
    logout()
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${back_api}/login`,
        { loginInput, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log('Login successful');
        const token = Cookies.get('jwtToken');
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.jwtPayload.reg)
        if(decodedToken.jwtPayload.role == 'Admin'){
          navigate('/Admin_page/Edit')
        }else{
          navigate(`/People/Students/Profile/Edit?register_no=${decodedToken.jwtPayload.reg}`);
        }
      }
    } catch (err) {
      if (err.response?.data?.message === 'Account locked. Please try again later or reset your password.') {
        setAccountLocked(true);
      } else {
        setError(err.response?.data?.message || 'Invalid username or password');
      }
    }
  };

  const handleForgotPasswordClick = () => {
    setAccountLocked(false);
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${back_api}/forgot-password`, { email: emailForReset });
      if (response.status === 200) {
        setResetLinkSent(true);
        setEmailForReset('');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mani-container hirthick-container">
      <div className="card shadow-sm w-100 p-0" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="loginInput" className="form-label">Username or Email</label>
              <input
                type="text"
                id="loginInput"
                value={loginInput}
                onChange={(e) => setloginInput(e.target.value.trim())}
                required
                className="form-control"
                placeholder="Enter your username or email"
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control pe-5"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent"
                style={{ cursor: 'pointer', paddingTop: '31px' }}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <span className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                  <span className="ms-2">Logging In...</span>
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="text-center mt-3">
            <a
              onClick={handleForgotPasswordClick}
              className="text-primary"
              style={{ cursor: 'pointer' }}
            >Forgot Password?</a>
          </div>
        </div>
      </div>

      {showForgotPasswordModal && (
        <div className="modal show d-flex justify-content-center align-items-center" style={{ display: 'block', backdropFilter: 'blur(5px)', height: '100vh' }} tabIndex="-1">
          <div className="modal-dialog" style={{ maxWidth: '100%', width: '600px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotPasswordModal(false)}></button>
              </div>
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="emailForReset" className="form-label">Enter your email address</label>
                    <input
                      type="email"
                      id="emailForReset"
                      value={emailForReset}
                      onChange={(e) => setEmailForReset(e.target.value)}
                      required
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>Send Reset Link</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
