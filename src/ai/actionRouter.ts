import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { getTool } from './toolRegistry';

export type ArcoirisAction = {
  name: string;
  parameters?: Record<string, unknown>;
};

export type ActionResult =
  | { ok: true; action: string; route?: keyof RootStackParamList; requiresConfirmation?: boolean }
  | { ok: false; error: string };

/**
 * Executes only actions declared in toolRegistry. The model must never provide
 * executable JavaScript or arbitrary native commands.
 */
export function executeArcoirisAction(
  action: ArcoirisAction,
  navigation: NavigationProp<RootStackParamList>,
  options?: { confirmed?: boolean },
): ActionResult {
  const tool = getTool(action.name);
  if (!tool) return { ok: false, error: 'Acción no permitida.' };

  if (tool.requiresConfirmation && !options?.confirmed) {
    return { ok: true, action: tool.name, route: tool.route as keyof RootStackParamList | undefined, requiresConfirmation: true };
  }

  if (tool.route && tool.route in navigation.getState().routeNames.reduce<Record<string, true>>((acc, name) => { acc[name] = true; return acc; }, {})) {
    navigation.navigate(tool.route as keyof RootStackParamList);
  }

  return { ok: true, action: tool.name, route: tool.route as keyof RootStackParamList | undefined };
}
