# Element connections
![Dependecies](https://img.shields.io/david/nueq22/element-connections)

Simple lib for drawing DOM element connections with svg.

## Usage

For simple using you need to download this repo and use `element-connections.js` file from `dist` folder.

Just create container for drawing connections. 

**Important:** Container must be `relative` because we use `absolute` position for svg.

```html
    <div class="container" id="connections-container">
        <svg id="connections"></svg>
        <!-- your elements for connection -->
        <div id="el-1"></div>
        <div id="el-2"></div>
    </div>
```

Add script in the bottom of the page and init new connection instance:

```html
    <script src="element-connections.js"></script>
    <script>
        const container = document.getElementById('connections-container');

        const point1 = document.getElementById('el-1');
        const point2 = document.getElementById('el-2');

        const myConnection = new ElementConnections({
            container: container,
            elements: [point1, point2]
        })
    </script>
```

You can see line between centers of your elements on the page. You can see example is usage in example folder of this repo.

ElementConnections pass config object with next props:

|    Name   |     Value     |                                                  Description                                                 | Required |
|:---------:|:-------------:|:------------------------------------------------------------------------------------------------------------:|:--------:|
| container |   SVGElement  |                                             Container for render                                             |    Yes   |
|  elements | HTMLElement[] |                                            Elements for connection                                           |    Yes   |
|  animated |    Boolean    |                         Hide connections by default and make available animate method                        |    No    |
|   style   |     Object    | Object with `width` and `color` fields for line styling. `width` - integer number, `color` - css valid color |    No    |

Available methods:

|  Method |                                                         Description                                                        |
|:-------:|:--------------------------------------------------------------------------------------------------------------------------:|
| animate | Call animate function for drawing line between elements, work's only if `animated: true`, was passed to connections config |
| destroy |                                        Unregister resize event listener from window                                        |

