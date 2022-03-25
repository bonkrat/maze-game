# maze-game
A simple, one-handed maze game. 
[Demo](https://maze-game-plum.vercel.app/)

https://user-images.githubusercontent.com/1292831/160152048-37a73f39-bba9-4111-b30f-599971b132cc.mov

## Controls
Move by swiping on mobile, or with WASD on a keyboard.

## Design
TypeScript and HTML5. The main purpose of the project was to prototype a game I'm working on and to practice some tech and algorithms:
- [HTML Canvas rendering](https://github.com/bonkrat/maze-game/blob/main/src/class/GameRenderer.ts)
- [Canvas animation effects](https://github.com/bonkrat/maze-game/tree/main/src/class/Effects)
- [Maze generator](https://github.com/bonkrat/maze-game/blob/main/src/class/Maze/MazeManager.ts#L70)
- [Djikstra's shortest path](https://github.com/bonkrat/maze-game/blob/main/src/class/Maze/MazeManager.ts#L109) 
- [PriorityQueue data structure](https://github.com/bonkrat/maze-game/blob/main/src/class/PriorityQueue.ts)
- [Graph data structure](https://github.com/bonkrat/maze-game/blob/main/src/class/Graph/Graph.ts)
