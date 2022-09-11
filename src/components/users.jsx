import React, {useState} from "react";
import api from "../api";

const Users = () => {
  
  const [users, setUsers] =  useState(api.users.fetchAll());
  
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user !== userId));
  }
  
  const renderPhrase = (number) => {
    if (number >= 2 && number <= 4) {
      return `${number} человека тусанут с тобой`;
    }
    return `${number} человек тусанет с тобой`;
  }

  const renderQualities = (array) => {
    return (
      (array.map((quality) => <span key={quality._id} className={'badge m-2 bg-' + quality.color}>{quality.name}</span>))
    )
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
            <button className='btn btn-danger' onClick={() => handleDelete(user)}>delete</button>
          </td>
        </tr>)
    );
  };

  if (users.length !== 0) {
    return (<>
        <h2>
          <span className='badge bg-primary' >{renderPhrase(users.length)}</span>
        </h2>
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
      </>
    );
  };
  return (
    <>
      <h2>
        <span className='badge bg-danger' >Никто с тобой не тусанет</span>
      </h2>
    </>
  );
};

export default Users;