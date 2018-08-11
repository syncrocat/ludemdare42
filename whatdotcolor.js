app.whatdotcolor = function(x, y, width, height) {
    let context = app.renderer.context;
    let rgba = context.getImageData(x, y, width, height).data;
    return rgba;
};
