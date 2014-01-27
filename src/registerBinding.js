﻿define(["jquery", "knockout", "ko.bindings/inject", "ko.bindings/windowInject", "widgetFor"], function ($, ko, inject, windowInject, widgetFor) {

    return function registerBinding(Widget, bindingName, handlers) {
        if (ko.bindingHandlers[bindingName]) {
            throw new Error("Binding conflict. Binding '" + bindingName + "' is already exist");
        }

        ko.bindingHandlers[bindingName] = {
            'init': function (element, valueAccessor) {

                var widget = new Widget();
                if (handlers && handlers.windowInject == true) {
                    windowInject(element, widget);
                } else {
                    inject(element, widget);
                }

                if (handlers && handlers.init) {
                    handlers.init(widget, valueAccessor);
                }

                return { controlsDescendantBindings: true };
            },
            'update': function (element, valueAccessor) {
                var widget = widgetFor(element);
                if (handlers && handlers.update) {
                    handlers.update(widget, valueAccessor);
                }
                if (!(handlers && (handlers.init || handlers.update))) {
                    widget.init(ko.unwrap(valueAccessor()));
                }
            }
        };

    }
});