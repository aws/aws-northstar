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
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export interface HeadingRendererProps {
    children?: React.ReactNode;
    level: number;
    id?: string;
}

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HeadingRenderer: React.FC<HeadingRendererProps> = ({ children, level, id }) => {
    const styles = useStyles();
    const headingLevel = Math.min(6, level);
    const variant: HeadingType = `h${headingLevel}` as HeadingType;
    const props = { variant, id };

    return (
        <Typography {...props} className={styles.root}>
            {children}
        </Typography>
    );
};

export default HeadingRenderer;
