### Examples

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest'
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import { awsServices } from './data/data';

<Container headingVariant='h4' title='Autosuggest with static suggestions'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest options={awsServices} controlId="formFieldId1" ariaDescribedby="This is a description" />
    </FormField>
</Container>
```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest'
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import { groupedAwsServices } from './data/data';

<Container headingVariant='h4' title='Autosuggest with grouped static suggestions'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest options={groupedAwsServices} controlId="formFieldId1" empty="No matching service found" />
    </FormField>
</Container>
```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest';
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField';
import { awsServices } from './data/data';

const [shouldLoad, setLoadingStatus] = React.useState(false);
const [status, setStatus] = React.useState('finished');
const [options, setOptions] = React.useState([]);
const loading = shouldLoad && options.length === 0;

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

React.useEffect(() => {
    if (!loading) {
        return undefined;
    }

    (async () => {
        setStatus('loading');
        await sleep(1e3); // For demo purposes.

        setStatus('finished');
        setOptions(awsServices);
        setLoadingStatus(false);
    })();
}, [loading]);


<Container headingVariant='h4' title='Autosuggest with Asynchronously suggestions'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            controlId="formFieldId1"
            loadingText="Loading services"
            onFocus={() => {
                setOptions([]);
                setLoadingStatus(true);
                action('onFocus');
            }}
            statusType={status}
            options={options}
            empty="No matching service found"
        />
    </FormField>
</Container>
```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest';
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField';
import { awsServices } from './data/data';

const [shouldLoad, setLoadingStatus] = React.useState(false);
const [status, setStatus] = React.useState('finished');

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

React.useEffect(() => {
    if (!shouldLoad) {
        return undefined;
    }
    (async () => {
        setStatus('loading');
        await sleep(1e3); // For demo purposes.

        setStatus('error');
        setLoadingStatus(false);
    })();
}, [shouldLoad]);

<Container headingVariant='h4' title='Autosuggest with Asynchronously error'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            controlId="formFieldId1"
            onFocus={() => {
                setLoadingStatus(true);
            }}
            onRecoveryClick={e => {
                setLoadingStatus(true);
            }}
            statusType={status}
            recoveryText="Retry"
            empty="No matching service found"
        />
    </FormField>
</Container>

```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest'
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import { awsServices } from './data/data';

<Container headingVariant='h4' title='Without Input Icon'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest options={awsServices} controlId="formFieldId1" ariaDescribedby="This is a description" icon={false} />
    </FormField>
</Container>
```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest'
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import { awsServices } from './data/data';

<Container headingVariant='h4' title='Using a custom Icon'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest options={awsServices} controlId="formFieldId1" ariaDescribedby="This is a description" icon={'DnsOutlined'} />
    </FormField>
</Container>
```

```jsx
import Autosuggest from 'aws-northstar/components/Autosuggest'
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import { awsServices } from './data/data';

<Container headingVariant='h4' title='With free solo (allowing to enter custom text)'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            icon={'Computer'}
            filteringType="manual"
            freeSolo={true}
            disableClearable={true}
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
        />
    </FormField>
</Container>
```
