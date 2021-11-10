import { Node } from ".";

export class Graph extends Map {
  get: (value: number) => Node;

  addVertex(value: number) {
    if (this.has(value)) {
      return this.get(value);
    }

    const vertex = new Node(value);
    this.set(value, vertex);
    return vertex;
  }

  removeVertex(value: number) {
    const current = this.get(value);

    if (current) {
      for (const node of this.values()) {
        node.removeAdjacent(current);
      }
    }

    return this.delete(value);
  }

  addEdge(source: number, destination: number) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);
    destinationNode.addAdjacent(sourceNode);

    return [sourceNode, destinationNode];
  }

  removeEdge(source: number, destination: number) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.removeAdjacent(destinationNode);
    destinationNode.removeAdjacent(sourceNode);

    return [sourceNode, destinationNode];
  }
}
