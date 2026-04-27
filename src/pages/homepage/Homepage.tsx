import { Text } from "@chakra-ui/react";
import type { JSX } from "react";

import { useI18n } from "../../hooks";

/**
 * Homepage component that displays a welcome message.
 * @returns A JSX element containing the translated homepage text.
 */
export const Homepage = (): JSX.Element => {
  const { t } = useI18n();
  return <Text>{t("common:homepageText")}</Text>;
};
