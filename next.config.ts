import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals = [...config.externals];
    config.module.rules.push({
      test: /\.html$/,
                  use: 'ignore-loader',
                });
    return config;
  },
};

export default nextConfig;
