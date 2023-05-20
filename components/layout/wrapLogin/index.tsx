import React from 'react';

interface LayoutWrapLoginProps {
  children: React.ReactNode;
}

const LayoutWrapLogin: React.FC<LayoutWrapLoginProps> = ({ children }) => (
  <div className="wrap-login" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
    <div className="container d-flex align-items-center h-100">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="login-content">{children}</div>
      </div>
    </div>
  </div>
);

export default LayoutWrapLogin;
