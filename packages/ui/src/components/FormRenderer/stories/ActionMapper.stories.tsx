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
import { ComponentMeta } from '@storybook/react';
import FormRenderer, { componentTypes, validatorTypes } from '..';
import { Template, DEFAULT_ARGS } from '../index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/ActionMapper',
} as ComponentMeta<typeof FormRenderer>;

export const ActionMapper = Template.bind({});
ActionMapper.args = {
    schema: {
        header: 'Data driven form using Action Mapper',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'username',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
                actions: {
                    label: ['translateLabel', 'username', 'jp'],
                },
            },
        ],
    },
    actionMapper: {
        translateLabel: (id: string, locale = 'en') => {
            const map: {
                [locale: string]: {
                    [key: string]: string;
                };
            } = {
                en: {
                    username: 'Username',
                    password: 'Password',
                },
                jp: {
                    username: '名前',
                    password: 'パスワード',
                },
            };

            return map[locale][id];
        },
    },
};
