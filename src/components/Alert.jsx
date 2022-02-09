const Alert = ({ name, message, isError, isTouched, status }) => {
  if (isError && isTouched && status === 'danger') {
    return (
      <div className={`alert alert-${status} mx-5`} role="alert">
        {`${name}: ${message}`}
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div className={`alert alert-${status} mx-5`} role="alert">
        {message}
      </div>
    );
  }

  return null;
};

export default Alert;
