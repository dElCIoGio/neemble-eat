export interface GetTopOrdersProps {
    restaurantId: string;
}

export interface GetRestaurantProps {
    restaurantId: string | undefined;
}

export interface GetAllTablesProps {
    restaurantId: string;
}

export interface GetAllOrdersProps {
    restaurantID: string
}

export interface AddTableProps {
    restaurantID: string;
}

export interface RemoveTableProps {
    restaurantID: string;
    tableId: string;
}