import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import history from "../../utils/history";
import { login } from "../../store/users";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setEnterError(null);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта должна быть заполнена"
      }
    },
    password: {
      isRequired: {
        message: "Пароль должнен быть заполнен"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электроннаяя почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Остаться в системе
      </CheckBoxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
