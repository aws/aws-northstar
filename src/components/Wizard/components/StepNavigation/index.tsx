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
import React, { FunctionComponent, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '../../../../layouts/Box';
import Link from '../../../Link';
import Text from '../../../Text';
import { StepClickDetail, WizardStepInfo } from '../../types';
import clsx from 'clsx';

export interface StepNavigationProps {
    steps: WizardStepInfo[];
    getStepNumberLabel: (stepNumber: number) => string;
    activeStepIndex: number;
    maxStepIndex: number;
    onStepNavigationClick?: (stepClickDetail: StepClickDetail) => void;
    optionalText: string;
    disableStepNavigation: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    step: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    stepNotLastChild: {
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
}));

const StepNavigation: FunctionComponent<StepNavigationProps> = ({
    steps,
    activeStepIndex,
    maxStepIndex,
    onStepNavigationClick,
    getStepNumberLabel,
    optionalText,
    disableStepNavigation,
}) => {
    const styles = useStyles();
    const renderTitle = useCallback(
        (step: WizardStepInfo, index: number) => {
            if (index === activeStepIndex || disableStepNavigation) {
                return (
                    <Box>
                        <Text>{index === activeStepIndex ? <b>{step.title}</b> : step.title}</Text>
                    </Box>
                );
            } else if (index < activeStepIndex || index <= maxStepIndex) {
                return (
                    <Link
                        href="#"
                        onClick={() => {
                            if (onStepNavigationClick) {
                                onStepNavigationClick({ requestedStepIndex: index });
                            }
                        }}
                    >
                        {step.title}
                    </Link>
                );
            }

            return (
                <Box color="grey.400">
                    <Text>{step.title}</Text>
                </Box>
            );
        },
        [activeStepIndex, disableStepNavigation, onStepNavigationClick]
    );

    const stepsLength = steps.length;

    return (
        <nav>
            <Box maxWidth="200px">
                {steps.map((step, index) => (
                    <Box
                        key={index}
                        data-testid="stepNavBox"
                        className={clsx(styles.step, index !== stepsLength && styles.stepNotLastChild)}
                    >
                        <Box color="grey.500">
                            <Text variant="small">
                                {getStepNumberLabel(index + 1)}
                                {step.isOptional ? <i> - {optionalText}</i> : ''}
                            </Text>
                        </Box>
                        {renderTitle(step, index)}
                    </Box>
                ))}
            </Box>
        </nav>
    );
};

export default StepNavigation;
