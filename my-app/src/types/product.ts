type Product = {
    id: number;
    name: string;
    price: {
        main: number;
        fractional: number;
    };
};

export { type Product };