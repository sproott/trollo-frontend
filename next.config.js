const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")

console.log(process.env.API_URL)

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new AntdDayjsWebpackPlugin())

    // Important: return the modified config
    return config
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
}
