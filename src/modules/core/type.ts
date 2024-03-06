export interface CoreState {
    isInited: boolean;
    isLoading: false;
    entities: SearchResult|null;
    currentEntity: null;
    total: number;
    perPage: number;
    page: number;
}

export interface SearchResult {
    objects: ItemObject[];
}

export interface ItemSearchResult {
    package: PackageObject;
}

export interface PackageObject {
    author: object;
    date: string;
    description: string;
    links: object;
    name: string;
    version: string
}
