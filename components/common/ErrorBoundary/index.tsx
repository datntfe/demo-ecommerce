import React from 'react';
import Layout from 'components/layout/layout';

interface ErrorFallback {
  error: any;
  resetErrorBoundary: any;
}

const ErrorFallback: React.FC<ErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => (
  <Layout>
    <div className="container">
      <div className="d-flex flex-column justify-content-center align-items-center mb-5 pb-5">
        <img src="/img/wrong.webp" alt="wrong" />
        <h1 className="text-center mt-5">please try again later!</h1>
      </div>
    </div>
  </Layout>
);

export default ErrorFallback;
