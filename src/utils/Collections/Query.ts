export const findBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: ReadonlyArray<Type>, key: Key, value: Value): Type | undefined => {
    return collection.find(it => it[key] as Value === value);
};
export const filterBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: ReadonlyArray<Type>, key: Key, value: Value): ReadonlyArray<Type> => {
    return collection.filter(it => it[key] as Value === value);
};

export const filterOutBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: ReadonlyArray<Type>, key: Key, value: Value): ReadonlyArray<Type> => {
    return collection.filter(it => it[key] as Value !== value);
}

export const existsBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: ReadonlyArray<Type>, key: Key, value: Value): boolean => {
    return collection.some(it => it[key] as Value === value);
}

export const sumBy = <Type>(collection: ReadonlyArray<Type>, mapper: (type: Type) => number): number => {
    return collection.map(mapper).reduce((a, b) => a + b, 0);
}

export const sortBy = <Type, Comparable>(collection: ReadonlyArray<Type>, mapper: (type: Type) => Comparable, sort: (left: Comparable, right: Comparable) => number): ReadonlyArray<Type> => {
    return [...collection].sort((left, right) => sort(mapper(left), mapper(right)))
}
