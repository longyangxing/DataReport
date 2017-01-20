// 散点图组件js代码
var H5ComponentPoint = function( name , cfg ){
	var component = new H5ComponentBase( name , cfg );
	//散点图大小设置基数
	var base = cfg.data[0][1];

	$( cfg.data ).each(function( index , item ){
		var point = $( '<div class="point point_'+ index + '">' );
		var name  = $( '<div class="name">' + item[0] + '</div>' );
		var rate  = $('<div class="rate">' + (item[1]*100) +'%</div>' );
		name.append( rate );
		point.append( name );
		var per = ( item[1] / base )*100;

		point.width( per + '%' ).height( per + '%' );
		if( item[2] ){
			point.css('backgroundColor', item[2]);
		}
		if( item[3] !== undefined && item[4] !== undefined ){
			point.css( 'left' , item[3] ).css( 'top' , item[4] );
			//暂存left、top值到元素上
			point.data( 'left', item[3] ).data( 'top' , item[4]);
			// 
		}

		//设置z-index&&重设位置
		point.css( 'zIndex', 99-index );
		point.css( 'left' , 100 - point.width() ).css( 'top' , 100 - point.width());
		point.css('transition','all 1s '+index*.5+'s')
		component.append( point );
		 // alert(point.data( 'top'))
	});

	component.on( 'onLoad' , function(){
		 var pointL = component.find('.point');
		 $( pointL ).each(function( index , item){
		 	 if( $( item ).data( 'top' ) !== undefined && $( item ).data( 'left' ) !== undefined){
		 	 	$( item ).css( 'left' , $( item ).data( 'left' ) ).css( 'top' , $( item ).data( 'top' ) );
		 	 }
		 })
		 return false;
	});
	component.on( 'onLeave' , function(){
		var pointL = component.find('.point');
	      pointL.each(function( index , item ){
			  var comH = component.width();
			  var itemH = $( item ).width();
			  // alert(itemH)
		      $( item ).css( 'left' , (comH - itemH)/2 ).css( 'top' , (comH - itemH)/2 );
		})
		return false;
	})

	return component;

}