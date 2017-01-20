// 柱状图图组件js代码
var H5ComponentBar_v = function( name , cfg ){
	var component = new H5ComponentBar( name , cfg);
	//设置每一项的宽度
	var width = ( 100/cfg.data.length ) >> 0;
	component.find('.line').width( width + '%' );
	$.each( component.find('.rate') , function(){
		var w = $(this).css( 'width' );
		$(this).height( w ).width('');
	});
	$.each( component.find('.per') , function(){
		$(this).appendTo( $(this).prev() );
		// alert($(this).prev().attr('class'))
	});
 	return component;
}