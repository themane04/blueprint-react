import type { useI18n } from "../hooks";

export type TType = ReturnType<typeof useI18n>["t"];

export type TTypeReturn = Record<string, string>;

export type GeneralStatusType = "success" | "error" | "warning" | "info";
