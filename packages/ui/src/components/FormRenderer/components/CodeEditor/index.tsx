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

import 'ace-builds/css/ace.css';
import 'ace-builds/css/theme/dawn.css';
import 'ace-builds/css/theme/tomorrow_night_bright.css';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

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

const CodeEditor: FC<DataDrivenFormFieldProps> = (props) => {
    const [preferences, setPreferences] = useState(props.preferences);
    const [loading, setLoading] = useState(true);
    const [ace, setAce] = useState<object>();
    const resourceStrings = useMemo(() => {
        return {
            ...DEFAULT_RESOURCE_STRINGS,
            ...props.i18nStrings,
        };
    }, [props.i18nStrings]);

    const loadAce = useCallback(() => {
        return import('ace-builds')
            .then((ace) => {
                ace.config.set('useStrictCSP', true);
                ace.config.set('loadWorkerFromBlob', false);
                setAce(ace);
                setLoading(false);
            })
            .catch((e) => {
                console.log('Error in importing ace-builds', e);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        loadAce();
    }, [loadAce]);

    return (
        <CodeEditorComponent
            {...props}
            {...props.input}
            loading={loading}
            ace={ace}
            language={props.language}
            i18nStrings={resourceStrings}
            preferences={preferences}
            onPreferencesChange={(e) => setPreferences(e.detail)}
            onChange={({ detail }) => props.input.onChange(detail.value)}
            onRecoveryClick={loadAce}
        />
    );
};

export default memo(withDataDrivenFormField(CodeEditor));
