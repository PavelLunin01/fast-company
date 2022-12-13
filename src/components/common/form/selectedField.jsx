import React from "react";
import PropTypes from "prop-types";

const SelectedField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const optionsArray = (!Array.isArray(options) && typeof options === "object")
    ? Object.keys(options).map((optionName) => ({ label: options[optionName].name, value: options[optionName]._id }))
    : options;

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray && optionsArray.map((option) => (
          <option
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

SelectedField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string
};

export default SelectedField;
