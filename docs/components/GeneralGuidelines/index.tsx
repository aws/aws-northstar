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
import React, { ReactNode } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import Container from '../../../src/layouts/Container';
import Box from '../../../src/layouts/Box';
import Stack from '../../../src/layouts/Stack';
import Text from '../../../src/components/Text';

const useStyles = makeStyles((theme: Theme) => ({
    positiveGuideline: {
        borderLeft: `2px solid ${theme.palette.success.dark}`,
        paddingLeft: theme.spacing(2),
    },
    positiveHeader: {
        color: theme.palette.success.dark,
    },
    negativeGuideline: {
        borderLeft: `2px solid ${theme.palette.error.dark}`,
        paddingLeft: theme.spacing(2),
    },
    negativeHeader: {
        color: theme.palette.error.dark,
    },
}));

export interface GeneralGuidelinesProps {
    dos: ReactNode[];
    donts: ReactNode[];
}

const renderGuidelines = (guidelines: ReactNode[], positive: boolean, styles: any) => {
    return (
        <Box>
            <Stack>
                <Typography variant="h4" className={positive ? styles.positiveHeader : styles.negativeHeader}>
                    {positive ? 'Do' : "Don't"}
                </Typography>
                <Stack>
                    {guidelines.map((guideline) => (
                        <Box pr={1} className={positive ? styles.positiveGuideline : styles.negativeGuideline}>
                            {typeof guideline === 'string' ? <Text>{guideline}</Text> : guideline}
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
};

export default ({ dos, donts }: GeneralGuidelinesProps) => {
    const styles = useStyles();
    return (
        <Container title="General guidelines" headingVariant="h3">
            <Stack>
                {dos && dos.length > 0 && renderGuidelines(dos, true, styles)}
                {donts && donts.length > 0 && renderGuidelines(donts, false, styles)}
            </Stack>
        </Container>
    );
};
