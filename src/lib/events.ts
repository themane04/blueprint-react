/**
 * A simple event emitter for inter-component communication.
 * Supports registering, emitting, and unregistering event listeners.
 */
import type { EventCallback, EventMap } from "./types.ts";

/**
 * Holds the registered event listeners.
 * Each event type maps to an array of callback functions.
 */
const listeners: {
  [K in keyof EventMap]: EventCallback<EventMap[K]>[];
} = {
  throttled: []
};

/**
 * Event emitter object with methods to register, emit, and unregister events.
 */
export const events = {
  /**
   * Register an event listener for a specific event type.
   * @param event The event type to listen for.
   * @param cb The callback function to invoke when the event is emitted.
   */
  on<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>): void {
    listeners[event].push(cb);
  },

  /**
   * Emit an event, invoking all registered listeners for that event type.
   * @param event The event type to emit.
   * @param payload The data to pass to the event listeners.
   */
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    listeners[event].forEach((cb) => cb(payload));
  },

  /**
   * Unregister an event listener for a specific event type.
   * @param event The event type to stop listening for.
   * @param cb The callback function to remove from the listeners.
   */
  off<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>): void {
    listeners[event] = listeners[event].filter((fn) => fn !== cb);
  }
};
