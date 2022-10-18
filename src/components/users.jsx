import React, { useState, useEffect } from "react";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import User from "./user";
import { useParams } from "react-router-dom";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });
  const pageSize = 6;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

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
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const params = useParams();
  const { userId } = params;

  if (userId) {
    return (
      <>
        {<User id={userId}/>}
      </>
    );
  }

  if (users) {
    const filteredUsers = selectedProf ? users.filter(item => JSON.stringify(item.profession) === JSON.stringify(selectedProf)) : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
        <div className="d-flex flex-column">
          <SearchStatus length={count}/>
          {count > 0 && (
            <UsersTable
              users={userCrop}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
              onSort={handleSort}
            />)}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  };
  return "Loading...";
};

export default Users;
