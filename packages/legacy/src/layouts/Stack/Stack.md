### Examples

```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Default' subtitle='spacing=m=20px'>
    <Stack>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```

```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='No spacing' subtitle='spacing=none=0px'>
    <Stack spacing='none'>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```


```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Extra small spacing' subtitle='spacing=xs=5px'>
    <Stack spacing='xs'>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```


```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Small spacing' subtitle='spacing=s=10px'>
    <Stack spacing='s'>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```

```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Large spacing' subtitle='spacing=l=40px'>
    <Stack spacing='l'>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```


```jsx
import Stack from 'aws-northstar/layouts/Stack';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Extra large spacing' subtitle='spacing=xl=80px'>
    <Stack spacing='xl'>
        <Placeholder/>
        <Placeholder/>
        <Placeholder/>
    </Stack>
</Container>
```