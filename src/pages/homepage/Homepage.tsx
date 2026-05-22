import { Button, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import type { JSX } from "react";

import {
  type ThemePreference,
  useI18n,
  useLanguage,
  useThemePreference
} from "../../hooks";

/**
 * Homepage component that displays a welcome message, a link to the GitHub
 * repository, a language switcher, and a theme toggle — demonstrating the
 * i18n and color mode systems built into the blueprint.
 * @returns A centered layout with the blueprint title, description, GitHub link, language buttons, and theme buttons.
 */
export const Homepage = (): JSX.Element => {
  const { t } = useI18n();
  const { currentLang, availableLangs, setLanguage } = useLanguage();
  const { preference, setPreference } = useThemePreference();

  const themeOptions: ThemePreference[] = ["light", "dark", "system"];

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

      {/* Theme switcher — remove or replace once your app has a proper nav */}
      <HStack>
        {themeOptions.map((option) => (
          <Button
            key={option}
            variant={preference === option ? "solid" : "ghost"}
            size="sm"
            onClick={() => setPreference(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Button>
        ))}
      </HStack>
    </Flex>
  );
};
