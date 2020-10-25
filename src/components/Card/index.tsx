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

import React, { FunctionComponent, ReactNode } from 'react';
import MUICard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Text from '../Text';

export interface CardProps {
    /**
     * Title of the card
     * */
    title?: string;
    /**
     * Subtitle of the card
     * */
    subtitle?: string;
    /**
     * Content of the card
     * */
    children?: ReactNode;
}

/**
 * A Card renders the basic information of a resource
 * */
const Card: FunctionComponent<CardProps> = ({ title = '', subtitle = '', children }) => {
    const content = (
        <CardContent>
            {typeof children === 'string' ? <Text variant="p">{children}</Text> : <>{children}</>}
        </CardContent>
    );
    return (
        <MUICard>
            <CardHeader title={title} subheader={subtitle} />
            {content}
        </MUICard>
    );
};

export default Card;
