const delayedFunc = (func: Function, delay: number = 1000) =>
    new Promise(() => {
        setTimeout(() => {
            func();
        }, delay);
    });

export default delayedFunc;
