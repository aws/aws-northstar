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

import React, { useState, useMemo } from 'react';
import { actions } from '@storybook/addon-actions';
import Box from '../../layouts/Box';
import Select, { SelectOption } from '.';
import { useCallback } from 'react';

export default {
    component: Select,
    title: 'Components/Select',
};

const options: SelectOption[] = [
    {
        label: 'Option 1',
        value: '1',
    },
    {
        label: 'Option 2',
        value: '2',
    },
    {
        label: 'Option 3',
        value: '3',
    },
    {
        label: 'Option 4',
        value: '4',
        disabled: true,
    },
];

const optionsWithIcons = [
    {
        label: 'Option 1',
        value: '1',
        iconName: 'copy' as const,
    },
    {
        label: 'Option 2',
        value: '2',
        iconName: 'add_plus' as const,
    },
    {
        label: 'Option 3',
        value: '3',
        iconName: 'refresh' as const,
    },
    {
        label: 'Option 4',
        value: '4',
        disabled: true,
        iconName: 'settings' as const,
    },
];

const optionsWithGroup = [
    ...options,
    {
        label: 'Group One',
        options: [
            {
                label: 'Option 5',
                value: '5',
            },
            {
                label: 'Option 6',
                value: '6',
                disabled: true,
            },
        ],
    },
    {
        label: 'Group Two',
        disabled: true,
        options: [
            {
                label: 'Option 7',
                value: '7',
            },
            {
                label: 'Option 8',
                value: '8',
            },
        ],
    },
];

export const Default = () => {
    const [selectedOption, setSelectedOption] = useState({ value: '' });
    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSelectedOption({ value: String(event.target.value) });
    };

    return (
        <Box width="300px">
            <Select options={options} selectedOption={selectedOption} onChange={onChange} />
        </Box>
    );
};

export const WithIcon = () => {
    const [selectedOption, setSelectedOption] = useState({ value: '' });
    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSelectedOption({ value: String(event.target.value) });
    };

    return (
        <Box width="300px">
            <Select options={optionsWithIcons} selectedOption={selectedOption} onChange={onChange} />
        </Box>
    );
};

export const WithOptionGroups = () => {
    const [selectedOption, setSelectedOption] = useState({ value: '' });
    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSelectedOption({ value: String(event.target.value) });
    };

    return (
        <Box width="300px">
            <Select options={optionsWithGroup} selectedOption={selectedOption} onChange={onChange} />
        </Box>
    );
};

export const PlaceholderWithExtraAriaTags = () => {
    const [selectedOption, setSelectedOption] = useState({ value: '' });
    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSelectedOption({ value: String(event.target.value) });
    };

    return (
        <Box width="300px">
            <div id="my-labelby" hidden>
                Description of the select
            </div>
            <Select
                options={options}
                selectedOption={selectedOption}
                onChange={onChange}
                placeholder={'Choose an option'}
                ariaLabelledby="my-labelby"
                ariaDescribedby="my-describedby"
                ariaRequired={true}
                label="my-label"
            />
        </Box>
    );
};

export const EmptyOption = () => (
    <Box width="300px">
        <Select empty="No options" placeholder={'Choose an option'} />
    </Box>
);

export const Disabled = () => (
    <Box width="300px">
        <Select options={options} placeholder={'Choose an option'} disabled />
    </Box>
);

export const Invalid = () => (
    <Box width="300px">
        <Select options={options} placeholder={'Choose an option'} invalid />
    </Box>
);

export const LoadingStatus = () => {
    return (
        <Box width="300px">
            <Select placeholder={'Choose an option'} statusType="loading" loadingText="Loading instances" />
        </Box>
    );
};

export const ErrorStatus = () => {
    const actionNames = actions('onRecoveryClick');

    return (
        <Box width="300px">
            <Select
                placeholder={'Choose an option'}
                statusType={'error'}
                errorText={'Error fetching instances.'}
                recoveryText={'Retry'}
                {...actionNames}
            />
        </Box>
    );
};

export const FetchOptionsFromAPI = () => {
    const [loading, setLoading] = useState(false);
    const [_options, setOptions] = useState<SelectOption[]>([]);
    const onFocus = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOptions(options);
        }, 1000);
    };
    const onBlur = () => {
        setLoading(false);
    };

    return (
        <Box width="300px">
            <Select
                options={_options}
                placeholder={'Choose an option'}
                onFocus={onFocus}
                onBlur={onBlur}
                statusType={loading ? 'loading' : 'finished'}
                loadingText="Loading instances"
            />
        </Box>
    );
};

const customOptions = [
    {
        id: 1,
        name: 'Name 1',
        description: 'Description 1',
        value: '1',
    },
    {
        id: 2,
        name: 'Name 2',
        description: 'Description 2',
        value: '2',
    },
    {
        id: 3,
        name: 'Name 3',
        description: 'Description 3',
        value: '3',
    },
    {
        id: 4,
        name: 'Name 4',
        description: 'Description 4',
        value: '4',
    },
];

export const RenderCustomLabel = () => {
    const [selectedOption, setSelectedOption] = useState({ value: '1' });
    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSelectedOption({ value: String(event.target.value) });
    };

    const options = useMemo(() => {
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

    return (
        <Box>
            <Select options={options} selectedOption={selectedOption} onChange={onChange} renderOption={renderOption} />
        </Box>
    );
};
