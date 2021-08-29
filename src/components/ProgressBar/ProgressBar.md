### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/progressbar" target="_blank">NorthStar Storybook</a>.

```jsx
import ProgressBar from 'aws-northstar/components/ProgressBar';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';
<Stack>
    <Container headingVariant='h4' title="Progress bar with 60% completion">
        <ProgressBar value={60} label="Progress bar label" description="Progress bar description" additionalInfo="Additional Info"/>
    </Container>

    <Container headingVariant='h4' title="Completed progress bar">
        <ProgressBar label="Progress bar completed" />
    </Container>

    <Container headingVariant='h4' title="Circular progress bar">
        <ProgressBar label="Circular progress bar completed" variant={'circular'} value={100} displayValue={true} />
        <ProgressBar label="Circular progress bar empty" variant={'circular'} value={0} displayValue={true} />
    </Container>
</Stack>    
```

```jsx
import ProgressBar from 'aws-northstar/components/ProgressBar';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';
<Stack>
    <Container headingVariant='h4' title="Vanilla Error">
        <ProgressBar status="error" label="Error Progress bar" />
    </Container>

    <Container headingVariant='h4' title="Error with result text">
        <ProgressBar status="error" label="Error Progress bar with text" resultText="Error loading service" description="Progress bar description" additionalInfo="Additional Info"/>
    </Container>

    <Container headingVariant='h4' title="Error with result text and button">
        <ProgressBar status="error" label="Error Progress bar with text and button" resultText="Error loading service" resultButtonText="Retry" resultButtonClick={()=>{}} />
    </Container>

</Stack>
```

```jsx
import ProgressBar from 'aws-northstar/components/ProgressBar';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';
<Stack>
    <Container headingVariant='h4' title="Vanilla Success">
        <ProgressBar status="success" label="Success Progress bar" />
    </Container>
    
    <Container headingVariant='h4' title="Success with result text">
        <ProgressBar status="success" label="Success Progress bar with text" resultText="Success" />
    </Container>

    <Container headingVariant='h4' title="Success with result text and button">
        <ProgressBar 
            status="success" 
            label="Success Progress bar with text and button" 
            resultText="Success" 
            resultButtonText="Done" 
            description="Progress bar description" 
            additionalInfo="Additional Info" 
            resultButtonClick={()=>{}}
        />
    </Container>

</Stack>
```
