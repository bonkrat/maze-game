import { Node } from ".";

test("adds adjacents", () => {
  const node = new Node(1);
  const adjacent = new Node(2);
  const adjacent2 = new Node(3);

  node.addAdjacent(adjacent);
  node.addAdjacent(adjacent2);
  expect(node.getAdjacents()).toEqual<Node[]>([adjacent, adjacent2]);
});

test("removes adjacents", () => {
  const node = new Node(1);
  const adjacent = new Node(2);
  const adjacent2 = new Node(3);

  node.addAdjacent(adjacent);
  node.addAdjacent(adjacent2);
  node.removeAdjacent(adjacent);
  expect(node.getAdjacents()).toEqual<Node[]>([adjacent2]);
});

test("get undiscovered adjacents", () => {
  const node = new Node(1);
  const adjacent = new Node(2);
  const adjacent2 = new Node(3);
  adjacent2.discovered = true;

  node.addAdjacent(adjacent);
  node.addAdjacent(adjacent2);

  expect(node.getUndiscoveredAdjacents()).toEqual<Node[]>([adjacent]);
});

test("determines if a node is adjacent", () => {
  const node = new Node(1);
  const adjacent = new Node(2);
  const notAdjacent = new Node(3);

  node.addAdjacent(adjacent);
  expect(node.isAdjacent(adjacent)).toBe<boolean>(true);
  expect(node.isAdjacent(notAdjacent)).toBe<boolean>(false);
});
