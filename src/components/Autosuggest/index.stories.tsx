/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */
import React, { useMemo, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import DnsOutlined from '@material-ui/icons/DnsOutlined';
import Computer from '@material-ui/icons/Computer';
import Box from '../../layouts/Box';
import Autosuggest, { SelectOption, StatusType, FilterOptionsState } from '.';
import FormField from '../FormField';
import { awsServices, groupedAwsServices } from './data/data';

export default {
    component: Autosuggest,
    title: 'Components/Autosuggest',
};

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export const Default = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    </FormField>
);

export const WithValue = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            options={awsServices}
            controlId="formFieldId1"
            placeholder="AWS services"
            onChange={action('onChange')}
            value={{
                label: 'Lambda - Amazon Lambda',
                value: 'Lambda',
            }}
        />
    </FormField>
);

export const Placeholder = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            options={awsServices}
            controlId="formFieldId1"
            placeholder="AWS services"
            onChange={action('onChange')}
        />
    </FormField>
);

export const Groups = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            options={groupedAwsServices}
            controlId="formFieldId1"
            empty="No matching service found"
            onChange={action('onChange')}
        />
    </FormField>
);

export const AsyncLoading = () => {
    const [shouldLoad, setLoadingStatus] = React.useState(false);
    const [status, setStatus] = React.useState<StatusType>('finished');
    const [options, setOptions] = React.useState<SelectOption[]>([]);

    React.useEffect(() => {
        const loading = shouldLoad && options.length === 0;
        if (loading) {
            (async () => {
                setStatus('loading');
                await sleep(1e3);

                setStatus('finished');
                setOptions(awsServices);
                setLoadingStatus(false);
            })();
        }
    }, [shouldLoad, options.length]);

    return (
        <FormField label="Form field label" controlId="formFieldId1">
            <Autosuggest
                controlId="formFieldId1"
                loadingText="Loading services"
                onFocus={(e) => {
                    setOptions([]);
                    setLoadingStatus(true);
                    action('onFocus')(e);
                }}
                onBlur={action('onBlur')}
                statusType={status}
                options={options}
                empty="No matching service found"
                onChange={action('onChange')}
            />
        </FormField>
    );
};

export const AsyncWithError = () => {
    const [shouldLoad, setLoadingStatus] = React.useState(false);
    const [status, setStatus] = React.useState<StatusType>('finished');

    React.useEffect(() => {
        if (shouldLoad) {
            (async () => {
                setStatus('loading');
                await sleep(1e3); // For demo purposes.

                setStatus('error');
                setLoadingStatus(false);
            })();
        }
    }, [shouldLoad]);

    return (
        <FormField label="Form field label" controlId="formFieldId1">
            <Autosuggest
                controlId="formFieldId1"
                onFocus={() => {
                    setLoadingStatus(true);
                }}
                onRecoveryClick={(e) => {
                    setLoadingStatus(true);
                }}
                statusType={status}
                recoveryText="Retry"
                empty="No matching service found"
            />
        </FormField>
    );
};

export const WithoutIcon = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            icon={false}
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
        />
    </FormField>
);

export const WithCustomIcon = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            icon={DnsOutlined}
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
        />
    </FormField>
);

const customOptions = [
    {
        id: 1,
        name: 'Name 1',
        description: 'Description 1',
    },
    {
        id: 2,
        name: 'Name 2',
        description: 'Description 2',
    },
    {
        id: 3,
        name: 'Name 3',
        description: 'Description 3',
    },
    {
        id: 4,
        name: 'Name 4',
        description: 'Description 4',
    },
];

interface CustomOptionType extends SelectOption {
    id: number;
    name: string;
    description: string;
}

export const RenderCustomLabel = () => {
    const options: CustomOptionType[] = useMemo(() => {
        return customOptions.map((o) => ({
            ...o,
            label: `${o.id}-${o.name}`,
            value: o.id.toString(),
        }));
    }, []);

    const renderOption = useCallback((o) => {
        return (
            <Box>
                <Box>
                    <b>
                        {o.id}-{o.name}
                    </b>
                </Box>
                <Box>{o.description}</Box>
            </Box>
        );
    }, []);

    const filterOptions = useCallback((options: SelectOption[], state: FilterOptionsState) => {
        if (state?.inputValue) {
            return (options as CustomOptionType[]).filter(
                (o) =>
                    o.label.toLowerCase().indexOf(state.inputValue.toLowerCase()) >= 0 ||
                    o.name.toLowerCase().indexOf(state.inputValue.toLowerCase()) >= 0 ||
                    o.description.toLowerCase().indexOf(state.inputValue.toLowerCase()) >= 0
            );
        }

        return options;
    }, []);

    return (
        <Box>
            <Autosuggest
                options={options}
                value={{ ...options[0] }}
                renderOption={renderOption}
                filterOptions={filterOptions}
            />
        </Box>
    );
};

export const WithFreeSolo = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            icon={Computer}
            freeSolo={true}
            filteringType="manual"
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            onInputChange={action('onInputChange')}
        />
    </FormField>
);
