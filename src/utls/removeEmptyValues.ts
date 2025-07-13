export const removeEmptyValues = <T> (object: Record<string, T | undefined | null>): Record<string, T> =>
    Object.fromEntries(Object.entries(object).filter(([, v]) => !!v)) as Record<string, T>;