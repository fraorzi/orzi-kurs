import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.example",
      port: "",
      pathname: "/products/**",
      search: "",
    }],
  },
};
export default config;
