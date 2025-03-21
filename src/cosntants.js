import TheListsBooks from '@/components/TheListsBooks.vue';
import TheRead from '@/components/TheRead.vue';
import ThePlanToRead from './components/ThePlanToRead.vue';
import ThePlanToBuy from './components/ThePlanToBuy.vue';

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

// список компонентов на странице dashboard
export const COMPONENTS_DASHBOARD = {
  TheListsBooks: {
    TheListsBooks,
    text: "Список книг"
  },
  TheRead: {
    TheRead,
    text: 'Читаю сейчас'
  },
  ThePlanToRead: {
    ThePlanToRead,
    text: "Планирую читать"
  },
  ThePlanToBuy: {
    ThePlanToBuy,
    text: "Планирую купить"
  },
}
