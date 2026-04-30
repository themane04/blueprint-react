import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import type { JSX } from "react";

import { useI18n } from "../../hooks";

/**
 * Homepage component that displays a welcome message and a link to the GitHub repository.
 * @returns A centered layout with the blueprint title, description, and GitHub link.
 */
export const Homepage = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="80vh"
      gap="16px"
      px="24px"
      textAlign="center"
    >
      <Heading size="xl">{t("common:homepage.title")}</Heading>

      <Text
        maxW="560px"
        color="text.muted"
      >
        {t("common:homepage.description")}
      </Text>

      <Link
        href="https://github.com/themane04/blueprint-react"
        isExternal
      >
        {t("common:homepage.github")}
      </Link>
    </Flex>
  );
};
