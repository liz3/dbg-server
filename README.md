# dbg-server
This is a very simple cli tool which exposes a plain htto server for debugging of http clients.
It can be useful when creating clients which send http data and theres a need for a simple server which just sends the data to console for debugging purposes.

## installation
```
npm i -g dbg-server
```

## Arguments
* `-p/--port port` - this sets the port the server is listening on.
* `-x/--cors` - set cors headers, for use in browsers with other origin.
* `-c/--code code` - needs to be a number, defines the http response code which will be used
* `-b/--body body` - this defines the body which will be send back to the client, can either be a string or a json structure.

## Running
```
dbg-server [...args]
```

# LICENSE
this is free software licensed under GPL-2.0
