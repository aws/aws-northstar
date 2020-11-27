### Examples

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';

<Box width='350px'>
    <Card title="Text content" subtitle="sub title" >
        Text Content
    </Card>
</Box>
```

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';
import Placeholder from 'aws-northstar/components/Placeholder';

<Box width='350px'>
    <Card title="Fix content" subtitle="sub title">
        <Placeholder/>
    </Card>
</Box>
```

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';
import ExpandableSection from 'aws-northstar/components/ExpandableSection';

<Box width='350px'>
    <Card title="Expandable Content" subtitle="sub title">
        <ExpandableSection variant="borderless" header='expandableContent'>
            Expandable Content
        </ExpandableSection>
    </Card>
</Box>
```

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';

<Box width='350px'>
    <Card title="Card title" subtitle="sub title" withHover>
        Text content
    </Card>
</Box>
```

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';

<Box width="350px">
    <Card title="Card title" subtitle="sub title" onClick={() => alert('A card was clicked')}>
        Show an alert when clicked
    </Card>
</Box>
```

```jsx
import Card from 'aws-northstar/components/Card';
import Container from 'aws-northstar/layouts/Container';
import Box from 'aws-northstar/layouts/Box';

<Box width='350px'>
    <Card
        title="Custom Card Title"
        subtitle="sub title"
        titleTypographyProps={{ variant: 'h2', color: 'secondary', align: 'right', gutterBottom: true }}
    >
        Text content
    </Card>
</Box>
```