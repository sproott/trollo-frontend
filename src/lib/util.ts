export const isBrowser = () => {
  return process.browser
}

export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}

export const jsonStringify = (obj: any) => JSON.stringify(obj, null, 2)

export const findParentOfNestedValue = <TResult>(
  base: any,
  keys: string[],
  findCondition: (obj: TResult) => boolean
): TResult[] => {
  if (keys.length === 0) {
    if (!Array.isArray(base)) {
      throw new Error("No array on the final level")
    } else {
      return !!(base as Array<TResult>).find((obj) => findCondition(obj))
        ? (base as Array<TResult>)
        : undefined
    }
  }
  if (!base) return undefined
  if (!Array.isArray(base)) {
    const key = keys[0]
    keys.splice(0, 1)
    return findParentOfNestedValue(base[key], [...keys], findCondition)
  }
  for (const key in base) {
    if (!base.hasOwnProperty(key)) continue
    const result = findParentOfNestedValue(base[key], [...keys], findCondition)
    if (result !== undefined) return result
  }
  return undefined
}

export const removeNestedValue = <TResult>(
  base: any,
  keys: string[],
  findCondition: (obj: TResult) => boolean
): void => {
  const arr = findParentOfNestedValue(base, keys, findCondition)
  arr.splice(arr.findIndex(findCondition), 1)
}
