import { create } from "zustand";

export type ShortcutMap = Record<string, (event: KeyboardEvent) => void>;

type ContextListener = {
  id: string;
  shortcuts: ShortcutMap;
  priority: number;
};

interface ShortcutContextStore {
  contextStack: ContextListener[]; 
  pushContext: (shortcuts: ShortcutMap, priority: number) => string;
  popContext: (id: string) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}

export const useShortcutContextStore = create<ShortcutContextStore>((set, get) => ({
  contextStack: [],
  
  pushContext: (shortcuts, priority) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    
    const newContext = { id, shortcuts, priority };
    
    set(state => {
      const newStack = [...state.contextStack, newContext]
        // REORDENAÇÃO BRUTAL: Prioridade mais alta (maior número) vai para o final.
        .sort((a, b) => a.priority - b.priority); 
        
      return {
        contextStack: newStack
      };
    });
    
    return id;
  },

  popContext: (id) => {
    set(state => ({
      contextStack: state.contextStack.filter(c => c.id !== id)
    }));
  },

  handleKeyDown: (event) => {
    
    const { contextStack } = get();
    
    // Pegamos o último item da pilha (o de MAIOR prioridade)
    const activeContext = contextStack[contextStack.length - 1];

    if (!activeContext) {
      return; 
    }

    // Verifica se a tecla existe no mapa do CONTEXTO DE MAIOR PRIORIDADE
    const action = activeContext.shortcuts[event.key];

    if (action) {
      event.preventDefault(); 
      action(event);
    }
  }
}));