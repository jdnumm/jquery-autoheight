/*
 *  Copyright (c) 2014 Daniel Nümm under the MIT License 
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Please report any bug at daniel.nuemm@blacktre.es
 */

;(function ( $, window, document, undefined ) {
    // Create the defaults
    var pluginName = "AutoHeight",
    defaults = {
    };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Detect device width set layout.
            var buildHeightFix = function (obj) {
                var full_width = $(obj.element).width()-10;
            }
            buildHeightFix(this);
        },
    };

    $.fn[ pluginName ] = function ( options ) {

        function reset(obj) {
            obj.each(function() {
                $(this).height('auto');
            });
        }

        function setup(obj) {
            reset(obj);
            var obj_list = new Array();
            var max = 0;

            // Find the largest object height.
            obj.each(function() {
                h = $(this).height();
                if (h >= max) {
                    max = h
                }
            });
            // and make all objects equal in height.
            obj.each(function() {
                $(this).height(max);
            });

            // Now find Objects in the same row and group them together.
            obj.each(function() {
                t = $(this).offset().top;
                if ( obj_list[t] != undefined ) {
                    obj_list[t].push(this);
                } else {
                    obj_list[t] = new Array(this);;
                }
            });

            reset(obj);

            // for every row...
            for (var k in obj_list) {
                var max = 0;
                // find the largest height...
                for (var i in obj_list[k]) {
                    h = $(obj_list[k][i]).height();
                    if (h >= max) {
                        max = h
                    }
                }
                // and set all other objects in the row to the same value.
                for (var i in obj_list[k]) {
                    $(obj_list[k][i]).height(max);
                }
            }

        }

        function resizeEvent(obj) {
            var doit;
            $(window).bind('resize', function(e) {
                clearTimeout(doit);
                doit = setTimeout(function() { setup(obj) } , 100)
            });
        }

        $(window).load(setup(this));
        resizeEvent(this);

        // chain jQuery functions
        return this;
    };
})( jQuery, window, document );
