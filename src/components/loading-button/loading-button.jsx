import React from 'react';

const LoadingButton = () => {
  return (
    <button className="btn btn-primary btn-lg btn-block" type="button" disabled={true}>
      <span className="spinner-border spinner-border-sm" role="status"></span>
      <span> Loading... </span>
    </button>
  );
};

export default LoadingButton;
