import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const arrowUp = <i className="bi bi-caret-up-fill"></i>;
  const arrowDown = <i className="bi bi-caret-down-fill"></i>;
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const renderArrow = (item) => {
    if (selectedSort.path === item.path) {
      if (selectedSort.order === "asc") {
        return arrowDown;
      }
      if (selectedSort.order === "desc") {
        return arrowUp;
      }
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            scope="col"
            {...{ role: columns[column].path && "button" }}
          >
            {columns[column].name}
            {renderArrow(columns[column])}
          </th>
        ))}

      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};
export default TableHeader;
