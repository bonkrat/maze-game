import { Maze } from "./Maze";
import { Cell } from ".";
import { PriorityQueue } from "..";
import { Node } from "../Graph/Node";

type BuilderCell = {
  cell: Cell;
  visited: false;
};

export class MazeManager {
  private static getNewNeighbors(
    builderCell: BuilderCell,
    mazeCells: BuilderCell[],
    mazeSize: number
  ) {
    return [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]
      .map((n) => {
        const { cell } = builderCell;
        const xCoord =
            cell.x + n[0] < 0
              ? 0
              : cell.x + n[0] >= mazeSize
              ? mazeSize - 1
              : cell.x + n[0],
          yCoord =
            cell.y + n[1] < 0
              ? 0
              : cell.y + n[1] >= mazeSize
              ? mazeSize - 1
              : cell.y + n[1];

        return mazeCells[xCoord + mazeSize * yCoord];
      })
      .filter((builderCell: BuilderCell) => !builderCell.visited);
  }

  private static breakWalls(cell, cell2) {
    // Right
    if (cell.x + 1 === cell2.x && cell.y === cell2.y) {
      cell.walls.delete("bottom");
      cell2.walls.delete("top");
    }

    // Bottom
    if (cell.x === cell2.x && cell.y - 1 === cell2.y) {
      cell.walls.delete("left");
      cell2.walls.delete("right");
    }

    // Left
    if (cell.x - 1 === cell2.x && cell.y === cell2.y) {
      cell.walls.delete("top");
      cell2.walls.delete("bottom");
    }

    // Top
    if (cell.x === cell2.x && cell.y + 1 === cell2.y) {
      cell.walls.delete("right");
      cell2.walls.delete("left");
    }
  }

  static build(maze: Maze) {
    const stack: BuilderCell[] = [],
      visitCell = (cell) => {
        cell.visited = true;
        stack.push(cell);
      },
      mazeCells: BuilderCell[] = maze.map((cell: Cell) => ({
        cell,
        visited: false,
      }));

    const randomCell = mazeCells[4];
    visitCell(randomCell);

    do {
      const currentCell = stack.pop();
      const neighbors = this.getNewNeighbors(currentCell, mazeCells, maze.size);

      if (neighbors.length > 0) {
        visitCell(currentCell);
        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        visitCell(randomNeighbor);

        this.breakWalls(
          maze.getCell(currentCell.cell.x, currentCell.cell.y),
          maze.getCell(randomNeighbor.cell.x, randomNeighbor.cell.y)
        );

        maze.addGraphEdge(currentCell.cell, randomNeighbor.cell);
      }
    } while (stack.length);
  }

  static solve(
    start: { x: number; y: number },
    end: { x: number; y: number },
    maze: Maze
  ) {
    const rootValue = start.x + maze.size * start.y;
    const rootNode = maze.graph.get(rootValue);
    const endNode = maze.graph.get(end.x + maze.size * end.y);
    const queue = new PriorityQueue<Node>();

    maze.getCell(start.x, start.y).start = true;
    maze.getCell(end.x, end.y).end = true;

    rootNode.distance = 0;

    queue.enqueue(rootNode, 0);

    while (queue.length) {
      const curNode = queue.dequeue().item;

      if (curNode.value === endNode.value) {
        break;
      }

      curNode.discovered = true;

      const undiscoveredNeighbors = curNode.getUndiscoveredAdjacents();

      if (undiscoveredNeighbors.length) {
        for (var i = 0; i < undiscoveredNeighbors.length; i++) {
          const neighbor = undiscoveredNeighbors[i];
          const minDistance = Math.min(neighbor.distance, curNode.distance + 1);

          if (minDistance !== neighbor.distance) {
            neighbor.distance = minDistance;
            neighbor.parent = curNode;

            // Add to queue with new min distance
            if (queue.hasItem(neighbor.value)) {
              queue.changePriority(neighbor, minDistance);
            }
          }

          // Add neighbor to queue for further visiting
          if (!queue.hasItem(neighbor.value)) {
            queue.enqueue(neighbor, neighbor.distance);
          }
        }
      }
    }

    // Walk back and update the cells with the path
    let node = maze.graph.get(endNode.value),
      pathLength = 0;

    if (node.parent) {
      do {
        maze[node.value].pathed = true;
        node = node.parent;
        pathLength += 1;
      } while (node);
    }

    return pathLength;
  }
}
