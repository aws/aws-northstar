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
import React, { FunctionComponent, useMemo } from 'react';
import Container from '../../../../layouts/Container';
import { WizardStepInfo, WizardStep, StepClickDetail } from '../../types';
import Inline from '../../../../layouts/Inline';
import Stack from '../../../../layouts/Stack';
import Box from '../../../../layouts/Box';
import Button from '../../../Button';
import StepNavigation from '../StepNavigation';
import Step from '../Step';

export interface WizardInnerProps {
    step: WizardStep;
    stepsInfo: WizardStepInfo[];
    stepCount: number;
    activeStepIndex: number;
    maxStepIndex: number;
    getStepNumberLabel?: (stepNumber: number) => string;
    cancelButtonText?: string;
    previousButtonText?: string;
    nextButtonText?: string;
    submitButtonText?: string;
    isLoadingNextStep?: boolean;
    onCancelButtonClick: () => void;
    onPreviousButtonClick: () => void;
    onNextButtonClick: () => void;
    onSubmitButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onStepNavigationClick?: (stepClickDetail: StepClickDetail) => void;
    optionalText?: string;
    /**Indicates whether the step navigation is disabled. When it is enabled, validation will need to take it into consideration. */
    disableStepNavigation?: boolean;
}

const WizardInner: FunctionComponent<WizardInnerProps> = ({
    step,
    stepsInfo,
    stepCount,
    activeStepIndex,
    maxStepIndex,
    getStepNumberLabel = (stepNumber: number) => `Step ${stepNumber}`,
    cancelButtonText = 'Cancel',
    previousButtonText = 'Previous',
    nextButtonText = 'Next',
    submitButtonText = 'Submit',
    optionalText = 'optional',
    isLoadingNextStep = false,
    disableStepNavigation = false,
    onNextButtonClick,
    onPreviousButtonClick,
    onStepNavigationClick,
    onSubmitButtonClick,
    onCancelButtonClick,
}) => {
    const actions = useMemo(() => {
        if (activeStepIndex === 0) {
            return (
                <Inline>
                    <Button variant="link" onClick={onCancelButtonClick}>
                        {cancelButtonText}
                    </Button>
                    <Button variant="primary" loading={isLoadingNextStep} onClick={onNextButtonClick}>
                        {nextButtonText}
                    </Button>
                </Inline>
            );
        }

        if (activeStepIndex === stepCount - 1) {
            return (
                <Inline>
                    <Button variant="link" onClick={onCancelButtonClick}>
                        {cancelButtonText}
                    </Button>
                    <Button variant="normal" onClick={onPreviousButtonClick}>
                        {previousButtonText}
                    </Button>
                    <Button variant="primary" loading={isLoadingNextStep} onClick={onSubmitButtonClick}>
                        {submitButtonText}
                    </Button>
                </Inline>
            );
        }

        return (
            <Inline>
                <Button variant="link" onClick={onCancelButtonClick}>
                    {cancelButtonText}
                </Button>
                <Button variant="normal" onClick={onPreviousButtonClick}>
                    {previousButtonText}
                </Button>
                <Button variant="primary" loading={isLoadingNextStep} onClick={onNextButtonClick}>
                    {nextButtonText}
                </Button>
            </Inline>
        );
    }, [activeStepIndex, stepCount, isLoadingNextStep]);

    return (
        <Container>
            <Box display="flex">
                <Box>
                    <Box mr={8}>
                        <StepNavigation
                            disableStepNavigation={disableStepNavigation}
                            steps={stepsInfo}
                            getStepNumberLabel={getStepNumberLabel}
                            activeStepIndex={activeStepIndex}
                            maxStepIndex={maxStepIndex}
                            optionalText={optionalText}
                            onStepNavigationClick={onStepNavigationClick}
                        />
                    </Box>
                </Box>
                <Box flexGrow={1}>
                    <Stack>
                        <Box>
                            <Step step={step} />
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            {actions}
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default WizardInner;
