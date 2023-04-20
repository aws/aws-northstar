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
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const AttributeMapping = {
    address: {
        displayName: 'Address',
    },
    birthdate: {
        displayName: 'Birthdate',
        componentSettingsOverride: {
            component: componentTypes.DATE_PICKER,
        },
    },
    email: {
        displayName: 'Email',
        componentSettingsOverride: {
            type: 'email',
            validate: [
                {
                    type: validatorTypes.PATTERN,
                    message: 'Invalid email address',
                    // eslint-disable-next-line
                    pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                },
            ],
        },
    },
    family_name: {
        displayName: 'Family Name',
    },
    gender: {
        displayName: 'Gender',
    },
    given_name: {
        displayName: 'Given Name(s)',
    },
    locale: {
        displayName: 'Locale',
    },
    middle_name: {
        displayName: 'Middle Name',
    },
    name: {
        displayName: 'Name',
    },
    nickname: {
        displayName: 'Nickname',
    },
    phone_number: {
        displayName: 'Phone Number',
        componentSettingsOverride: {
            validate: [
                {
                    type: validatorTypes.PATTERN,
                    message: 'Must be a valid phone number in E.164 format, e.g. +15555550123',
                    pattern: /^\+[1-9]\d{1,14}$/i,
                },
            ],
        },
    },
    picture: {
        displayName: 'Picture',
    },
    preferred_username: {
        displayName: 'Preferred Username',
    },
    profile: {
        displayName: 'Profile',
    },
    sub: {
        displayName: 'Sub',
    },
    updated_at: {
        displayName: 'Updated at',
    },
    website: {
        displayName: 'Website',
    },
    zoneinfo: {
        displayName: 'Zone Info',
    },
};

export default AttributeMapping;
