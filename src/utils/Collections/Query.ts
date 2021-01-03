export const findBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): Type | undefined => {
    return collection.find(it => it[key] as Value === value);
};
export const filterBy = <Type, Key extends keyof Type, Value extends Type[Key]>(collection: Readonly<Type[]>, key: Key, value: Value): Readonly<Type[]> => {
    return collection.filter(it => it[key] as Value === value);
};
