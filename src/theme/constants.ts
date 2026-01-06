import { Icons } from './icons';

export const TOAST_STATUS_COLORS = {
  success: 'success.500',
  error: 'error.500',
  warning: 'warning.500',
  info: 'info.500',
  loading: 'brand.500',
} as const;

export const TOAST_STATUS_ICONS = {
  success: Icons.toastSuccess,
  error: Icons.toastError,
  warning: Icons.toastWarning,
  info: Icons.info,
  loading: Icons.toastLoading,
} as const;
