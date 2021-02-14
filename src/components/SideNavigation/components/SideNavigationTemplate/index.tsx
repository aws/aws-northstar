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
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '../../../../layouts/Box';
import Link from '../../../Link';

const useStyles = makeStyles((theme) => ({
    header: {
        fontSize: '18px',
        padding: '20px 56px 20px 30px',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        '& .MuiLink-root': {
            fontSize: '18px',
            color: theme.palette.grey[900],
        },
        '& .MuiLink-root:hover': {
            color: theme.palette.secondary.main,
        },
    },
}));

/** Object responsible for the header at the top of the navigation component. */
export interface SideNavigationHeader {
    /**text to be displayed as a header. */
    text: string;
    /**href the header should link to. */
    href?: string;
}

export interface SideNavigationTemplateProps {
    header: SideNavigationHeader;
}

const SideNavigationTemplate: FunctionComponent<SideNavigationTemplateProps> = ({ header, children }) => {
    const styles = useStyles();
    const headerContent = useMemo(
        () => (
            <Box className={styles.header} color="grey.900">
                {header.href ? (
                    <Link href={header.href} underlineHover={false}>
                        <b>{header.text}</b>
                    </Link>
                ) : (
                    <b>{header.text}</b>
                )}
            </Box>
        ),
        [header]
    );

    return (
        <Box>
            {headerContent}
            <Divider />
            {children}
        </Box>
    );
};

export default SideNavigationTemplate;
