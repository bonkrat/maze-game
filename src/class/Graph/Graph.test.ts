import { Graph, Node } from ".";

test("adds vertex", () => {
  const graph = new Graph();
  graph.addVertex(1);
  const expectedNode = new Node(1);
  expect(graph.size).toBe(1);
  expect(graph.get(1)).toEqual<Node>(expectedNode);
});

test("removes vertex", () => {
  const graph = new Graph();
  graph.addVertex(1);
  graph.removeVertex(1);
  expect(graph.size).toBe<number>(0);
});

test("adds edges", () => {
  const graph = new Graph(),
    [source, destination] = graph.addEdge(1, 2);
  expect(graph.size).toBe<number>(2);
  expect(source.adjacents).toEqual<Node[]>([destination]);
  expect(destination.adjacents).toEqual<Node[]>([source]);
});

test("removes edges", () => {
  const graph = new Graph(),
    [source, destination] = graph.addEdge(1, 2);

  graph.removeEdge(1, 2);

  expect(graph.size).toBe<number>(2);
  expect(graph.get(1)).toEqual<Node>(source);
  expect(graph.get(2)).toEqual<Node>(destination);
  expect(source.adjacents).toEqual<Node[]>([]);
  expect(destination.adjacents).toEqual<Node[]>([]);
});
