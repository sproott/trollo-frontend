export const isBrowser = () => {
  return typeof window !== "undefined"
}

export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}
