const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")
const withAntdLess = require("next-plugin-antd-less")

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/antd-custom.less",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new AntdDayjsWebpackPlugin())

    // Important: return the modified config
    return config
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
})
