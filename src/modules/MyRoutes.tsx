export const ROUTES = {
    HOME: "/",
    TEXTS: "/texts",
    REGISTER: "/register",
    LOGIN: "/login",
    PROFILE: "/profile",
    ORDER: "/order",
    REQUESTS: "/requests"
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    TEXTS: "Тексты",
    REGISTER: "Регистрация",
    LOGIN: "Вход",
    PROFILE: "Профиль",
    ORDER: "Корзина",
    REQUESTS: "Заявки"
  };