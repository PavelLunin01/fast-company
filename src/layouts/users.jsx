import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

  return (
    <UserProvider>
      {userId ? (
        edit ? (
          userId === currentUser._id ? (
            <EditUserPage />
          ) : (
            <Redirect to={`/users/${currentUser._id}/edit`}/>
          )
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UserProvider>
  );
};
export default Users;
