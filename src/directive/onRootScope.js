angular.module('common.config', [])
    .config(function ($provide) {
        $provide.decorator('$rootScope', function ($delegate) {
            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                value(name, listener){
                    const s = $delegate.$on(name, listener);
                    this.$on('$destory', s);
                    return s;
                },
                enumerable: false
            });
            return $delegate;
        })
    });
    