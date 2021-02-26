### Examples

```jsx
import MarkdownViewer from '.';
import Container from 'aws-northstar/layouts/Container';

<MarkdownViewer># This is a test </MarkdownViewer>
```


```jsx
import MarkdownViewer from '.';
import Container from 'aws-northstar/layouts/Container';

<MarkdownViewer title="MarkdownViewer" subtitle="With a nice container"> # This is a test </MarkdownViewer>
```

```jsx
import MarkdownViewer from '.';
import Container from 'aws-northstar/layouts/Container';



<MarkdownViewer>
{`
# Something with a little more ?
## Or a little less 
### Taking it down
#### Even further

A paragraph with *emphasis* and **strong importance**.

We can celebrate with emoticons 🍸🌟🍺

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

### Lists
* [ ] todo
* [x] done

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2  | 3  |  4  |


`
}
</MarkdownViewer>
```

```jsx
import MarkdownViewer from '.';
import Container from '../../layouts/Container';
import Inline from '../../layouts/Inline';
import Button from '../Button';

const actionGroup = ()=>  (
    <Inline spacing={'s'}>
        <Button variant="primary" label="refresh">Refresh</Button>
        <Button variant="default" label="clear"> Clear </Button>
    </Inline>
);


<MarkdownViewer title="MarkdownViewer" subtitle="With a nice container" actionGroup={actionGroup()}> 
{`### Action groups can also be used

Make your containers more featureful by using action groups.

\`\`\`jsx
 <Inline spacing={'s'}>
    <Button variant="primary" label="refresh"> Refresh </Button>
    <Button variant="primary" label="clear"> Clear </Button>
</Inline>
\`\`\`
`}
</MarkdownViewer>
```