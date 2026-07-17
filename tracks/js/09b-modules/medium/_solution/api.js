import { environment } from "./config.js";

const HOSTS = {
  development: "http://localhost:3000",
  test: "http://localhost:4000",
  production: "https://api.example.com",
};

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  return HOSTS[environment] + normalizedPath;
}
