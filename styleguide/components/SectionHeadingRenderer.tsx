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
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

export interface SectionHeadingRendererProps {
    children?: React.ReactNode;
    id: string;
    depth: number;
    deprecated?: boolean;
}

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const SectionHeadingRenderer: React.FC<SectionHeadingRendererProps> = ({ children, depth }) => {
    const styles = useStyles();
    const headingLevel = Math.min(6, depth);
    const variant = `h${headingLevel}` as HeadingType;
    return (
        <Typography variant={variant} className={styles.root}>
            {children}
        </Typography>
    );
};

export default SectionHeadingRenderer;
