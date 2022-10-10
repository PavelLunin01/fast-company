import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    console.log(selectedProf);
  };

  const filteredUsers = selectedProf ? allUsers.filter(item => item.profession === selectedProf) : allUsers;
  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex justify-content-center">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onProfessionSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary m-2" onClick={clearFilter}>Очистить</button>
        </div>)}
      {allUsers.length > 0 && (
        <div className="d-flex flex-column">
          <SearchStatus length={count}/>
          <table className="table">
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
              {userCrop.map((user) => (
                <User
                  key={user._id}
                  {...user}
                  {...rest}
                />
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  length: PropTypes.number
};
export default Users;
