import type { UserRoleType } from "../../features/auth/types/user";
import type { ProductMeasurementType } from "../types/product";
import type { StockStatusType, StockType } from "../types/stock";

export function formatMovementType(type: 'TRANSFER' | 'ENTRY' | 'EXIT'): string {
    switch (type) {
        case 'TRANSFER':
            return 'Transferência';
        case 'ENTRY':
            return 'Entrada';
        case 'EXIT':
            return 'Saída';
    }
}

export function formatTimestamp(input: string | Date, mode: "full" | "short" = "full"): string {

    input
    const date = input instanceof Date ? input : new Date(input);

    const fullOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const shortOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  return date.toLocaleString("pt-BR", mode === "full" ? fullOptions : shortOptions);
}

export function formatPrice(price: number | string): string{
    if (price === null || price === undefined || price === "") return "0,00";
    const num = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(num)) return "0,00";
    return num.toFixed(2).replace(".", ",");
}

export function formatStockType (type: StockType){
    switch (type) {
        case 'CENTRAL':
            return 'Central';
        case 'SECONDARY':
            return 'Secundário';
        default:
            return 'Central';
    }
}

export function formatStockStatus (status: StockStatusType) {
    switch (status) {
        case 'ACTIVE':
            return 'Ativo';
        case 'MAINTENANCE':
            return 'Em manutenção';
        case 'INACTIVE':
            return 'Inativo';
        default:
            return 'Ativo';
    }

}

export function formatUserRole(role: UserRoleType){
    switch (role) {
        case 'ADMIN':
            return 'Administrador';
        case 'USER':
            return 'Usuário';
        case 'SUPER_ADMIN':
            return 'Super Administrador';
        default:
            return 'Usuário';
    }
}

export function formatMeasurementUnit(unit: ProductMeasurementType, type: 'singular' | 'plural' = 'singular'){
    switch (unit) {
        case 'UN':
            return type === 'singular' ? 'Unidade' : 'Unidade(s)';
        case 'KG':
            return type === 'singular' ? 'Quilograma' : 'Quilograma(s)';
        case 'L':
            return type === 'singular' ? 'Litro' : 'Litro(s)';
        case 'M':
            return type === 'singular' ? 'Metro' : 'Metro(s)';
        default:
            return type === 'singular' ? 'Unidade' : 'Unidade(s)';
    }
}


export function formatStringToMaxLength(str: string | undefined | null, maxLength: number): string {
    if (!str) return '';
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}


export function formatCurrency (value: string) {
          if (!value) return "0,00";
            const numeric = Number(value).toFixed(2)
          return numeric.replace(".", ",");
      }
