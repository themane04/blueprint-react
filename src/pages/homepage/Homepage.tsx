import { Text } from "@chakra-ui/react";
import type { JSX } from "react";

import { useI18n } from "../../hooks/useI18n.ts";

export const Homepage = (): JSX.Element => {
  const { t } = useI18n();
  return <Text>{t("common:homepageText")}</Text>;
};
