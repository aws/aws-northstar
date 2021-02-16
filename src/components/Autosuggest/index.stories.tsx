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
import React from 'react';
import Autosuggest from '.';
import FormField from '../FormField';
import { action } from '@storybook/addon-actions';
import { awsServices, groupedAwsServices } from './data/data';
import { SelectOption, StatusType } from '../Select';

export default {
    component: Autosuggest,
    title: 'Autosuggest',
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
                onFocus={() => {
                    setOptions([]);
                    setLoadingStatus(true);
                    action('onFocus');
                }}
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
            icon={'DnsOutlined'}
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
        />
    </FormField>
);

export const WithFreeSolo = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Autosuggest
            icon={'Computer'}
            filteringType="manual"
            freeSolo={true}
            disableClearable={true}
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            onInputChange={action('onInputChange')}
        />
    </FormField>
);
