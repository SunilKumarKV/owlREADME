import { AIProvider } from './types';

const providersMap = new Map<string, AIProvider>();

/**
 * Registers an AI Provider dynamically.
 */
export const registerProvider = (provider: AIProvider): void => {
  providersMap.set(provider.id, provider);
};

/**
 * Unregisters an AI Provider dynamically.
 */
export const unregisterProvider = (id: string): void => {
  providersMap.delete(id);
};

/**
 * Resolves an AI Provider by its unique identifier.
 */
export const getProvider = (id: string): AIProvider | undefined => {
  return providersMap.get(id);
};

/**
 * Returns a list of all registered AI Providers.
 */
export const getProviders = (): readonly AIProvider[] => {
  return Array.from(providersMap.values());
};
