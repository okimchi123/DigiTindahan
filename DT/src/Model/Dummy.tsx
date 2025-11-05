interface props{
    id: number;
    product: string;
    productQTY: number;
    checked: boolean;
}

const GroceryDummy:props[]=[
    {
        id: 123,
        product: 'Piatos',
        productQTY: 10,
        checked: true,
    },
    {
        id: 124,
        product: 'Martis',
        productQTY: 8,
        checked: false,
    }
]

export default GroceryDummy;