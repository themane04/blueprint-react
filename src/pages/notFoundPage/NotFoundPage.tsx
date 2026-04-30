import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../hooks";
import { paths } from "../../router/routes/utils";

/**
 * 404 Not Found page displayed when a user navigates to a non-existent route.
 * @returns A centered layout with a not found message and a button to return home.
 */
export const NotFoundPage = (): JSX.Element => {
  const { t } = useI18n();
  const navigate = useNavigate();

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
      <Heading size="4xl">404</Heading>

      <Heading size="lg">{t("common:notFound.title")}</Heading>

      <Text
        maxW="400px"
        color="text.muted"
      >
        {t("common:notFound.description")}
      </Text>

      <Button
        variant="primary"
        onClick={() => navigate(paths.public.root)}
      >
        {t("common:notFound.cta")}
      </Button>
    </Flex>
  );
};
