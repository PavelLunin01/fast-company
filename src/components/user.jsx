import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";

const User = ({ id }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUsers(data));
  }, []);

  const history = useHistory();

  const back = () => {
    history.push("/users");
  };

  const renderUser = (obj) => {
    return (
      <div>
        <h1>{obj.name}</h1>
        <h2>Профессия: {obj.profession.name}</h2>
        <h3>
          {obj.qualities.map((quality) => <span key={quality._id} className={"badge m-1 bg-" + quality.color}>{quality.name}</span>)}
        </h3>
        <h2>completedMeetings: {obj.completedMeetings}</h2>
        <h2>rate: {obj.rate}</h2>
      </div>
    );
  };
  if (users) {
    return (
      <>
        {
          renderUser(users)
        }
        <button onClick={() => { back(); }}>
          Все пользователи
        </button>
      </>
    );
  };
  return "loading...";
};
User.propTypes = {
  id: PropTypes.string.isRequired
};
export default User;
