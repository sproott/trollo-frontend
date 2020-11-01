module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "import",
      {
        libraryName: "@ant-design",
        style: true,
      },
    ],
    [
      "styled-components",
      {
        ssr: true,
      },
    ],
  ],
}
