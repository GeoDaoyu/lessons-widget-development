import { useEffect } from 'react';

export function useWatches(obj: any, names: string[], callback: any) {
  useEffect(() => {
    if (!obj) {
      return;
    }
    const handles = names.map(name => obj.watch(name, callback));
    return function removeHandles() {
      handles.forEach(handle => {
        handle.remove();
      });
    };
  }, [obj, names, callback]);
}

export function useWatch(obj: any, name: string, callback: any) {
  useWatches(obj, [name], callback);
}