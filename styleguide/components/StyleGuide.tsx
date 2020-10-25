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
import React, { ReactNode, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '../../src/layouts/Box';
import NorthStarThemeProvider from '../../src/components/NorthStarThemeProvider';
import AppLayout from '../../src/layouts/AppLayout';
import Header from '../../src/components/Header';
import Landing from './Landing';
import ButtonDropdown from '../../src/components/ButtonDropdown';
import SideNavigationTemplate from '../../src/components/SideNavigation/components/SideNavigationTemplate';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(4),
        paddingBottom: 0,
    },
}));

export interface StyleGuideRendererProps {
    title: string;
    toc?: ReactNode;
}

const StyleGuideRenderer: React.FC<StyleGuideRendererProps> = ({ title, children, toc }) => {
    const classes = useStyles();
    const handleMenuClick = useCallback((url: string) => {
        window.open(url, '_blank');
        return false;
    }, []);
    const feedBack = (
        <ButtonDropdown
            darkTheme
            content="Support"
            items={[
                {
                    text: 'Feedback',
                    onClick: () => handleMenuClick('https://github.com/aws/aws-northstar/issues'),
                },
                {
                    text: 'Issues',
                    onClick: () => handleMenuClick('https://github.com/aws/aws-northstar/issues'),
                },
                {
                    text: 'Source code',
                    onClick: () => handleMenuClick('https://github.com/aws/aws-northstar'),
                },
                {
                    text: 'Getting started',
                    onClick: () => handleMenuClick('/#/Getting%20Started'),
                },
                {
                    text: 'Contribution',
                    onClick: () => handleMenuClick('/#/Contribution%20Guide'),
                },
            ]}
        />
    );
    const header = <Header title="" logoPath="/img/logo-light-full.png" rightContent={feedBack} />;
    const sideNavigation = (
        <SideNavigationTemplate
            header={{
                text: title,
            }}
        >
            {toc}
        </SideNavigationTemplate>
    );

    return (
        <NorthStarThemeProvider>
            <AppLayout navigation={sideNavigation} header={header} paddingContentArea={false}>
                {window.location.hash === '' ? <Landing /> : <Box className={classes.container}>{children}</Box>}
            </AppLayout>
        </NorthStarThemeProvider>
    );
};

export default StyleGuideRenderer;
