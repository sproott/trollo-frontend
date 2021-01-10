export const isBrowser = () => {
  return process.browser
}

export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}

export const jsonStringify = (obj: unknown) => JSON.stringify(obj, null, 2)
