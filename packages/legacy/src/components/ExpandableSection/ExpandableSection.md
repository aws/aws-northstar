### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-expandablesection--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

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
