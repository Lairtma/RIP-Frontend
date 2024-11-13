export const ROUTES = {
    HOME: "/",
    TEXTS: "/texts",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    TEXTS: "Тексты",
  };