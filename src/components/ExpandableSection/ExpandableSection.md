### Examples

```jsx
import ExpandableSection from 'aws-northstar/components/ExpandableSection';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Default">
    <ExpandableSection header="Header">Expandable content</ExpandableSection>  
</Container>
```

```jsx
import ExpandableSection from 'aws-northstar/components/ExpandableSection';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Borderless">
    <ExpandableSection variant="borderless" header="Header">Expandable content</ExpandableSection>  
</Container>
```

```jsx
import ExpandableSection from 'aws-northstar/components/ExpandableSection';

<ExpandableSection variant="container" header="Container">
    Expandable content
</ExpandableSection>
```
