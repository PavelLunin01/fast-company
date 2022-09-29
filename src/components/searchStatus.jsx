import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return `${number} человек тусанет с тобой`;
    if ([2, 3, 4].indexOf(lastOne) >= 0) return `${number} человека тусанут с тобой`;
    if (lastOne === 1) return `${number} человек тусанет с тобой`;
    return `${number} человек тусанет с тобой`;
  };
  return (
    <>
      <h2>
        <span
          className={"badge bg-" + (length > 0 ? "primary" : "danger")}
        >
          {length > 0
            ? renderPhrase(length)
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
    </>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};
export default SearchStatus;
