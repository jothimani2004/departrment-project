import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const back_api = process.env.REACT_APP_API_URL;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${back_api}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setSuccess('Password reset successful!');
        setError('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to reset password');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while resetting your password');
      setSuccess('');
    }
  };

  return (
    <div className="container min-vh-90 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4 fw-bold">Reset Password</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control form-control-lg"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`btn ${showPassword ? 'btn-primary' : 'btn-outline-primary'} visibility-btn`}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash fs-5">👁️‍🗨️</i>
                  ) : (
                    <i className="bi bi-eye fs-5">👁️</i>
                  )}

                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label fw-medium">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-control form-control-lg"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={`btn ${showConfirmPassword ? 'btn-primary' : 'btn-outline-primary'} visibility-btn`}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <i className="bi bi-eye-slash fs-5">👁️‍🗨️</i>
                  ) : (
                    <i className="bi bi-eye fs-5">👁️</i>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mt-3"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;