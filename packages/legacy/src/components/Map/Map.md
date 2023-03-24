### Usage

To use NorthStar Map Component, you will need a <a href="https://docs.mapbox.com/help/getting-started/access-tokens/" target="_blank" rel="noreferrer noopener">MapBox access token</a>.

## Installing additional dependencies

`Map`'s dependencies are listed as peer dependencies so you will need to install them mannually by running the following command.
```bash
npm install react-map-gl
```

### Examples

Result screenshot - Pins on the map

![Pins on the Map](/img/example-map.png "Pins on the Map")

```jsx static
import Map from 'aws-northstar/components/Map';

const pins=[
    {
        name:'San Francisco',
        latitude: 37.7751, 
        longitude: -122.4193
    },
    {
        name:'Sacramento',
        latitude: 38.5816, 
        longitude: -121.4944
    },
    {
        name:'Los Angelas',
        latitude: 34.0522, 
        longitude: -118.2437
    }
];

<Map token='<your MapBox token>' pins={pins} viewportLatitude={37.785164} viewportLongitude={-122.4193}/>

```