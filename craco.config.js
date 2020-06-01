const path = require("path");

const pathSrc = path.resolve(__dirname, "src/");

module.exports = {
  webpack: {
    alias: {
      "@": pathSrc,
    },
  },
  babel: {
    plugins: [
      [
        "babel-plugin-import",
        {
          libraryName: "@material-ui/core",
          libraryDirectory: "esm",
          camel2DashComponentName: false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@material-ui/icons",
          libraryDirectory: "esm",
          camel2DashComponentName: false,
        },
        "icons",
      ],
    ],
  },
};
