/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from './logger';

class RequestManager {
  private inflightRequests = new Map<string, Promise<any>>();
  private abortControllers = new Map<string, AbortController>();

  /**
   * Tracks an active promise in the inflight registry, returning it to deduplicate duplicate calls.
   */
  getOrCreatePromise<T>(key: string, creator: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const existing = this.inflightRequests.get(key);
    if (existing) {
      logger.info(`Deduplicating active concurrent request for key: ${key}`);
      return existing;
    }

    // Cancel any stale abort controllers registered for the same endpoint pattern
    this.cancelStaleRequest(key);

    const controller = new AbortController();
    this.abortControllers.set(key, controller);

    const promise = creator(controller.signal)
      .then((res) => {
        this.cleanup(key);
        return res;
      })
      .catch((err) => {
        this.cleanup(key);
        throw err;
      });

    this.inflightRequests.set(key, promise);
    return promise;
  }

  /**
   * Aborts an existing active request if it is still inflight.
   */
  cancelStaleRequest(key: string): void {
    const controller = this.abortControllers.get(key);
    if (controller) {
      logger.info(`Cancelling active stale request for key: ${key}`);
      controller.abort();
      this.cleanup(key);
    }
  }

  private cleanup(key: string): void {
    this.inflightRequests.delete(key);
    this.abortControllers.delete(key);
  }
}

export const requestManager = new RequestManager();
