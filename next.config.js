const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new AntdDayjsWebpackPlugin())

    // Important: return the modified config
    return config
  },
  publicConfig: {
    API_URL: process.env.API_URL,
  },
}
