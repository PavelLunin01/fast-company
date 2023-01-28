import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";

import SelectedField from "../../common/form/selectedField";
import RadioForm from "../../common/form/radioForm";
import MultiSelectField from "../../common/form/multiSelectField";
import BackButton from "../../common/backButton";

import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { qualities } = useQualities();
  const { professions } = useProfessions();
  const { currentUser, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    {
      name: "",
      email: "",
      profession: "",
      sex: "male",
      qualities: []
    }
  );
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray.map((qualities) => ({ label: qualities.name, value: qualities._id, color: qualities.color }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    console.log(newData);
    try {
      await updateUser(newData);
      history.push(`/users/${currentUser._id}`);
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const { name, email, sex, profession, qualities, ...data } = currentUser;
    setData((prevState) => ({
      ...prevState,
      ...data,
      name: name,
      email: email,
      sex: sex,
      profession: profession,
      qualities: getQualities(qualities)
    }));
  }, [qualities, currentUser, professions]);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
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

  return (
    <div className="container mt-5">
      <BackButton/>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Ваше имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электроннаяя почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectedField
                label="Выберите профессию"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                error={errors.profession}
              />
              <RadioForm
                options ={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                onChange={handleChange}
                name="sex"
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualitiesList}
                defaultValue={data.qualities}
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
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
