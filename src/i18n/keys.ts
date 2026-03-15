import type common from "./locales/en/common.json";
import type errors from "./locales/en/error.json";

/**
 * Flatten nested JSON keys into "a.b.c" strings.
 */
type FlatKeys<T, Prev extends string = ""> = T extends string | number | boolean | null
  ? Prev
  : T extends object
    ? {
        [K in keyof T & string]: FlatKeys<T[K], Prev extends "" ? K : `${Prev}.${K}`>;
      }[keyof T & string]
    : never;

type CommonFlat = FlatKeys<typeof common>;
type ErrorsFlat = FlatKeys<typeof errors>;

export type CommonKey = `common:${CommonFlat}`;
export type ErrorKey = `error:${ErrorsFlat}`;

export type AnyI18nKey = CommonKey | ErrorKey;
