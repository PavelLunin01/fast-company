import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ name, onHandlerName}) => {

  return (
    <div className="input-group">
      <input className="w-100 m-2" type="text" value={name} onChange={onHandlerName}/>
    </div>
  );
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  onHandlerName: PropTypes.func.isRequired
};

export default SearchBar;

