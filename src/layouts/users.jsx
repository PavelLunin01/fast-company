import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UserLoader from "../components/ui/hoc/userLoader";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <UserLoader>
      {userId ? (
        edit ? (
          userId === currentUserId ? (
            <EditUserPage />
          ) : (
            <Redirect to={`/users/${currentUserId}/edit`}/>
          )
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UserLoader>

  );
};
export default Users;
