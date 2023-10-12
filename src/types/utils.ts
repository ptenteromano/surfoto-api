// This came from: https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required
type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
export type LocationOrEmpty = Either<Location, {}>;
export type platforms = "ios" | "android" | "windows" | "macos" | "web";
