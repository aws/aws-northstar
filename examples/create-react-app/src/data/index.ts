type Order = {
    customer: string;
    amount: number;
    discountAmount: number;
    item: string;
    date: string;
    discounted: boolean;
    status: string;
}

const data: Order[] = [
    {
        customer: 'John',
        amount: 1000,
        discountAmount: 500,
        item: 'Item 1',
        date: '2020/01/02',
        discounted: true,
        status: 'Delivered'
    },
    {
        customer: 'John',
        amount: 500,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/04/01',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'John',
        amount: 2500,
        discountAmount: 50,
        item: 'Item 2',
        date: '2020/05/06',
        discounted: true,
        status: 'Delivered'
    },
    {
        customer: 'Jim',
        amount: 2000,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/02',
        discounted: false,
        status: 'Canceled'
    },
    {
        customer: 'Sarah',
        amount: 100,
        discountAmount: 0,
        item: 'Item 1',
        date: '2019/12/04',
        discounted: false,
        status: 'Returned'
    },
    {
        customer: 'Kim',
        amount: 100,
        discountAmount: 10,
        item: 'Item 2',
        date: '2020/05/06',
        discounted: true,
        status: 'Delivered'
    },
    {
        customer: 'Sarah',
        amount: 2000,
        discountAmount: 0,
        item: 'Item 1',
        date: '2019/12/04',
        discounted: false,
        status: 'Processing'
    },
    {
        customer: 'Kim',
        amount: 1300,
        discountAmount: 0,
        item: 'Item 3',
        date: '2019/11/10',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'Kim',
        amount: 200,
        discountAmount: 0,
        item: 'Item 4',
        date: '2019/11/08',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'Liam',
        amount: 200,
        discountAmount: 0,
        item: 'Item 2',
        date: '2020/03/08',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'Liam',
        amount: 230,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/10',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'Liam',
        amount: 199,
        discountAmount: 15,
        item: 'Item 3',
        date: '2020/04/10',
        discounted: true,
        status: 'Delivered'
    },
    {
        customer: 'Liam',
        amount: 500,
        discountAmount: 130,
        item: 'Item 4',
        date: '2020/05/10',
        discounted: true,
        status: 'Processing'
    },
    {
        customer: 'Liam',
        amount: 200,
        discountAmount: 0,
        item: 'Item 2',
        date: '2020/03/08',
        discounted: false,
        status: 'Delivered'
    },
    {
        customer: 'Liam',
        amount: 230,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/20',
        discounted: false,
        status: 'Delivered'
    },
];

type Account = {
    item: string;
    amount: number;
    discount: number;
}

const sumByItem: Account[] = data.reduce((acc: Account[], order: Order) => {
    const item = acc.find(i => i.item === order.item);
    if (!item) {
        acc.push({amount: order.amount, item: order.item, discount: order.discountAmount});
    } else {
        item.amount += order.amount;
        item.discount += order.discountAmount;
    }
    return acc;
}, []);

sumByItem.sort((a, b) => (a.amount > b.amount) ? 1 : -1);

interface DateData {
    date: string;
    amount: number;
    discount: number;
}

const sumByDate: DateData[] = data.reduce((acc: DateData[], order) => {
    const date = acc.find(i => i.date === order.date);
    if (!date) {
        acc.push({amount: order.amount, date: order.date, discount: order.discountAmount});
    } else {
        date.amount += order.amount;
        date.discount += order.discountAmount;
    }

    return acc;
}, []);

sumByDate.sort((a, b) => (a.date > b.date) ? 1 : -1);

export default data;
export {
    sumByItem,
    sumByDate
};
