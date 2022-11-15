import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const history = useHistory();

  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>rate: {user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
      </div>
    );
  }
  return <h1>loading...</h1>;
};
UserPage.propTypes = {
  id: PropTypes.string.isRequired
};
export default UserPage;
