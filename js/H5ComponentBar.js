//柱状图组件js代码
var H5ComponentBar = function( name , cfg ){
	var component = new H5ComponentBase( name , cfg );
	//散点图大小设置基数
	$( cfg.data ).each(function( index , item ){
		var line = $( '<div class="line">');
		var name = $( '<div class="name">')
		var rate = $( '<div class="rate">');
		var per  = $( '<div class="per">');
		var width = item[1]*100 + '%';
		var bgStyle = '';

		name.text( item[0] );
		rate.width( width );
		if( item[2] !== undefined ){
			bgStyle = 'style="background-color:' + item[2] +';"';
		}
		rate.html( '<div class="bg" '+bgStyle+'></div>');
		per.text( width );
		line.append( name ).append( rate ).append( per );
		component.append( line );
	})
	return component;

}