import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectedField from "../common/form/selectedField";
import RadioForm from "../common/form/radioForm";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState(
    {
      email: "",
      password: "",
      profession: "",
      sex: "male",
      qualities: [],
      licence: false
    }
  );
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта должна быть заполнена"
      },
      isEmail: {
        message: "Email некорректно заполнен"
      }
    },
    password: {
      isRequired: {
        message: "Пароль должнен быть заполнен"
      },
      isCapitalSymbol: {
        message: "Пароль должнен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должнен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должнен быть минимум 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Выберите вашу профессию"
      }
    },
    licence: {
      isRequired: {
        message: "Подтвердить лицензию"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    console.log(data);
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
      <SelectedField
        label="Выберите профессию"
        value={data.profession}
        onChange={handleChange}
        defaultOption="Choose..."
        options={professions}
        name="profession"
        error={errors.profession}
      />
      <RadioForm
        options ={[
          {name: "Male", value: "male"},
          {name: "Female", value: "female"},
          {name: "Other", value: "other"}
        ]}
        value={data.sex}
        onChange={handleChange}
        name="sex"
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        defaultValue={data.qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        name="licence"
        onChange={handleChange}
        value={data.licence}
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
