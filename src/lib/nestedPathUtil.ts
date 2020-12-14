type GetType<TBase> = TBase extends (infer TObj)[] ? TObj : TBase
type GetKey<TBase> = keyof GetType<TBase>
type GetNextBase<TPrevBase, TKey extends GetKey<TPrevBase>> = GetType<TPrevBase>[TKey]
type GetNextType<TPrevBase, TKey extends GetKey<TPrevBase>> = GetType<GetNextBase<TPrevBase, TKey>>
type GetNextKey<TPrevBase, TKey extends GetKey<TPrevBase>> = keyof GetNextBase<TPrevBase, TKey>

// @ts-ignore
export function findParentOfNestedValue<
  TBase1,
  TResult extends GetNextType<TBase4, TKey4>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>,
  TBase4 extends GetNextBase<TBase3, TKey3>,
  TKey4 extends GetKey<TBase4>
>(
  base: TBase1,
  keys: [TKey1, TKey2, TKey3, TKey4],
  findCondition: (obj: TResult) => boolean
): TResult[]
// @ts-ignore
export function findParentOfNestedValue<
  TBase1,
  TResult extends GetNextType<TBase3, TKey3>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>
>(base: TBase1, keys: [TKey1, TKey2, TKey3], findCondition: (obj: TResult) => boolean): TResult[]
// @ts-ignore
export function findParentOfNestedValue<
  TBase1,
  TResult extends GetNextType<TBase2, TKey2>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>
>(base: TBase1, keys: [TKey1, TKey2], findCondition: (obj: TResult) => boolean): TResult[]
// @ts-ignore
export function findParentOfNestedValue<
  TBase1,
  TResult extends GetNextType<TBase1, TKey1>,
  TKey1 extends GetKey<TBase1>
>(base: TBase1, keys: [TKey1], findCondition: (obj: TResult) => boolean): TResult[]
export function findParentOfNestedValue<TBase, TResult extends GetType<TBase>>(
  base: TBase,
  keys: [],
  findCondition: (obj: TResult) => boolean
): TResult[] {
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
    // @ts-ignore
    const key = keys[0]
    keys.splice(0, 1)
    // @ts-ignore
    return findParentOfNestedValue(base[key], [...keys], findCondition)
  }
  for (const key in base) {
    if (!base.hasOwnProperty(key)) continue
    // @ts-ignore
    const result = findParentOfNestedValue(base[key], [...keys], findCondition)
    if (result !== undefined) return result
  }
  return undefined
}

// @ts-ignore
export function removeNestedValue<
  TBase1,
  TResult extends GetNextType<TBase4, TKey4>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>,
  TBase4 extends GetNextBase<TBase3, TKey3>,
  TKey4 extends GetKey<TBase4>
>(base: TBase1, keys: [TKey1, TKey2, TKey3, TKey4], findCondition: (obj: TResult) => boolean): void
// @ts-ignore
export function removeNestedValue<
  TBase1,
  TResult extends GetNextType<TBase3, TKey3>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>
>(base: TBase1, keys: [TKey1, TKey2, TKey3], findCondition: (obj: TResult) => boolean): void
// @ts-ignore
export function removeNestedValue<
  TBase1,
  TResult extends GetNextType<TBase2, TKey2>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>
>(base: TBase1, keys: [TKey1, TKey2], findCondition: (obj: TResult) => boolean): void
// @ts-ignore
export function removeNestedValue<TBase1,
  TResult extends GetNextType<TBase1, TKey1>,
  TKey1 extends GetKey<TBase1>>(base: TBase1, keys: [TKey1], findCondition: (obj: TResult) => boolean): void {
  const arr = findParentOfNestedValue(base, keys, findCondition)
  arr.splice(arr.findIndex(findCondition), 1)
}

// @ts-ignore
export function findNestedValue<TBase1,
  TResult extends GetNextType<TBase4, TKey4>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>,
  TBase4 extends GetNextBase<TBase3, TKey3>,
  TKey4 extends GetKey<TBase4>>(
  base: TBase1,
  keys: [TKey1, TKey2, TKey3, TKey4],
  findCondition: (obj: TResult) => boolean
): TResult
// @ts-ignore
export function findNestedValue<TBase1,
  TResult extends GetNextType<TBase3, TKey3>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>,
  TBase3 extends GetNextBase<TBase2, TKey2>,
  TKey3 extends GetKey<TBase3>>(base: TBase1, keys: [TKey1, TKey2, TKey3], findCondition: (obj: TResult) => boolean): TResult
// @ts-ignore
export function findNestedValue<TBase1,
  TResult extends GetNextType<TBase2, TKey2>,
  TKey1 extends GetKey<TBase1>,
  TBase2 extends GetNextBase<TBase1, TKey1>,
  TKey2 extends GetKey<TBase2>>(base: TBase1, keys: [TKey1, TKey2], findCondition: (obj: TResult) => boolean): TResult
// @ts-ignore
export function findNestedValue<TBase1,
  TResult extends GetNextType<TBase1, TKey1>,
  TKey1 extends GetKey<TBase1>>(base: TBase1, keys: [TKey1], findCondition: (obj: TResult) => boolean): TResult
export function findNestedValue<TBase, TResult extends GetType<TBase>>(
  base: TBase,
  keys: [],
  findCondition: (obj: TResult) => boolean
): TResult {
  if (keys.length === 0) {
    if (!Array.isArray(base)) {
      throw new Error("No array on the final level")
    } else {
      return (base as Array<TResult>).find(findCondition)
    }
  }
  if (!base) return undefined
  if (!Array.isArray(base)) {
    // @ts-ignore
    const key = keys[0]
    keys.splice(0, 1)
    // @ts-ignore
    return findNestedValue(base[key], [...keys], findCondition)
  }
  for (const key in base) {
    if (!base.hasOwnProperty(key)) continue
    // @ts-ignore
    const result = findNestedValue(base[key], [...keys], findCondition)
    if (result !== undefined) return result
  }
  return undefined
}
