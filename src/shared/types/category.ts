
export type iCategory = {
    id: number;
    name: string;
    colorPreset: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface iCategoryColumnConfig {
    id: number
    name: string
    colorPreset: number
    actions: null
    linkedProducts: number
} 