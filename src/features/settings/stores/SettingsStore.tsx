import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
    theme: 'light' | 'dark';
    denseTables: boolean;
    simplifiedInterface: boolean;
    defaultOriginStockId: number | null;
    defaultPaginationRows: 10 | 20 | 50 | 100;
    audioFeedback: boolean;
};

type useSettingsStoreProps = SettingsState & {
    setSettings: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
};

export const useSettingsStore = create<useSettingsStoreProps>()(
    persist(
        (set) => ({
            theme: 'light',
            denseTables: false,
            simplifiedInterface: false,
            defaultOriginStockId: null,
            defaultPaginationRows: 20,
            audioFeedback: true,

            setSettings: (key, value) => {
                set((state) => ({
                    ...state,
                    [key]: value
                }));
            },
        }),
        {
            name: 'device-settings', 
            storage: createJSONStorage(() => localStorage),
        }
    )
);