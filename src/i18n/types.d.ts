import "i18next";
import type auth from "./locales/en/auth.json";
import type common from "./locales/en/common.json";
import type errors from "./locales/en/error.json";
import type library from "./locales/en/library.json";
import type setting from "./locales/en/setting.json";
import type video from "./locales/en/video.json";

type DotPrefix<T extends string, P extends string> = `${P}:${T}`;

type FlatKeys<T, Prev extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: FlatKeys<T[K], Prev extends "" ? K : `${Prev}.${K}`>;
    }[keyof T & string]
  : Prev;

type WithNamespace<NS extends string, T> = DotPrefix<FlatKeys<T>, NS>;

type AuthNS = WithNamespace<"auth", typeof auth>;
type CommonNS = WithNamespace<"common", typeof common>;
type ErrorsNS = WithNamespace<"errors", typeof errors>;
type VideoNS = WithNamespace<"video", typeof video>;
type SettingNS = WithNamespace<"setting", typeof setting>;
type LibraryNS = WithNamespace<"library", typeof library>;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "auth";
    resources: {
      auth: AuthNS;
      common: CommonNS;
      errors: ErrorsNS;
      video: VideoNS;
      setting: SettingNS;
      library: LibraryNS;
    };
  }
}
