export const isBrowser = () => {
  return process.browser
}

export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}

export const jsonStringify = (obj: any) => JSON.stringify(obj, null, 2)
