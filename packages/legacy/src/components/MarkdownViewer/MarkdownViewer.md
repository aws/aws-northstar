### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-markdownviewer--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import MarkdownViewer from '.';

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

<MarkdownViewer> 
{`### Code Examples

\`\`\`jsx
<Inline spacing={'s'}>
    <Button variant="primary" label="refresh"> Refresh </Button>
    <Button variant="primary" label="clear"> Clear </Button>
</Inline>
\`\`\`
`}
</MarkdownViewer>
```