import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ name, onHandleName }) => {
  return (
    <div className="input-group">
      <input
        className="w-100 m-2"
        type="text"
        placeholder="Search..."
        value={name}
        onChange={onHandleName}
      />
    </div>
  );
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  onHandleName: PropTypes.func.isRequired
};

export default SearchBar;
