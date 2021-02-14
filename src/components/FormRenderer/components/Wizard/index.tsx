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
import React, { FunctionComponent, useMemo, useState } from 'react';
import { WizardStepInfo } from '../../../Wizard';
import WizardStep from './components/WizardStep';

export interface WizardMappingProps {
    fields: any[];
    submitButtonText?: string;
}

const WizardMapping: FunctionComponent<WizardMappingProps> = (props) => {
    const [maxStepIndex, setMaxStepIndex] = useState(0);
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const handleNextButtonClick = () => {
        const target = activeStepIndex + 1;
        setActiveStepIndex(target);
        if (target > maxStepIndex) {
            setMaxStepIndex(target);
        }
    };

    const handlePreviousButtonClick = () => {
        const target = activeStepIndex - 1;
        if (target >= 0) {
            setActiveStepIndex(target);
        }
    };

    const stepsInfo: WizardStepInfo[] = useMemo(() => {
        return props.fields.map((field) => ({
            title: field.title,
            isOptional: field.isOptional,
        }));
    }, [props.fields]);

    const field: any = useMemo(() => {
        return props.fields[activeStepIndex];
    }, [props.fields, activeStepIndex]);

    return (
        <WizardStep
            activeStepIndex={activeStepIndex}
            maxStepIndex={maxStepIndex}
            stepsInfo={stepsInfo}
            fields={field.fields}
            title={field.title}
            description={field.description}
            submitButtonText={props.submitButtonText}
            onNextButtonClick={handleNextButtonClick}
            onPreviousButtonClick={handlePreviousButtonClick}
        />
    );
};

export default WizardMapping;
