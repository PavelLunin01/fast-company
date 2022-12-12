import React, { useState, useEffect } from "react";
import SelectedField from "../form/selectedField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите от чьего имени вы хотите отправить сообщение"
      }
    },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    api.users.fetchAll().then(setUsers);
  }, []);
  const clearForm = () => {
    setData(initialData);
    setUsers({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };
  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id
    }));

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectedField
          name="userId"
          options={arrayOfUsers}
          onChange={handleChange}
          error={errors.userId}
          defaultOption="Выберите пользователя"
          value={data.userId}
        />
        <TextAreaField
          name="content"
          label="Сообщение"
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
