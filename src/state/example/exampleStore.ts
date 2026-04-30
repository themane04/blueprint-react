import { create } from "zustand";

import type { ExampleState } from "./types.ts";

/** Global example store. Holds example state and actions for demonstration purposes. */
export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  isLoading: false,

  /** Increments the count value by 1. */
  increment(): void {
    set((state) => ({ count: state.count + 1 }));
  },

  /** Decrements the count value by 1. */
  decrement(): void {
    set((state) => ({ count: state.count - 1 }));
  },

  /** Simulates an asynchronous operation that sets loading state. Resets loading after a delay. */
  async simulateAsyncOperation(): Promise<void> {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    set({ isLoading: false });
  }
}));
