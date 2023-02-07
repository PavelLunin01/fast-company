export const generateAuthError = (message) => {
  switch (message) {
  case "INVALID_PASSWORD":
    return "Email или пароль введены неверно";
  case "EMAIL_EXISTS":
    return "Пользователь с таким Email уже существует";
  default:
    return "Слишком много попыток. Попробуйте познее";
  };
};
