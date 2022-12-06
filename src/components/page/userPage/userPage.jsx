import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>rate: {user.rate}</h2>
        <Link to={`/users/${id}/edit`}>
          <button >Изменить</button>
        </Link>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};
UserPage.propTypes = {
  id: PropTypes.string.isRequired
};
export default UserPage;
