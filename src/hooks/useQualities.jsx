import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import qualitiesService from "../services/qualitiesService";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();
export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getQuality(id) {
    return qualities.find((q) => q._id === id);
  };

  async function getQualitiesList() {
    try {
      const { content } = await qualitiesService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(false);
    }
  };
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
