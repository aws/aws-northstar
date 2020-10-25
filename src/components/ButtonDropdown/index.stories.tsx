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
import ButtonDropdown from '.';
import Box from '../../layouts/Box';

export default {
    component: ButtonDropdown,
    title: 'ButtonDropdown',
};

export const StandardButton = () => (
    <ButtonDropdown content="Button" items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} />
);

export const PrimaryButton = () => (
    <ButtonDropdown content="Button" items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} variant="primary" />
);

export const DisabledButton = () => (
    <ButtonDropdown content="Button" items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} disabled={true} />
);

export const LoadingButton = () => (
    <ButtonDropdown content="Button" items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} loading={true} />
);

export const DisabledItems = () => (
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One', disabled: true }, { text: 'Two', disabled: true }, { text: 'Three' }]}
    />
);

export const WithSubHeading = () => (
    <ButtonDropdown
        content="Button"
        items={[
            {
                text: 'Instance size',
                items: [{ text: 'Small' }, { text: 'Medium' }, { text: 'Large' }],
            },
            {
                text: 'Instance type',
                items: [{ text: 'Ubuntu' }, { text: 'Amazon Linux' }, { text: 'RedHat' }],
            },
        ]}
    ></ButtonDropdown>
);

export const WithDisabledSubHeading = () => (
    <ButtonDropdown
        content="Button"
        items={[
            {
                text: 'Instances',
                disabled: true,
                items: [{ text: 'Small' }, { text: 'Medium' }, { text: 'Large' }],
            },
        ]}
    ></ButtonDropdown>
);

export const WithSubHeadingAndDisabledItems = () => (
    <ButtonDropdown
        content="Button"
        items={[
            {
                text: 'Instances',
                items: [{ text: 'Small', disabled: true }, { text: 'Medium', disabled: true }, { text: 'Large' }],
            },
        ]}
    ></ButtonDropdown>
);

export const WithDarkBackground = () => (
    <Box
        color="primary.contrastText"
        bgcolor="primary.main"
        width="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <ButtonDropdown
            darkTheme={true}
            content="Button"
            items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
        />
    </Box>
);
