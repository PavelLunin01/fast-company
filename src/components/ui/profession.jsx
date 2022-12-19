import React from "react";
import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";
const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);
  if (!isLoading) {
    return <p>{profession.name}</p>;
  } else {
    return "Loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
