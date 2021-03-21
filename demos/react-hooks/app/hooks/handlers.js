define(["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWatch = exports.useWatches = exports.useEvent = exports.useEvents = void 0;
    function useEvents(obj, names, callback) {
        react_1.useEffect(function () {
            if (!obj) {
                return;
            }
            var handles = names.map(function (name) { return obj.on(name, callback); });
            return function removeHandles() {
                handles.forEach(function (handle) {
                    handle.remove();
                });
            };
        }, [obj, names, callback]);
    }
    exports.useEvents = useEvents;
    function useEvent(obj, name, callback) {
        useEvents(obj, [name], callback);
    }
    exports.useEvent = useEvent;
    function useWatches(obj, names, callback) {
        react_1.useEffect(function () {
            if (!obj) {
                return;
            }
            var handles = names.map(function (name) { return obj.watch(name, callback); });
            return function removeHandles() {
                handles.forEach(function (handle) {
                    handle.remove();
                });
            };
        }, [obj, names, callback]);
    }
    exports.useWatches = useWatches;
    function useWatch(obj, name, callback) {
        useWatches(obj, [name], callback);
    }
    exports.useWatch = useWatch;
});
//# sourceMappingURL=handlers.js.map