import { PriorityQueue } from "./PriorityQueue";

let queue;

beforeEach(() => {
  queue = new PriorityQueue();

  queue.enqueue(1, 5);
  queue.enqueue(2, 4);
  queue.enqueue(3, 5);
  queue.enqueue(4, 60);
  queue.enqueue(5, 0);
});

test("enqueues a new item according to priority", () => {
  expect(queue).toMatchObject({
    0: { item: 5, priority: 0 },
    1: { item: 2, priority: 4 },
    2: { item: 1, priority: 5 },
    3: { item: 3, priority: 5 },
    4: { item: 4, priority: 60 },
    length: 5,
  });
});

test("dequeues an item from the queue", () => {
  const length = queue.length;
  const nextItem = queue.dequeue();

  expect(nextItem).toMatchObject({ item: 5, priority: 0 });

  expect(queue.length).toBe(length - 1);
});

test("changes priority of an item", () => {
  queue.changePriority(4, 1);
  expect(queue).toMatchObject({
    0: { item: 5, priority: 0 },
    1: { item: 4, priority: 1 },
    2: { item: 2, priority: 4 },
    3: { item: 1, priority: 5 },
    4: { item: 3, priority: 5 },
    length: 5,
  });
});

test("determines if the queue has the item", () => {
  expect(queue.hasItem(5)).toBe(true);
  expect(queue.hasItem(100)).toBe(false);
});
