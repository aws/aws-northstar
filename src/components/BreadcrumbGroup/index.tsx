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

import { Route, RouteProps } from 'react-router';
import { Breadcrumbs as MaterialBreadcrumbs, Typography } from '@material-ui/core';
import * as React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { matchPath } from 'react-router';
import Link from '../Link';

export interface BreadcrumbGroupItem {
    /**
     * The text for the Breadcrumb
     */
    text: string;
    /**
     * The relative href path for the Breadcrumb
     */
    href: string;
}

export interface BreadcrumbGroupProps {
    /**
     * The name for the first item of your BreadcrumbGroup. If you do not supply items, default's to Home
     */
    rootPath?: string;
    /**
     * A list of BreadcrumbGroupItem's to be used in your breadcrumb group. <br/>
     * If not specified, the breadcrumb group will be generated based on current route.
     */
    items?: BreadcrumbGroupItem[];
    /**
     * All the available routes. If specified, only available routes will be rendered as links.
     * */
    availableRoutes?: RouteProps[];
}

const matchRoute = (path: string, availableRoutes: RouteProps[]) => {
    if (availableRoutes.length > 0) {
        return availableRoutes.some((r) => matchPath(path, r));
    }

    return true;
};

/**
 * The Breadcrumb group is rendered as part of AppLayout on top of main content area to provide page navigation information.
 */
const BreadcrumbGroup = ({ items, rootPath = 'Home', availableRoutes = [] }: BreadcrumbGroupProps) => {
    if (!items) {
        return (
            <Route>
                {({ location }: RouteProps) => {
                    const pathnames = location!.pathname.split('/').filter((e) => e);
                    pathnames.unshift('/');

                    return (
                        <MaterialBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                            {pathnames.map((value: string, index: number) => {
                                const last = index === pathnames.length - 1;
                                const segment = pathnames.slice(0, index + 1);
                                const to = segment.length == 1 ? '/' : `/${segment.slice(1).join('/')}`;
                                const text = value
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ');

                                return last ? (
                                    <Typography color="inherit" key={to}>
                                        {pathnames.length == 1 && value === '/' ? rootPath : text}
                                    </Typography>
                                ) : matchRoute(to, availableRoutes) ? (
                                    <Link key={to} href={to}>
                                        {value == '/' ? rootPath : text}
                                    </Link>
                                ) : (
                                    <Typography color="inherit" key={to}>
                                        {value == '/' ? rootPath : text}
                                    </Typography>
                                );
                            })}
                        </MaterialBreadcrumbs>
                    );
                }}
            </Route>
        );
    }

    return (
        <Route>
            <MaterialBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                {items.map((item: BreadcrumbGroupItem, idx: number) =>
                    idx === items.length - 1 ? (
                        <Typography key={item.text} color="textPrimary">
                            {item.text}
                        </Typography>
                    ) : (
                        <Link key={item.text} href={item.href}>
                            {item.text}
                        </Link>
                    )
                )}
            </MaterialBreadcrumbs>
        </Route>
    );
};

export default BreadcrumbGroup;
