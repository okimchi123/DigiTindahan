import { Calculator, ShoppingCart, Contact, PhilippinePeso, FileScan } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface act {
    title: String;
    subtitle: String;
    icon: LucideIcon;
    route: String;
}

const Actions: act[] = [
    {
        title:'Calculate Profit',
        subtitle:'input the product details',
        icon:Calculator,
        route:'/calculate-profit'
    },
    {
        title:'Grocery To-do List',
        subtitle:'list the products you need',
        icon:ShoppingCart,
        route:'/grocery-list'
    },
    {
        title:'Customer Credit List',
        subtitle:'record customer with credits',
        icon:Contact,
        route:'/customer-credit'
    },
    {
        title:'Product Price',
        subtitle:'check the current prices',
        icon:PhilippinePeso,
        route:'/product-price'
    },
    {
        title:'Scan Receipt',
        subtitle:'audit your recent receipts',
        icon:FileScan,
        route:'/scan-receipt'
    },
]

export default Actions;