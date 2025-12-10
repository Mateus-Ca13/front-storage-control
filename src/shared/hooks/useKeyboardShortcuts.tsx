import { useEffect } from "react";
import { useShortcutContextStore, type ShortcutMap } from "../store/keyboardShortcutsStore";

export function useKeyboardShortcuts(shortcuts: ShortcutMap, priority: number = 0) {
  const { pushContext, popContext } = useShortcutContextStore.getState();
  
  useEffect(() => {
    if (Object.keys(shortcuts).length === 0) return;

    const contextId = pushContext(shortcuts, priority);
    
    return () => {
      popContext(contextId);
    };
  }, [shortcuts, priority, pushContext, popContext]);
}