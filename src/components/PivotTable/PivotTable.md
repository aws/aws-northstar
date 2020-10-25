### Installing additional dependencies

`PivotTable`'s dependencies are listed as peer dependencies so you will need to install them mannually by running the following command.
```bash
npm install react-pivottable@^0.9.0 react-plotly.js@^2.4.0 plotly.js@^1.54.1
```

### Usage
`PivotTable` is only made available through secondary level import so you need to import it as `import PivotTable from 'aws-northstar/components/PivotTable';`.

```jsx
import Container from 'aws-northstar/layouts/Container';
import PivotTable from 'aws-northstar/components/PivotTable';

const salesOrders = [
    {
        customer: 'John',
        product: 'Product 1',
        revenue: 1000,
        month: 'Jan',
        category: 'Category 1'
    },
    {
        customer: 'Jim',
        revenue: 2000,
        product: 'Product 2',
        month: 'Jan',
        category: 'Category 1'
    },
    {
        customer: 'Sarah',
        revenue: 4000,
        product: 'Product 3',
        month: 'Jan',
        category: 'Category 2'
    },
    {
        customer: 'John',
        product: 'Product 2',
        revenue: 1500,
        month: 'Feb',
        category: 'Category 1'
    },
    {
        customer: 'Jim',
        revenue: 2500,
        product: 'Product 2',
        month: 'Feb',
        category: 'Category 1'
    },
    {
        customer: 'Jim',
        revenue: 500,
        product: 'Product 3',
        month: 'Feb',
        category: 'Category 2'
    },
    {
        customer: 'Sarah',
        revenue: 1000,
        product: 'Product 1',
        month: 'Feb',
        category: 'Category 1'
    },
    {
        customer: 'John',
        product: 'Product 1',
        revenue: 1000,
        month: 'Mar',
        category: 'Category 1'
    },
    {
        customer: 'Jim',
        revenue: 2000,
        product: 'Product 2',
        month: 'Mar',
        category: 'Category 1'
    },
    {
        customer: 'Sarah',
        revenue: 4000,
        product: 'Product 3',
        month: 'Mar',
        category: 'Category 2'
    },
];

<Container headingVariant='h4' title='Pivot table with sales orders data set'>
    <PivotTable data={salesOrders}/>
</Container>

```

