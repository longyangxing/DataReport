// 环图组件js代码
var H5ComponentRing = function( name , cfg ){
	if( cfg.data.length > 1){
		cfg.data = cfg.data.slice( 0 , 1 );
	}
	// alert(cfg.data.length)
	var mask = $('<div class="mask">');
	var component = new H5ComponentPie( name , cfg )
	// component.addClass( 'h5_component_name_pie');
	// alert($('.text'))
	var text = component.find('.text');

	text.attr( 'style' , '' );//清空继的样式
	if( cfg.data[0][2] ){
		text.css( 'color' ,  cfg.data[0][2] );
	}
	mask.append( text );

	
	component.append( mask );
	return component;

}