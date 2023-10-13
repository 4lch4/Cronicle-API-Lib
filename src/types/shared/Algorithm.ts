/** This enum defines the possible values for the `algo` property of an event. */
export enum Algorithm {
  /** Pick a random server from the group. */
  Random = 'random',

  /** Pick each server in sequence (alphabetically sorted). */
  RoundRobin = 'round_robin',

  /** Pick the server with the least amount of CPU usage in the group. */
  LeastCpu = 'least_cpu',

  /** Pick the server with the least amount of memory usage in the group. */
  LeastMem = 'least_mem',

  /**
   * Prefer the first server in the group (alphabetically sorted), only picking alternatives if the
   * first server is unavailable.
   */
  PreferFirst = 'prefer_first',

  /**
   * Prefer the last server in the group (alphabetically sorted), only picking alternatives if the
   * last server is unavailable.
   */
  PreferLast = 'prefer_last',

  /** Run the event on **all** servers in the group simultaneously (see below). */
  Multiplex = 'multiplex',
}
