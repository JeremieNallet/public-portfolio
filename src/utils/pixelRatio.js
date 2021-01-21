export const pixelRatio = (ctx) => {
    let backingStore =
        ctx.backingStorePixelRatio ||
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
    return (window.devicePixelRatio || 1) / backingStore;
};
