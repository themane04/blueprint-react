import type { ExampleState } from "./types.ts";

/**
 * Returns the current count value from the example store.
 * @param state - The example store state.
 * @returns The current count value.
 */
export const selectCount = (state: ExampleState): number => state.count;

/**
 * Returns whether the example store is currently loading data.
 * @param state - The example store state.
 * @returns True if the store is loading data.
 */
export const selectIsLoading = (state: ExampleState): boolean => state.isLoading;
