import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectedField from "../common/form/selectedField";
import RadioForm from "../common/form/radioForm";
import MultiSelectField from "../common/form/multiSelectField";

const UserPageForm = () => {
  const { userId } = useParams();
  const [userForm, setUserForm] = useState();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState([]);

  const [data, setData] = useState(
    {
      userName: "",
      email: "",
      profession: "",
      sex: "male",
      qualities: []
    }
  );

  useEffect(() => {
    api.users.getById(userId).then((data) => setUserForm(data));
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
    userName: {
      isRequired: {
        message: "Введите ваше имя"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта должна быть заполнена"
      },
      isEmail: {
        message: "Email некорректно заполнен"
      }
    },
    profession: {
      isRequired: {
        message: "Выберите вашу профессию"
      }
    },
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
  if (userForm) {
    const getQualities = (arrayQualities) => {
      let arrayQual = [];

      arrayQualities.map((qualities) => arrayQual.push({label: qualities.name}));
      return arrayQual
    };

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Ваше имя"
                name="userName"
                value={data.userName = userForm.name}
                onChange={handleChange}
                error={errors.userName}
              />
              <TextField
                label="Электроннаяя почта"
                name="email"
                value={data.email = userForm.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectedField
                label="Выберите профессию"
                value={data.profession = userForm.profession.name}
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
                value={data.sex = userForm.sex}
                onChange={handleChange}
                name="sex"
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                defaultValue={data.qualities = getQualities(userForm.qualities)}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    )

};

export default UserPageForm;

