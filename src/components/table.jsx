import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data }) => {
  return (
    <table className="table">
      <TableHeader {...{ onSort, selectedSort, columns }}/>
      <TableBody {...{ columns, data}}/>
    </table>
  );
};
Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};
export default Table;
