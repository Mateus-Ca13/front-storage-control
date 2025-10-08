import type { CategoriesSearchFiltersProps } from "../../features/category/pages/CategoriesPage";
import type { MovementsSearchFiltersProps } from "../../features/movement/pages/MovementsPage";
import type { ProductsSearchFiltersProps } from "../../features/products/pages/ProductsPage";
import type { StocksSearchFiltersProps } from "../../features/stocks/pages/StocksPage";
import type { UsersSearchFiltersProps } from "../../features/users/pages/UserPage";

export function persistProductSearchFilter(productSearchFilter:  Partial<ProductsSearchFiltersProps>) {
    let defaultSearch: ProductsSearchFiltersProps = {
        categoriesIds: [],
        isBelowMinStock: false,
        orderBy: 'asc',
        sortBy: 'name',
        hasNoCodebar: false,
        stockId: undefined
    }
    const searchFilter = {
        ...defaultSearch,
        ...productSearchFilter
    }
    sessionStorage.setItem('productSearchFilters', JSON.stringify(searchFilter));
}


export function persistStockSearchFilter(stockSearchFilter:  Partial<StocksSearchFiltersProps>) {
    let defaultSearch: StocksSearchFiltersProps = {
        orderBy: 'asc',
        sortBy: 'name',
        type: null,
    }
    const searchFilter = {
        ...defaultSearch,
        ...stockSearchFilter
    }
    sessionStorage.setItem('stockSearchFilters', JSON.stringify(searchFilter));
}

export function persistMovementSearchFilter(movementSearchFilter:  Partial<MovementsSearchFiltersProps>) {
    let defaultSearch: MovementsSearchFiltersProps = {
        orderBy: 'asc',
        sortBy: 'createdAt',
        type: null,
        sentFrom: null,
        sentTo: null,
        userId: null
    }
    const searchFilter = {
        ...defaultSearch,
        ...movementSearchFilter
    }
    sessionStorage.setItem('movementSearchFilters', JSON.stringify(searchFilter));   
}


export function persistCategorySearchFilter(categorySearchFilter:  Partial<CategoriesSearchFiltersProps>) {
    let defaultSearch: CategoriesSearchFiltersProps = {
        orderBy: 'asc',
        sortBy: 'name',
    }
    const searchFilter = {
        ...defaultSearch,
        ...categorySearchFilter
    }
    sessionStorage.setItem('categorySearchFilters', JSON.stringify(searchFilter));
}

export function persistUserSearchFilter(userSearchFilter: UsersSearchFiltersProps) {
    let defaultSearch: UsersSearchFiltersProps = {
        orderBy: 'asc',
        sortBy: 'name',
    }
    const searchFilter = {
        ...defaultSearch,
        ...userSearchFilter
    }
    sessionStorage.setItem('userSearchFilters', JSON.stringify(searchFilter));
}