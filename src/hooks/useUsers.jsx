import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();
export const useUsers = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex(u => u._id === currentUser._id);
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    };
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  async function getUsers() {
    try {
      const { content } = await userService.fetchAll();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  function getUserById(user) {
    return users.find((u) => u._id === user);
  };
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;
