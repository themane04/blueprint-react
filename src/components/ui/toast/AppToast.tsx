import { Alert, AlertDescription, Icon } from '@chakra-ui/react';
import { TOAST_STATUS_COLORS, TOAST_STATUS_ICONS } from '../../../theme/constants.ts';
import type { AppToastProps } from './types.ts';

export const AppToast = ({ status = 'info', description }: AppToastProps) => {
  const color = TOAST_STATUS_COLORS[status];
  const IconComponent = TOAST_STATUS_ICONS[status];

  return (
    <Alert
      bg="red.500"
      borderRadius="button"
      gap={1}
      boxShadow="md"
      alignItems="center"
    >
      <Icon
        as={IconComponent}
        fill={color}
      />

      <AlertDescription
        color="white"
        fontSize="sm"
      >
        {description}
      </AlertDescription>
    </Alert>
  );
};
