import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  const isLoading = useSelector(getQualitiesLoadingStatus());

  if (isLoading) {
    return "Loading...";
  }

  const qualitiesList = useSelector(getQualitiesById(qualities));
  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
