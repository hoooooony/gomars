const webpack = require("webpack");

module.exports = function override(config) {
  // 기존의 fallback 설정
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;

  // 여기에 추가로 JSX 런타임 관련 alias 설정을 넣습니다.
  config.resolve.alias = {
    ...config.resolve.alias,
    "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
    "react/jsx-runtime.js": "react/jsx-runtime",
  };

  config.module.rules = (config.module.rules || []).concat([
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    },
  ]);

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
