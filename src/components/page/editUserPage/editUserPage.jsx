import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectedField from "../../common/form/selectedField";
import RadioForm from "../../common/form/radioForm";
import MultiSelectField from "../../common/form/multiSelectField";
import BackButton from "../../common/backButton";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState([]);
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

  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof];
      if (profData._id === id) return profData;
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
  };

  const transformData = (data) => {
    return data.map((qualities) => ({ label: qualities.name, value: qualities._id, color: qualities.color }));
  };

  useEffect(() => {
    setIsLoading(true);

    api.users.getById(userId).then(({ name, email, sex, profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        name: name,
        email: email,
        sex: sex,
        profession: profession._id,
        qualities: transformData(qualities)
      }))
    );
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

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
        message: "?????????????? ???????? ??????"
      }
    },
    email: {
      isRequired: {
        message: "?????????????????????? ?????????? ???????????? ???????? ??????????????????"
      },
      isEmail: {
        message: "Email ?????????????????????? ????????????????"
      }
    },
    profession: {
      isRequired: {
        message: "???????????????? ???????? ??????????????????"
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
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="???????? ??????"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="???????????????????????? ??????????"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectedField
                label="???????????????? ??????????????????"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose..."
                options={professions}
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
                label="???????????????? ?????? ??????"
              />
              <MultiSelectField
                options={qualities}
                defaultValue={data.qualities}
                onChange={handleChange}
                name="qualities"
                label="???????????????? ???????? ????????????????"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                ????????????????
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
