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
export const TEST_USER_ATTRIBUTES = {
    email_verified: 'true',
    phone_number_verified: 'true',
    phone_number: '+1234567890',
    given_name: '',
    family_name: '',
    email: 'test@test.com',
};

export const REQUIRED_ATTRIBUTES = ['family_name', 'given_name'];

export const REQUIRED_SIGNUP_ATTRIBUTES = ['family_name', 'given_name', 'email', 'phone_number'];

export const MFA_CHALLENGE_PARAMS = {
    CODE_DELIVERY_DELIVERY_MEDIUM: 'SMS',
    CODE_DELIVERY_DESTINATION: '+0123456789',
};

export const MFA_SETUP_CHALLENGE_PARAM = {
    MFAS_CAN_SETUP: JSON.stringify(['SMS_MFA', 'SOFTWARE_TOKEN_MFA']),
};

export const FORGOT_PASSWORD_DATA = {
    CodeDeliveryDetails: {
        AttributeName: 'email',
        DeliveryMedium: 'EMAIL',
        Destination: 't***@t***',
    },
};
