// TODO: Add to personal utils submodule
export function getKeyByValue<Value, Type extends Record<string, Value>>(
    object: Type,
    value: Value,
): keyof Type | undefined {
    return Object.keys(object).find(key => object[key] === value);
}
