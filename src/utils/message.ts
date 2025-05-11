import { App, message as antdMessage } from 'antd';

/**
 * Creates a message API instance using App.useApp() hook
 * This should be used within components to get the message API with context
 *
 * @returns The message API with context
 */
export const useMessage = () => {
  const { message } = App.useApp();
  return message;
};

/**
 * Legacy static message API - only for non-component usage
 * WARNING: Using this outside of a component context might still cause warnings
 * Prefer using useMessage() hook inside components
 */
const messageApi = {
  success: (content: string, duration?: number) => antdMessage.success(content, duration),
  error: (content: string, duration?: number) => antdMessage.error(content, duration),
  info: (content: string, duration?: number) => antdMessage.info(content, duration),
  warning: (content: string, duration?: number) => antdMessage.warning(content, duration),
  loading: (content: string, duration?: number) => antdMessage.loading(content, duration),
  destroy: () => antdMessage.destroy(),
};

// Export both the hook and the legacy API
export default messageApi;
