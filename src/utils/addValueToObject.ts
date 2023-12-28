export function addValueToObject(
  object: Record<string, string>,
  key: string,
  value: string
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [mainKey, _] of Object.entries(object)) {
    if (mainKey === key) {
      object[mainKey] = value;
      return;
    }
  }
  object[key] = value;
}