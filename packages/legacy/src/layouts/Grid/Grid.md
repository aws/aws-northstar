### Examples

```jsx
import Grid from 'aws-northstar/layouts/Grid';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Grid Layout'>
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Placeholder/>
        </Grid>
        <Grid item xs={6}>
          <Placeholder/>
        </Grid>
        <Grid item xs={6}>
          <Placeholder/>
        </Grid>
        <Grid item xs={3}>
          <Placeholder/>
        </Grid>
        <Grid item xs={3}>
          <Placeholder/>
        </Grid>
        <Grid item xs={3}>
          <Placeholder/>
        </Grid>
        <Grid item xs={3}>
          <Placeholder/>
        </Grid>
      </Grid>
</Container>
```