(function ($) {
    var tmpl = '<div class="modal" id="{2}">' +
                  '<div class="modal-dialog  modal-sm">' +
                    '<div class="modal-content">' +
                      '<div class="modal-header">' +
                        '<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                        '<h4 class="modal-title">{0}</h4>' +
                      '</div>' +
                      '<div class="modal-body">' +
                        '<p>{1}</p>' +
                      '</div>' +
                      '<div class="modal-footer"></div>' +
                    '</div>' +
                  '</div>' +
                '</div>';
    var defaults = {
        title: '提示',
        content: ''
    };
    /* 静态方法 */
    $.extend({
        format: function (str_tmpl, arg) {
            var result = str_tmpl;
            for (var i = 1; i < arguments.length; i++)
                result = result.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
            return result;
        },
        alert: function (options, callback) {
            if (typeof options == 'string') {
                options = { content: options };
            }
            var settings = $.extend({}, defaults, options);
            var id = 'm_' + new Date().getTime();
            var $dig = $(this.format(tmpl, settings.title, settings.content, id));
            $dig.appendTo("body");
            $dig.modal({
                backdrop: 'static'
            }).modal('show');
            $('.close', $dig).click(function () {
                $dig.next('.modal-backdrop').remove();
                $dig.remove();
                if (typeof callback == "function") callback();
            });
            $('<button type="button" class="btn btn-primary">确定</button>').bind('click', function () {
                $('#' + id).next('.modal-backdrop').remove();
                $('#' + id).remove();
                if (typeof callback == "function") callback();
            }).appendTo('#' + id + ' .modal-footer');

        },
        confirm: function (options, callback) {
            if (typeof options == 'string') {
                options = { content: options };
            }
            var settings = $.extend({}, defaults, options);
            var id = 'm_' + new Date().getTime();
            var $dig = $(this.format(tmpl, settings.title, settings.content, id));
            $dig.appendTo("body");
            $dig.modal({
                backdrop: 'static'
            }).modal('show');
            $('.close', $dig).click(function () {
                $dig.next('.modal-backdrop').remove();
                $dig.remove();
                if (typeof callback == "function") callback(false);
            });
            $('<button type="button" class="btn btn-primary">确定</button>').bind('click', function () {
                $('#' + id).next('.modal-backdrop').remove();
                $('#' + id).remove();
                if (typeof callback == "function") callback(true);
            }).appendTo('#' + id + ' .modal-footer');

            $('<button type="button" class="btn btn-default">取消</button>').bind('click', function () {
                $('#' + id).next('.modal-backdrop').remove();
                $('#' + id).remove();
                if (typeof callback == "function") callback(false);
            }).appendTo('#' + id + ' .modal-footer');

        },
        prompt: function (options, callback) {
            if (typeof options == 'string') {
                options = { content: options };
            }
            var settings = $.extend({}, defaults, options);
            var id = 'm_' + new Date().getTime();
            settings.content = settings.content + '<br/><input type="text" id="prompt_result" />';
            var $dig = $(this.format(tmpl, settings.title, settings.content, id));
            $dig.appendTo("body");
            $dig.modal({
                backdrop: 'static'
            }).modal('show');
            $('.close', $dig).click(function () {
                $dig.next('.modal-backdrop').remove();
                $dig.remove();
                if (typeof callback == "function") callback('');
            });
            $('<button type="button" class="btn btn-primary">确定</button>').bind('click', function () {
                var ret = $('#' + id + " #prompt_result").val();
                $('#' + id).next('.modal-backdrop').remove();
                $('#' + id).remove();
                if (typeof callback == "function") callback(ret);
            }).appendTo('#' + id + ' .modal-footer');

            $('<button type="button" class="btn btn-default">取消</button>').bind('click', function () {
                $('#' + id).next('.modal-backdrop').remove();
                $('#' + id).remove();
                if (typeof callback == "function") callback('');
            }).appendTo('#' + id + ' .modal-footer');

        },
        loading: function (target) {
            var mask = $('<div class="mask"></div>');
            var loading = $('<div class="ui-loading"></div>')
            if (target) {
                $(target).css('position', 'relative');
                mask.css('position', 'absolute');
                loading.css('position', 'absolute');
                mask.appendTo(target);
                loading.appendTo(target);
            } else {
                mask.appendTo("body");
                loading.appendTo("body");
            }
        },
        unloading: function (target) {
            if (target) {
                $(target + ' .mask').remove();
                $(target + ' .ui-loading').remove();
            } else {
                $('.mask').remove();
                $('.ui-loading').remove();
            }
        }
    });
})(jQuery)
