import "i18next";
import type common from "./locales/en/common.json";
import type errors from "./locales/en/error.json";

type DotPrefix<T extends string, P extends string> = `${P}:${T}`;

type FlatKeys<T, Prev extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: FlatKeys<T[K], Prev extends "" ? K : `${Prev}.${K}`>;
    }[keyof T & string]
  : Prev;

type WithNamespace<NS extends string, T> = DotPrefix<FlatKeys<T>, NS>;

type CommonNS = WithNamespace<"common", typeof common>;
type ErrorsNS = WithNamespace<"errors", typeof errors>;

declare module "i18next" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required for declaration merging into i18next module
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: CommonNS;
      errors: ErrorsNS;
    };
  }
}
