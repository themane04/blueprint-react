import type common from "./locales/en/common.json";

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

export type CommonKey = `common:${CommonFlat}`;

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type AnyI18nKey = CommonKey;
