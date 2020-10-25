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

import React, { FunctionComponent } from 'react';
// @ts-ignore
import MapGL, { Marker, NavigationControl, MarkerProps, ViewportProps } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    navStyle: {
        position: 'absolute',
        top: 10,
        left: 0,
        padding: '10px',
    },
    muiIconOverride: {
        color: theme.palette.info.dark,
        height: '24px',
        transform: `translate(${-36 / 2}px,${-24}px)`,
    },
}));

export interface MapProps {
    /** Mapbox token */
    token: string;
    mapStyle?: 'default' | 'satellite';
    /** Initial viewport width */
    viewportWidth?: number;
    /** Initial viewport height */
    viewportHeight?: number;
    /** Initial viewport latitude */
    viewportLatitude: number;
    /** Initial viewport longitude */
    viewportLongitude: number;
    /** Initial zoom level */
    viewportZoom?: number;
    /** An array of map pins */
    pins: MarkerProps[];
}

enum MAP_STYLE {
    satellite = 'mapbox://styles/mapbox/satellite-v9',
    default = 'mapbox://styles/mapbox/streets-v11',
}

/**
 * Map renders interactive maps from vector tiles and Mapbox styles using WebGL.
 */
const Map: FunctionComponent<MapProps> = ({
    token,
    mapStyle = 'default',
    viewportWidth = 600,
    viewportHeight = 600,
    viewportLatitude,
    viewportLongitude,
    viewportZoom = 5,
    pins,
}) => {
    const viewportInitialConfig = {
        width: viewportWidth,
        height: viewportHeight,
        latitude: viewportLatitude,
        longitude: viewportLongitude,
        zoom: viewportZoom,
        bearing: 0,
        pitch: 0,
    };
    const classes = useStyles({});
    const [viewport, setViewport] = React.useState(viewportInitialConfig);

    const marker = ({ latitude, longitude }: MarkerProps) => (
        <Marker latitude={latitude} longitude={longitude}>
            <RoomIcon fontSize="large" color="secondary" classes={{ colorSecondary: classes.muiIconOverride }} />
        </Marker>
    );

    return (
        <MapGL
            mapStyle={MAP_STYLE[mapStyle]}
            mapboxApiAccessToken={token}
            {...viewport}
            onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
        >
            {pins.map((city, index) => marker({ ...city }))}
            <div className={classes.navStyle}>
                <NavigationControl />
            </div>
        </MapGL>
    );
};

export default Map;
