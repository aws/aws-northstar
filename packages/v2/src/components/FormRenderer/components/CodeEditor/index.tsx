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
import { FC, memo, useState, useMemo, useEffect, useCallback } from 'react';
import CodeEditorComponent from '@cloudscape-design/components/code-editor';
import FormField from '@cloudscape-design/components/form-field';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import useUniqueId from '../../../../hooks/useUniqueId';
import getErrorText from '../../utils/getErrorText';

import 'ace-builds/css/ace.css';
import 'ace-builds/css/theme/dawn.css';
import 'ace-builds/css/theme/tomorrow_night_bright.css';

const DEFAULT_RESOURCE_STRINGS = {
    loadingState: 'Loading code editor',
    errorState: 'There was an error loading the code editor.',
    errorStateRecovery: 'Retry',
    editorGroupAriaLabel: 'Code editor',
    statusBarGroupAriaLabel: 'Status bar',
    cursorPosition: (row: number, column: number) => `Ln ${row}, Col ${column}`,
    errorsTab: 'Errors',
    warningsTab: 'Warnings',
    preferencesButtonAriaLabel: 'Preferences',
    paneCloseButtonAriaLabel: 'Close',
    preferencesModalHeader: 'Preferences',
    preferencesModalCancel: 'Cancel',
    preferencesModalConfirm: 'Confirm',
    preferencesModalWrapLines: 'Wrap lines',
    preferencesModalTheme: 'Theme',
    preferencesModalLightThemes: 'Light themes',
    preferencesModalDarkThemes: 'Dark themes',
};

const CodeEditor: FC<UseFieldApiConfig> = (props) => {
    const {
        label,
        description,
        helperText,
        info,
        i18nStrings,
        stretch,
        secondaryControl,

        input,
        language,
        preferences: codeEditorPreferences,

        validateOnMount,
        meta: { error, submitFailed },
        showError,

        ...rest
    } = useFieldApi(props);
    const [preferences, setPreferences] = useState(codeEditorPreferences);
    const [loading, setLoading] = useState(true);
    const [ace, setAce] = useState<object>();
    const resourceStrings = useMemo(() => {
        return {
            ...DEFAULT_RESOURCE_STRINGS,
            ...i18nStrings,
        };
    }, [i18nStrings]);

    const loadAce = useCallback(() => {
        return import('ace-builds')
            .then((ace) => {
                return import('ace-builds/webpack-resolver')
                    .then(() => {
                        ace.config.set('useStrictCSP', true);
                        ace.config.set('loadWorkerFromBlob', false);
                        setAce(ace);
                        setLoading(false);
                    })
                    .catch(() => setLoading(false));
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {}, [loadAce]);

    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            errorText={errorText}
            constraintText={helperText}
            info={info}
            i18nStrings={i18nStrings}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            <CodeEditorComponent
                {...rest}
                {...input}
                loading={loading}
                ace={ace}
                language={language}
                i18nStrings={resourceStrings}
                preferences={preferences}
                onPreferencesChange={(e) => setPreferences(e.detail)}
                controlId={controlId}
                onChange={({ detail }) => input.onChange(detail.value)}
            />
        </FormField>
    );
};

export default memo(CodeEditor);
