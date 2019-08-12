import Immutable from 'immutable';
let pending = Immutable.Map();

export default function apiClientMiddleware(apiClient) {
    return ({getState, dispatch}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {promise, types, upload, ...rest} = action;

            if (!Array.isArray(types) && promise) {
                return Promise.resolve(promise().then(() => {
                    next(action);
                }));
            }

            if (!promise) {
                return next(action);
            }

            // get the request data
            const [REQUEST, SUCCESS, FAILURE] = types;

            if (promise && upload) {
                const PROGRESS = types[3];
                console.log(PROGRESS);
                apiClient.setConfig('onUploadProgress', (progressEvent) => {
                    next({...rest, type: PROGRESS, progressEvent});
                })
            }

            // if there is a pending request of the same type
            // use that instead for a queue
            let resolvePromise = null;
            if (pending.has(REQUEST)) {
                resolvePromise = pending.get(REQUEST)
                    .then(() => {
                        //fire the request itself
                        next({...rest, type: REQUEST});

                        return Promise.resolve(
                            promise(apiClient, getState)
                                .then(result => {
                                    // clear this promise from the queue
                                    pending = pending.remove(REQUEST);
                                    apiClient.resetConfigs();
                                    // send back a success result
                                    return next({...rest, result, type: SUCCESS});
                                })
                                .catch(error => {
                                    // clear this promise from the queue
                                    pending = pending.remove(REQUEST);
                                    apiClient.resetConfigs();
                                    // send back an error result
                                    return next({...rest, error, type: FAILURE});
                                })
                        );
                    });
            } else {
                // fire off the request to show we are making this request
                next({...rest, type: REQUEST});

                resolvePromise = promise(apiClient, getState)
                    .then(result => {
                        apiClient.resetConfigs();
                        // clear this promise from the queue
                        pending = pending.remove(REQUEST);
                        // send back a success result
                        return next({...rest, result, type: SUCCESS});
                    })
                    .catch(error => {
                        // clear this promise from the queue
                        pending = pending.remove(REQUEST);
                        apiClient.resetConfigs();
                        // send back an error result
                        return next({...rest, error, type: FAILURE});
                    })
            }

            // set this as request type as pending
            pending = pending.set(REQUEST, resolvePromise);

            return resolvePromise;
        };
    };
}