import React from 'react';

export default function Alert(props) {
  const alertType = props.alert.type.toLowerCase();

  return (
    <div style={{ height: '50px', marginBottom: '15px' }}>
      {props.alert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          <strong>{props.alert.msg}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
}
