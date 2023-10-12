# Types

This file contains all the app-wide types
For types that are more specific to components, they should be in the components folder

## Conventions

If a type is `snake_case`, then it is a type that is used to be sent to the backend or a type that is returned from the backend.
- *Response is a type that is returned from the backend
- *Payload is a type that is sent to the backend
- *Json is all possibilities of the type that is returned from the backend. Including error
- *Form is the data passed to the backend from a form
- *View is the data used in the frontend

## API
When sending to the backend, the types should be converted to `snake_case` before being sent.
When receiving from the backend, the types should be converted to `camelCase` before being used in the frontend.

Wavebreak sends responses back in `camelCase`, but expects requests to be in `snake_case`.
