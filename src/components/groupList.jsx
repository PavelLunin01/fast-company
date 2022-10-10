import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onProfessionSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {
        Array.isArray(items) ? items.map(item => (
          <li
            key={item[valueProperty]}
            className={"list-group-item" + (item === selectedItem ? " active" : "")}
            onClick={() => onProfessionSelect(item)}
            role="button"
          >
            {item[contentProperty]}
          </li>)) : Object.keys(items).map(item => (
          <li
            key={items[item][valueProperty]}
            className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
            onClick={() => onProfessionSelect(items[item])}
            role="button"
          >
            {items[item][contentProperty]}
          </li>))
      }
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onProfessionSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  selectedItem: PropTypes.object
};

export default GroupList;
