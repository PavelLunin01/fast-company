import React, {useState} from "react";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import Users from "./components/users";
import Quality from "./components/qualitie";

const App = () => {

  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  }
  const handleToggleBookMark = (id) => {
    setUsers(users.filter((user) => {

      if(user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    }));
  }

  return (<>
      <h2>
        <span className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}>
          {users.length > 0 ? SearchStatus(users) : 'Никто с тобой не тусанет'}
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
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {users.map((user) =>
            <tr key={user._id}>
              <th scope="row">{user.name}</th>
              <td>{user.qualities.map((quality) => Quality(quality))}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <i className={'bi bi-' + (user.bookmark ? 'bookmark-fill' : 'bookmark')}
                   onClick={() => handleToggleBookMark(user._id)}>
                </i>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;