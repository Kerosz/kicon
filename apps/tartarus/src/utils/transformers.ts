/**
 * @description It deletes specified properties from an object
 *
 * @param rawObjec The object to be transformed
 * @param properties An array of properties to be removed
 */
export function deleteProperty<T extends Record<string, unknown> = Record<string, unknown>>(
  rawObjec: T,
  properties: (keyof T)[]
): void {
  if (!rawObjec) {
    throw new Error("Must pass in an object to be transformed!");
  }
  if (!properties || properties.length === 0) {
    throw new Error("Properties array must contain at least one property!");
  }

  properties.forEach((property) => {
    delete rawObjec[property];
  });
}
