import { useNavigate } from 'react-router-dom';

// Componente para vincular o hook useNavigate a uma ref global (utilização fora de React FCs)

export let navigate: ((to: string, options?: { replace?: boolean; state?: any }) => void) | null = null;

export function RouterNavigator () {
    const navigator = useNavigate();
    navigate = navigator;

    return null;
};