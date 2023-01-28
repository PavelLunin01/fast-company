import React, { useState, useEffect } from "react";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import SearchBar from "../../searchBar";
import { useUsers } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const { isLoading: professionsLoading, professions } = useProfessions();
  const { currentUser } = useAuth();
  const { users } = useUsers();

  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });
  const pageSize = 4;

  const handleDelete = (userId) => {
    console.log(userId);
  };
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleName = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  let userCrop = null;
  useEffect(() => {
    if (userCrop) {
      if (userCrop.length === 0) {
        setCurrentPage(1);
      }
    }
  });

  if (users) {
    const filterUsers = (data) => {
      const filteredUsers = searchQuery
        ? data.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
        : selectedProf
          ? data.filter(
            (item) =>
              JSON.stringify(item.profession) === JSON.stringify(selectedProf)
          )
          : data;
      return filteredUsers.filter((u) => u._id !== currentUser._id);
    };
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex justify-content-center">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onProfessionSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary m-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchBar name={searchQuery} onHandleName={handleName} />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
              onSort={handleSort}
            />
          )}
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
  }
  return <h1>Loading...</h1>;
};

export default UsersListPage;
