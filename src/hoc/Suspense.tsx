import React from 'react';

type SuspenseProps = {
  fallback: React.ReactNode;
  error: React.ReactNode;
  children: React.ReactNode;
};

const Suspense: React.FC<SuspenseProps> = ({ fallback, error, children }: SuspenseProps) => {
  const isLoading = fallback !== null;
  const hasError = error !== null;

  if (isLoading) {
    return <div className="loading">{fallback}</div>;
  }

  if (hasError) {
    return <div className="error">{error}</div>;
  }

  return <>{children}</>;
};

export default Suspense;
