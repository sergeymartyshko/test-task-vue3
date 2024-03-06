export interface StateInterface {
    entities: PackageInterface[];
    currentEntity: CurrentEntityInterface|null;
    total: number;
    perPage: number;
    page: number;
}

export interface CurrentEntityInterface {
    name: string;
    description: string;
    versions: object;
    tags: object;
    hitsTotal: number;
    bandWidth: number|string;
}

export interface PackageInterface {
    author: AuthorInterface;
    date: string;
    description: string;
    links: LinksInterface;
    maintainers: MaintainersInterface[];
    name: string;
    publisher: PublisherInterface;
    scope: string;
    version: string;
}

export interface AuthorInterface {
    name: string;
    email: string;
}

export interface LinksInterface {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
}

export interface MaintainersInterface {
    username: string;
    email: string;
}

export interface PublisherInterface {
    username: string;
    email: string;
}
