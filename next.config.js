module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "crests.football-data.org",
          port: "",
          pathname: "/*.png",
        },
      ],
    },
  };
  return nextConfig;
};
