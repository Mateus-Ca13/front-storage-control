import { useSettingsStore } from "../../features/settings/stores/SettingsStore";

type ToastType = 'success' | 'error' | 'warning' | 'info';

const soundEffects: Record<ToastType, HTMLAudioElement> = {
    success: new Audio('/sounds/success.mp3'),
    error: new Audio('/sounds/error.mp3'),
    warning: new Audio('/sounds/warn.mp3'),
    info: new Audio('/sounds/info.mp3'),
};

// Ajuste de volumes individuais (opcional)
soundEffects.success.volume = 0.5;
soundEffects.error.volume = 0.4;

export const playToastSound = (type: ToastType) => {
    // 2. O Pulo do Gato: Acessamos a store diretamente (sem hook)
    // getState() permite ler o valor atual mesmo fora de um componente React
    const { audioFeedback } = useSettingsStore.getState();

    // Se o usuário desativou os sons, paramos aqui.
    if (!audioFeedback) return;

    const sound = soundEffects[type];

    if (sound) {
        // Reinicia o tempo para 0 caso o som já esteja tocando (spam de cliques)
        sound.currentTime = 0;
        
        // Toca o som e trata erro de autoplay (comum em navegadores modernos)
        sound.play().catch((e) => {
            console.warn("Navegador bloqueou o som (interação necessária):", e);
        });
    }
};