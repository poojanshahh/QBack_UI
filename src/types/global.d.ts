type TSFixMe = any;
type TSAny = any; // to be used only when type is not possible
type StringOrNumber = string | number;
type MapOf<T> = { [t: string]: T };
type Maybe<T> = T | undefined | null;
