### Examples

```jsx
import BreadcrumbGroup from 'aws-northstar/components/BreadcrumbGroup';
import Container from 'aws-northstar/layouts/Container';
import { MemoryRouter } from 'react-router';

<Container headingVariant='h4' title='With items'>
  <MemoryRouter>
    <BreadcrumbGroup items={[
      {text:"first", href:"#first"},
      {text:"second", href:"#second"},
      {text:"last", href:"#last"}]}
    />
  </MemoryRouter>
</Container>
```

```jsx
import BreadcrumbGroup from 'aws-northstar/components/BreadcrumbGroup';
import Container from 'aws-northstar/layouts/Container';
import { MemoryRouter } from 'react-router';

<Container headingVariant='h4' title='Without items (uses current route)'>
  <MemoryRouter initialEntries={['the/current/route/']}>
    <BreadcrumbGroup />
  </MemoryRouter>
</Container>
```