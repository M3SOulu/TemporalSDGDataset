# JSON schema for Static and Temporal Service Dependency graphs

This repository host the schema for repsenting (micro)Service depedency graphs in JSON format.
The graph format was adapted from [JSON graph format](https://jsongraphformat.info/).

## Schemas & their validation

Here we describe the two schemas and how to validate them.

### Static SDG schema

This [schema](json-static-sdg-schema.json) represents an SDG of a particular version of a project (i.e., a static graph)

The schema is
- `graph`: root object representing the graph
    - `label`: string, the name of the graph
    - `directed`: boolean, whether the edges are interpreted as directed (default true)
    - `multigraph`: boolen, whether several edges between source and target are allowed, distinguished by the endpoint,
    - `nodes`: array[string], list of all nodes present in the data (must be unique)
    - `edges`: array[object], list of edge object containing the following:
        - `source`: string, the source node (expected to be one of nodes defined in `nodes`)
        - `target`: string, the target node (expected to be one of nodes defined in `nodes`)
        - `endpoint`: string (optional), the endpoint of `target` that is accessed (if used, `multigraph` must be `true`)
        - `weight`: number (optional, >=0), the weight associated with the connection (e.g., the amount of connections)
       
Schema does not restrict additional properties.

Example data is provided in [example-static-sdg-json](example-static-sdg.json)
       
### Temporal SDG schema

This [schema](json-temporal-sdg-schema.json) extends the Static SDG schema to represent a temporal SDG for several timestamps
(e.g. different versions of the project or snapshots of project at different moments at runtime)

The schema is
- `graph`: root object representing the graph
    - `label`: string, the name of the graph
    - `directed`: boolean, whether the edges are interpreted as directed (default true)
    - `multigraph`: boolen, whether several edges between source and target are allowed, distinguished by the endpoint,
    - `nodes`: array[string], list of all nodes present in the data (must be unique)
    - `timestamps`: array[string], list of all timestamps present in the data in chronological order (must be unique)
    - `edges`: array[object], list of edge object containing the following:
        - `source`: string, the source node (expected to be one of nodes defined in `nodes`)
        - `target`: string, the target node (expected to be one of nodes defined in `nodes`)
        - `timestamp`: string, the timestamp of connection (expected to be one of the timestamps defined in `timestamps`)
        - `endpoint`: string (optional), the endpoint of `target` that is accessed (if used, `multigraph` must be `true` )
        - `weight`: number (optional, >=0), the weight associated with the connection (e.g., the amount of connections)

Schema does not restrict additional properties.

Example data is provided in [example-temporal-sdg.json](example-temporal-sdg.json)

### Validation of schemas

It is possible to validate that schemas adhere to JSON Schema Draft-07.

Install `node`, `npm` and then required packages:

```
npm install ajv ajv-keywords
```

And then run the script [validate-schema.js](validate-schema.js):

```
node validate-schema.js
```

### Validation of data

It is possible to validate that your data adheres to the respective schema.

Install `node`, `npm` and then required packages:

```
npm install ajv ajv-keywords yargs
```

And then run the script [validate-data.js](validate-data.js) providing the schema and data `jsons`
as `--schema` and `--data`, respectively:

```
node validate-data.js --schema=json-static-sdg-schema.json --data=example-static-sdg.json
node validate-data.js --schema=json-temporal-sdg-schema.json --data=example-temporal-sdg.json
```


