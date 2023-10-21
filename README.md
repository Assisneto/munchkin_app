# Munchkin App

![Alt text](./coverage/badge-branches.svg)
![Alt text](./coverage/badge-functions.svg)
![Alt text](./coverage/badge-lines.svg)
![Alt text](./coverage/badge-statements.svg)

### [Munchkin Server (backend)](https://github.com/Assisneto/munchkin_backend)

## Motivation

There are already many applications for the Munchkin board game, but there is something that bothers me about these solutions, I have to keep asking my power and level all the time as well as that of other players, because for that I created this project whose main characteristic this app that any another application don't have, the possibility share game information with other players in realtime using websocket.

### Stacks

- React Native
- Expo
- Typescript
- Styled Component
- WebSocket
- Elixir (backend)
- Phoenix (backend)
- Channels (backend)

### Versions

- v1
  - Show and edit level and strength of all players
- v2

  - Shared information of all players using realtime with websocket

- v3 (current)
  - Refactoring code and add tests
- v4 (development)
  - Improve realtime
    - use GenStage in backend to maintain the socket state
    - Add support to rooms

#### First version of the app finished

#### Next steps

- v5
  - Replace localStorage to [watermelonDB](https://github.com/Nozbe/WatermelonDB)
