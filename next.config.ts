import type { NextConfig } from "next";
import { enforceProductionBusinessConfig } from "./config/business";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.VITEST &&
  process.env.SKIP_ENV_VALIDATION !== "true"
) {
  enforceProductionBusinessConfig();
}

const nextConfig: NextConfig = {/* config options here */};

export default nextConfig;
