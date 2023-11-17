const delayedFunc = (func, delay = 1000) => new Promise(() => {
    setTimeout(() => {
        func();
    }, delay);
});
export default delayedFunc;
//# sourceMappingURL=delayedFunc.js.map