import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";
const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById(id));
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  if (!professionsLoading) {
    return <p>{profession.name}</p>;
  } else {
    return "Loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;

/*
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
*/
