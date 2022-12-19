import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";
const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();
  const qualityArray = qualities.map((q) => getQuality(q));

  if (!isLoading) {
    return (
      <>
        {qualityArray.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </>
    );
  } else {
    return "Loading...";
  }
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
