export type EventCallback<T> = (payload: T) => void;

export type EventMap = {
  throttled: EventThrottledPayload;
};

export type EventThrottledPayload = {
  message?: string | null;
  endpoint?: string;
};
