### Examples

```jsx
import Select from 'aws-northstar/components/Select';
import Container from 'aws-northstar/layouts/Container';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
];

const [selectedOption, setSeletedOption] = React.useState();
const onChange = (event) => {
    setSeletedOption(options.find(o => o.value === event.target.value));
};
<Container headingVariant='h4' title='A simple select'>
    <Select
        placeholder="Choose an option"
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
    />
</Container>

```


```jsx
import Select from 'aws-northstar/components/Select';
import Container from 'aws-northstar/layouts/Container';

const options = [
    {label: 'Group one', options: [ { label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' } ]},
    {label: 'Group two', options: [ { label: 'Option 3', value: '3' } ]}
];

const [selectedOption, setSeletedOption] = React.useState();
const onChange = (event) => {
    setSeletedOption({ value: event.target.value });
};

<Container headingVariant='h4' title='A select with grouped options'>
    <Select
        placeholder="Choose an option"
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
    />
</Container>
```

```jsx
import Select from 'aws-northstar/components/Select';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
];

<Container headingVariant='h4' title='Different states of Select'>
    <Stack>
        <Select placeholder="Choose an option" options={options} invalid />

        <Select placeholder="Choose an option" options={options} disabled />

        <Select placeholder="Choose an option" statusType="loading" loadingText="Loading options" />

        <Select placeholder="Choose an option" statusType="error" errorText="Error fetching options." recoveryText="Retry" onRecoveryClick={() => console.log('Reload options')}/>

        <Select placeholder="Choose an option" empty="No options" />
    </Stack>
</Container>

```

```jsx
import Select from 'aws-northstar/components/Select';
import Container from 'aws-northstar/layouts/Container';

const [options, setOptions] = React.useState([]);
const [statusType, setStatusType] = React.useState(null);

const onFocus = () => {
    setStatusType('loading');
    setTimeout(() => {
        setStatusType('finished');
        setOptions([
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
        ]);
    }, 1000);
};

<Container headingVariant='h4' title='Fetching options from remote API'>
    <Select
        placeholder="Choose an option"
        options={options}
        statusType={statusType}
        onFocus={onFocus}
    />
</Container>
```
