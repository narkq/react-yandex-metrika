call node_modules\.bin\babel --stage 0 --optional=runtime --source-maps-inline -o lib\index.js  src\index.js
call node_modules\.bin\babel --stage 0 --optional=runtime --source-maps-inline -o lib\init.js  src\init.js
call node_modules\.bin\babel --stage 0 --optional=runtime --source-maps-inline -o lib\constants.js  src\constants.js
call node_modules\.bin\babel --stage 0 --optional=runtime --source-maps-inline -o lib\component.js  src\component.js
