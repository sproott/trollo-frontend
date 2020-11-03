const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin")
const withLess = require("@zeit/next-less")
const lessToJS = require("less-vars-to-js")
const fs = require("fs")
const path = require("path")

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/antd-vars.less"), "utf8")
)

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new AntdDayjsWebpackPlugin())

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      })
    }

    return config
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
})
