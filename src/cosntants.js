// объект с выводом сообщение об ошибке
export const MESSAGE_USERS = {
  default: 'Поле не может быть пустым',
  weakError: 'Пароль слишком слабый, придумайте другой',
  alreadyExistsError: 'Такой пользователь уже существует',
  validationFailedError: 'Некоректный E-mail',
  success: "Пользователь зарегистрирован",
  logged: "Успешная авторизация",
}

export const ERR_CODE = {
  invalid_credentials: 'Неправильный логин или пароль',
  weak: "weak_password", // слабый пароль
  alreadyExists: 'user_already_exists', // пользователь уже существует
  validationFailed: 'validation_failed', // пользователь уже существует
}
