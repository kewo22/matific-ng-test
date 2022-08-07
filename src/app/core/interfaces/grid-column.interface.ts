export interface GridColumn {
    text: string;
    key: string;
    sort: GridColumnSort;
}

interface GridColumnSort {
    type: 'asc' | 'desc' | 'none';
    isEnabled: boolean;
}