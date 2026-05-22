import { Button, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import type { JSX } from "react";

import { useI18n, useLanguage } from "../../hooks";

/**
 * Homepage component that displays a welcome message, a link to the GitHub
 * repository, and a language switcher demonstrating the i18n setup.
 * @returns A centered layout with the blueprint title, description, GitHub link, and language buttons.
 */
export const Homepage = (): JSX.Element => {
  const { t } = useI18n();
  const { currentLang, availableLangs, setLanguage } = useLanguage();

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
      {/* Title */}
      <Heading size="xl">{t("common:homepage.title")}</Heading>

      {/* Description */}
      <Text
        maxW="560px"
        color="text.muted"
      >
        {t("common:homepage.description")}
      </Text>

      {/* GitHub link */}
      <Link
        href="https://github.com/themane04/blueprint-react"
        isExternal
      >
        {t("common:homepage.github")}
      </Link>

      {/* Language switcher — remove or replace once your app has a proper nav */}
      <HStack mt="8px">
        {availableLangs.map((lang) => (
          <Button
            key={lang}
            variant={currentLang === lang ? "solid" : "ghost"}
            size="sm"
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </HStack>
    </Flex>
  );
};
