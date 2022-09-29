import React from "react";
import BookMark from "./bookmark";
import Qualities from "./qualitie";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark, onToggleBookMark, onDelete
}) => {
  return (
    <>
      <tr>
        <th scope="row">{name}</th>
        <td>
          {qualities.map((quality) => (
            <Qualities key={quality._id} {...quality} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
        <td>
          <BookMark
            status={bookmark}
            onClick={() => onToggleBookMark(_id)}
          />
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(_id)}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default User;
