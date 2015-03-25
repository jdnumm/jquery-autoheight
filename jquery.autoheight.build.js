;(function($,window,document,undefined){ var pluginName="AutoHeight",defaults={};function Plugin(element,options){this.element=element;this.settings=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init();}
Plugin.prototype={init:function(){var buildHeightFix=function(obj){var full_width=$(obj.element).width()-10;}
buildHeightFix(this);},};$.fn[pluginName]=function(options){function reset(obj){obj.each(function(){$(this).height('auto');});}
function setup(obj){reset(obj);var obj_list=new Array();var max=0;obj.each(function(){h=$(this).height();if(h>=max){max=h}});obj.each(function(){$(this).height(max);});obj.each(function(){t=$(this).offset().top;if(obj_list[t]!=undefined){obj_list[t].push(this);}else{obj_list[t]=new Array(this);;}});reset(obj);for(var k in obj_list){var max=0;for(var i in obj_list[k]){h=$(obj_list[k][i]).height();if(h>=max){max=h}}
for(var i in obj_list[k]){$(obj_list[k][i]).height(max);}}}
function resizeEvent(obj){var doit;$(window).bind('resize',function(e){clearTimeout(doit);doit=setTimeout(function(){setup(obj)},100)});}
$(window).load(setup(this));resizeEvent(this); return this;};})(jQuery,window,document);