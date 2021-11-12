export class Effect {
  timestamp: number;
  duration: number;

  constructor(timestamp, duration = 500) {
    this.timestamp = timestamp;
    this.duration = duration;
  }
}
