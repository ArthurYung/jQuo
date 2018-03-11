/*!
 * jQuo JavaScript Library v1.0
 *
 * Date: 2018-03-11 T00:20Z
 * 袖珍版jQuery
 */

(function(w) {
    //工厂函数
    function jQuo(selector) {
        return new jQuo.fn.init(selector);
    }
    //去首尾字符串正则
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    //提供简写函数
    jQuo.fn = jQuo.prototype = {
        //修正指向
        constructor: jQuo,
        selector: '',
        length: 0,
        toArray: function() {
            return [].slice.call(this);
        },
        get: function(i) {
            return i == null ? this.toArray() :
                (i >= 0 ? this[i] : this[this.length + 1])
        },
        eq: function(i) {
            return i == null ? jQuo() : jQuo(this.get[i])
        },
        each: function(fn) {

            return jQuo.each(this, fn);
        },
        first: function() {
            return this[0]
        },
        last: function() {
            return this[this.length - 1]
        },
        empty: function() {
            this.each(function() {
                this.innerHTML = '';
            });
            //为了链式编程
            return this;
        },
        html: function(html) {
            if (html == null) {
                return this.get(0).innerHTML
            } else {
                this.each(function() {
                    this.innerHTML = html
                })
            };
            //为了链式编程
            return this;
        },
        remove: function() {
            this.each(function() {
                this.parentNode.removeChild(this)
            });
            //为了链式编程
            return this;
        },
        appendTo: function(selector) {
            var result = [],
                tempNode = null,
                $ele = $(selector);
            for (var i = 0; i < this.length; i++) {
                for (var s = 0; s < $ele.length; s++) {

                    //jquery的定义为，只有第一个被添加的为本值，其余均为克隆体
                    tempNode = s === 0 ? this[i] : this[i].cloneNode(true);
                    $ele[s].appendChild(tempNode);
                    result.push(tempNode)

                }
            };
            //链式编程
            return $(result);
        },
        append: function(context) {
            var $context = $(context);

            // 如果是字符串，则累加给所有的元素
            if (typeof context == 'string') {
                for (var i = 0, len = this.length; i < len; i++) {
                    this[i].innerHTML += context;
                }
            }

            // 如果不是字符串，则把$context的每一项添加this的每一项中
            else {
                $context.appendTo(this);
            }

            // 返回this，链式编程
            return this;
        },
        before: function(selector) {
            jQuo._BorA(this, $(selector), 1)
            return this
        },
        after: function(selector) {
            jQuo._BorA(this, $(selector), 0)
            return this
        },
        prependTo: function(selector) {
            var result = [],
                tempNode;

            // 无论传入的是DOM还是jQ对象还是选择器，
            // 统一包装成新的JQ实例，这样就可以统一处理了
            var $selector = jQuo(selector);

            // 遍历每一项被添加的元素( this )
            for (var i = 0, len = this.length; i < len; i++) {

                // 遍历每一项被添加元素的目的地( $selector )
                for (var j = 0, jLen = $selector.length; j < jLen; j++) {

                    // 先得到被添加的元素
                    tempNode = j === 0 ? this[i] : this[i].cloneNode(true);

                    // 添加到指定元素的最前面
                    $selector[j].insertBefore(tempNode, $selector[j].firstChild);

                    // 把被添加的元素存储起来
                    result.push(tempNode);
                }

            }

            // 这样可以对所有被添加的元素进行链式编程。
            return jQuo(result);
        },
        prepend: function(selector) {
            var $context = jQuo(context);

            // 如果是字符串，则累加给所有元素的最前面
            if (typeof context == 'string') {

                // 这里的this，指的是调用者( 即存储N多元素的实例 )
                this.each(function() {

                    // 这里的this，指遍历到的每一个元素
                    this.innerHTML = context + this.innerHTML;
                });
            }

            // 如果不是字符串，则把$context的每一项添加到this每一项的最前面
            else {
                $context.prependTo(this);
            }

            // 返回this，链式编程
            return this;
        },
        css: function(styleName, style) {
            if (arguments.length === 1) {
                if (typeof styleName == 'string') {
                    return jQuery.getStyle(this[0], styleName);
                } else if (jQuo.isObject(styleName)) {
                    // 遍历styleName得到所有的样式
                    for (var key in styleName) {

                        // 遍历得到所有的元素
                        for (var i = 0, len = this.length; i < len; i++) {

                            // 给所有的元素设置遍历到的所有样式
                            this[i]['style'][key] = styleName[key];

                        }

                    }
                }
            } else if (arguments.length >= 2) {
                for (var i = 0, len = this.length; i < len; i++) {
                    this[i]['style'][styleName] = style;
                }
            }
            return this;
        },
        attr: function(attr, val) {
            var self = this;

            // 如果参数个数为1
            if (arguments.length === 1) {

                // 如果是字符串,获取第一个元素指定的属性节点值返回
                if (typeof attr == 'string') {
                    return this[0].getAttribute(attr);
                }

                // 如果是对象,把对象中所有的属性节点添加到所有的元素中
                else if (jQuo.isObject(attr)) {

                    // 使用jQ静态each方法遍历attr对象
                    jQuo.each(attr, function(key, vals) {
                        // 这里遍历到的val不是对象类型，是基本数据类型，


                        // 遍历所有的元素
                        self.each(function() {

                            // 给遍历到的每一个元素分别设置外面遍历到的属性节点
                            this.setAttribute(key, vals);
                        });
                    });
                }
            } else if (arguments.length >= 2) {
                this.each(function() {
                    this.setAttribute(attr, val);
                });
            }

            // 链式编程
            return this;
        },
        hasClass: function(cln) {
            var has = false;

            this.each(function() {

                // 只要有一个元素存在指定的className，那么就修改has变量的值为true
                if ((' ' + this.className + ' ').indexOf(' ' + cln + ' ') > -1) {
                    has = true;

                    // 中断each的遍历
                    return false;
                }
            });

            // 返回has
            return has;
        },
        addClass: function(cln) {

            if (typeof cln == "string") {
                cln = jQuo.trim(cln);

                this.each(function() {
                    var $this = jQuo(this)
                    if (!$this.hasClass(cln)) {
                        this.className += ' ' + cln
                    }
                })


            };
            return this;
        },
        removeClass: function(classNames) {
            var newName
            if (arguments.length === 0) {
                this.each(function() {
                    this.className = '';
                });
            } else {

                // 参数转化为存储所有class的数组
                classNames = jQuo.trim(classNames).split(',');

                // 遍历所有的元素
                this.each(function() {
                    var self = this;

                    // 遍历所有要删除的class
                    jQuo.each(classNames, function(i, val) {

                        // 元素删除指定的class
                        //解决删除class后遗留的空格
                        newName = (' ' + self.className + ' ').replace(' ' + val + ' ', ' ')
                            //解决前后两端留有的空格
                        self.className = jQuo.trim(newName);
                        //self.className = self.className.replace(new RegExp('\\b' + val + '\\b'), '');
                    });
                });
            }

            // 链式编程
            return this;
        },
        on: function(ele, type, fn) {

            var $this, $ele;
            this.each(function() {

                //如果ele为空或者不是string,则将on添加到自身
                if (ele == "" || ele.length == 0) {
                    jQuo._onEach(this, type, fn)
                } else {
                    typeof ele == 'string' && $(this.querySelectorAll(ele)).each(function() {
                        jQuo._onEach(this, type, fn)
                    })
                }

            });
            //链式编程
            return this;

        },
        off: function(type, fn) {
            this.each(function() {

                // 没有绑定过任何事件，就不用处理了
                if (!this.$_event_cache) {
                    return;
                }

                // 如果绑过事件，需要进一步处理
                else {

                    // 如果没有传参，遍历所有的事件数组，分别清空
                    if (arguments.length === 0) {
                        for (var key in this.$_event_cache) {
                            this.$_event_cache[key] = [];
                        }
                    }

                    // 如果传如一个参数，则清空指定事件类型的数组
                    else if (arguments.length === 1) {
                        this.$_event_cache[type] = [];
                    }

                    // 如果传入多个参数，则清空指定事件类型数组中指定的回调函数
                    else {

                        // 遍历对应事件类型的数组，得到每一个回调
                        for (var i = this.$_event_cache[type].length - 1; i >= 0; i--) {

                            // 依次和传入的回调比较，如果相等，则从数组中剔除
                            if (this.$_event_cache[type][i] === fn) {
                                this.$_event_cache[type].splice(i, 1);
                            }
                        }
                    }
                }
            });

            // 链式编程
            return this;
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice
    };
    jQuo.extend = jQuo.fn.extend = function(obj) {
        var target = arguments[0];
        if (arguments.length === 1) {
            target = this
            for (var key in obj) {
                target[key] = obj[key]
            };
            return target;
        } else if (arguments.length >= 2) {
            for (var i = 1; i < arguments.length; i++) {
                for (var j in arguments[i]) {
                    target[j] = arguments[i][j]
                }
            }
        }
        return target
    }
    jQuo.extend({
        trim: function(text) {
            //清除前后空格
            return text == null ? "" : (text + "").replace(rtrim, "");
        },

        isHtml: function(decide) {
            //判断是否为html标签元素
            if (!decide) {
                return false;
            } else {
                return decide[0] === "<" && decide[decide.length - 1] === ">" && decide.length >= 3
            }
        },
        isLikeArray: function(decide) {
            if (typeof decide == 'function' || (!!decide && decide.window === decide) || typeof decide !== 'object') {
                //判断是否为 function 或 window 或对象
                return false;
            };
            if (({}).toString.call(decide) == '[object Array]') {
                //判断是不是真数组
                return true;
            };
            //判断是否为伪数组
            return ("length" in decide) && (decide.length == 0) || (decide.length - 1 in decide);

        },
        isObject: function(obj) {

            // 防止typeof对null的误判
            if (obj === null) {
                return false;
            }

            // 如果是object或function，那就是对象
            if (typeof obj === 'object' || typeof obj === 'function') {
                return true;
            }

            return false;
        },
        isDom: function(ele) {
            //判断是否为dom元素
            if (typeof HTMLElement === 'object') {
                //a instanceof b 判断a是否在b的原型链上
                return ele instanceof HTMLElement;
            } else {
                return ele && typeof ele === 'object' && ele.nodeType === 1 && typeof ele.nodeName === 'string'
            }
        },
        ready: function(fn) {
            if (document.readyState == 'complete') {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn)
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState == 'complete') {
                        fn();
                    }
                })
            }
        },
        each: function(obj, fn) {
            var i, len, key;

            if (jQuo.isLikeArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {

                    if (fn.call(obj[i], i, obj[i]) === false) {
                        break;
                    };

                }
            }
            return obj;
        },
        /***********************仅用于实列befor和after方法************************************************/
        _BorA: function(dom, ele, or) {
            var tempNode = null,
                position;
            jQuo.each(dom, function(i, a) {
                for (var j = 0; j < ele.length; j++) {
                    //真正的selector添加到this的第一个
                    tempNode = i === 0 ? ele[j] : ele[j].cloneNode(true);
                    //如果存在父节点，则将selector添加到其之前或之后
                    position = or === 1 ? a : a.nextSibling;
                    a.parentNode && a.parentNode.insertBefore(tempNode, position)
                }
            })
        },
        /***********************仅用于实列on方法************************************************/
        _onEach: function($this, type, fn) {
            $this.$_event_cache = $this.$_event_cache || {};
            // 如果之前没有对应事件的数组，说明是第一次绑定该事件
            if (!$this.$_event_cache[type]) {
                $this.$_event_cache[type] = [];
                $this.$_event_cache[type].push(fn);
                // 如果是第一个绑定该事件，那么需要真正调用浏览器的方法进行事件绑定
                jQuo.addEvent($this, type, function(e) {
                    for (var i = 0, len = $this.$_event_cache[type].length; i < len; i++) {
                        $this.$_event_cache[type][i].call($this, e);
                    }
                })
            } else {
                $this.$_event_cache[type].push(fn);
            }
        },
        getStyle: function(elem, att) {
            var view = elem.ownerDocument.defaultView;

            if (!view.opener) {
                view = w;
            }
            if (view.getComputedStyle) {

                //优先使用W3C规范

                return view.getComputedStyle(elem)[att];

            } else {

                //针对IE9以下兼容

                return elem.currentStyle[att];

            }

        },
        addEvent: function(dom, type, fn) {
            if (!jQuo.isDom(dom)) {
                return;
            }
            //兼容添加事件
            if (dom.addEventListener) {
                dom.addEventListener(type, fn)
            } else {
                dom.attachEvent('on' + type, fn)
            };
        },
        removeEvent: function(dom, type, fn) {
            if (!jQuo.isDom(dom)) {
                return;
            }
            // 兼容移除事件
            if (ele.removeEventListener) {
                ele.removeEventListener(type, fn);
            } else {
                ele.detachEvent('on' + type, fn);
            }
        },
        ajaxSettings: {
            url: location.href, //请求路径
            type: "GET", //请求方式
            async: true, //是否异步
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", //豹纹头
            dataType: '*',
            timeout: null,
            success: function() {},
            error: function() {},
            complete: function() {}
        },
        // 把对象转换为url参数形式的字符串
        urlStringify: function(data) {
            var result = '',
                key;

            // 传入的不是对象，就直接返回空字符串
            if (!jQuo.isObject(data)) {
                return result;
            }

            for (key in data) {
                // 为了防止IE发送的汉字路乱码，所以需要统一编码一下
                result += window.encodeURIComponent(key) + '=' + window.encodeURIComponent(data[key]) + '&';
            }

            // 从0截取到倒数第一个字符串返回
            return result.slice(0, -1);
        },
        // 加工options
        processOptions: function(options) {
            var optionsNew = {};

            // 合并用户和默认的配置项，得到一份新的
            optionsNew = {};
            jQuo.extend(optionsNew, jQuo.ajaxSettings, options);

            // 对data进行加工处理
            optionsNew.data = jQuo.urlStringify(optionsNew.data);

            // 把type统一转换为大写，防止意外
            optionsNew.type = optionsNew.type.toUpperCase();

            // 如果是GET请求，把数据加到URL中
            if (optionsNew.type === 'GET') {
                optionsNew.url += '?' + optionsNew.data;
                optionsNew.data = null;
            }

            // 返回加工后的配置
            return optionsNew;
        },
        ajax: function(options) {
            var optionsNew = {},
                xhr, result;
            optionsNew = jQuo.processOptions(options);
            xhr = new XMLHttpRequest();
            if (optionsNew.type === 'GET') {
                optionsNew.url += '?' + jQuo.urlStringify(optionsNew.data);
            }
            xhr.open(optionsNew.type, optionsNew.url, optionsNew.async);
            xhr.onreadystatechange = function() {

                // 先判断请求是否完成，完成就执行complate方法
                if (xhr.readyState === 4) {
                    optionsNew.complete();

                    // 判断请求是否成功，成功过就执行successs方法，失败执行error方法
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        switch (optionsNew.dataType) {
                            case "jason":
                                result = JSON.parse(xhr.responseText);
                                break;
                            case "script":
                                eval(xhr.responseText);
                                result = xhr.responseText;
                                break;
                            case "style":
                                $("<style></style>").html(xhr.responseText).appendTo("head");
                                result = xhr.responseText;
                                break;
                            default:
                                break
                        }
                        optionsNew.success(xhr.responseText);
                    } else {
                        optionsNew.error(xhr.status);
                    }
                }
            };
            xhr.send(optionsNew.data);
        }

    })

    var init = jQuo.fn.init = function(selector) {
        if (!selector) {
            return this;
        }
        if (typeof selector == 'function') {
            jQuo.ready(selector);
        } else if (typeof selector === "string") {
            var ele = jQuo.trim(selector);
            //如果是html片段  创建dom添加到实列
            if (jQuo.isHtml(ele)) {
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = ele;
                [].push.apply(this, tempDiv.childNodes);
                return this;
            } else {
                try {
                    var nodes = document.querySelectorAll(ele);
                    [].push.apply(this, nodes);
                    return this;
                } catch (e) {
                    this.length = 0;
                    return this;
                }
            }
        } else if (jQuo.isLikeArray(selector)) {
            //解决IE8 apply无法借用伪数组
            [].push.apply(this, [].slice.call(selector));
            return this;
        } else {
            this[0] = ele;
            this.length = 1;
        }
    };

    //提供制作插件访问原型的接口
    init.prototype = jQuo.fn;

    w.jQuo = w.$ = jQuo;

}(window));