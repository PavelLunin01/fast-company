import React, {useState} from "react";
import api from "../api";

const Users = () => {
  console.log("Почему в консоль выводится дважды эта фраза, а не один?");

  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  }

  const renderPhrase = (number) => {
    let lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return `${number} человек тусанет с тобой`;
    if ([2,3,4].indexOf(lastOne) >= 0) return `${number} человека тусанут с тобой`;
    if (lastOne === 1) return `${number} человек тусанет с тобой`;
    return `${number} человек тусанет с тобой`;
  }

  const renderQualities = (array) => {
    return array.map((quality) => <span key={quality._id} className={'badge m-2 bg-' + quality.color}>{quality.name}</span>)
  }

  const renderTr = () => {
    return (

      users.map((user) =>
        <tr key={user._id}>
          <th scope="row">{user.name}</th>
          <td>{renderQualities(user.qualities)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>delete</button>
          </td>
        </tr>)
    );
  };

  return (<>
      <h2>
        <span className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}>
          {users.length > 0 ? renderPhrase(users.length) : 'Никто с тобой не тусанет'}
        </span>
      </h2>
      {users.length > 0 && (
        <table className='table'>
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {renderTr()}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;