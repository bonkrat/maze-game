export class Node {
  value: number;
  adjacents: Node[];
  distance: number;
  discovered: boolean;
  parent: Node;

  constructor(value) {
    this.value = value;
    this.adjacents = [];
    this.distance = Infinity;
    this.discovered = false;
    this.parent = null;
  }

  addAdjacent(node: Node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node: Node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }

  getUndiscoveredAdjacents() {
    return this.adjacents.filter((a) => !a.discovered);
  }

  isAdjacent(node: Node) {
    return this.adjacents.indexOf(node) > -1;
  }
}
