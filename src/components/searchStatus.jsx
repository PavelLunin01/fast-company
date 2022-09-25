import React from "react";

const SearchStatus = ({length}) => {
  let lastOne = Number(length.toString().slice(-1));
  if (length > 4 && length < 15) return `${length} человек тусанет с тобой`;
  if ([2,3,4].indexOf(lastOne) >= 0) return `${length} человека тусанут с тобой`;
  if (lastOne === 1) return `${length} человек тусанет с тобой`;
  return `${length} человек тусанет с тобой`;
}

export default SearchStatus;