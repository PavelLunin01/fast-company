import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error, type }) => {

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>{" "}
      <div className="input-group has-validation">
        <textarea
          id={name}
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {error && <p className="invalid-feedback">{error}</p>}
      </div>
    </div>
  );
};
TextAreaField.defaultProps = {
  type: "text"
};
TextAreaField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default TextAreaField;
