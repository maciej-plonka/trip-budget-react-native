export const findBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): Type | undefined => {
    return collection.find(it => it[key] as Value === value);
};
export const filterBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): Readonly<Type[]> => {
    return collection.filter(it => it[key] as Value === value);
};

export const filterOutBy =<Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): Readonly<Type[]> => {
    return collection.filter(it => it[key] as Value !== value);
}

export const existsBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): boolean => {
    return collection.some(it => it[key] as Value === value);
}

export const sumBy = <Type>(collection: Readonly<Type[]>, mapper: (type: Type) => number): number => {
    return collection.map(mapper).reduce((a, b) => a + b, 0);
}
