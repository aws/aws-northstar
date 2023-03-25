### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-treeview--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import Container from 'aws-northstar/layouts/Container';

const treeItem = {
    id: '1',
    label: 'root',
    children: [
        {
            id: '2',
            label: 'Child 1',
            children: [
                {
                    id: '3',
                    label: 'Child 1.1',
                },
            ],
        },
        {
            id: '4',
            label: 'Child 2',
        },
    ],
};

<>
    <Container headingVariant='h4' title='Default'>
        <TreeView root={treeItem} defaultExpanded={['1']} onNodeSelect={(node) => console.log('selected node', node)} />
    </Container>

    <Container headingVariant='h4' title='With Default Selected'>
        <TreeView
            root={treeItem}
            defaultExpanded={['1']}
            onNodeSelect={(node) => console.log('selected node', node)}
            defaultSelected={['4']}
        />
    </Container>

    <Container headingVariant='h4' title='Multi Select'>
        <TreeView root={treeItem} defaultExpanded={['1']} onNodeSelect={(node) => console.log('selected node', node)} multiSelect />
    </Container>
</>
```