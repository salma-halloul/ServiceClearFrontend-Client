interface Service {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    shortDescription: string;
    categoriesIds: number[];
    categories: Category[];
    visible: boolean;
    images: string[];
}

