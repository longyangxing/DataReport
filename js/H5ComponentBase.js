// 基本图文组件js代码
var H5ComponentBase = function( name , cfg ,relativeTo){

	var cfg = cfg || {};
	var id  = ( 'h5_c_' + Math.random() ).replace('.','_');
	//添加组件样式进行标注
	var cls = ' h5_component_'+cfg.type;
	var component = $('<div class="h5_component h5_component_name_'+name+cls+'"'+' id='+id+'>');

	cfg.text && component.text( cfg.text );
	cfg.width && component.width( cfg.width/2 );
	// 修正
	// cfg.width && component.width( cfg.width );
	cfg.height && component.height( cfg.height/2 );
	// cfg.height && component.height( cfg.height );
	cfg.css && component.css( cfg.css );
	// alert('url('+cfg.bg+')')

	cfg.bg  && component.css( 'backgroundImage','url('+cfg.bg+')');
	if( cfg.center === true ){
		component.css({
			// 修正
			marginLeft : ( cfg.width/4 * -1 ) +'px',
			// marginLeft : ( cfg.width/2 * -1 ) +'px',
			left: '50%'
		})
	}
	
	//自定义参数
	if( typeof cfg.onclick === 'function' ){
		component.click( cfg.onclick );
	}
	// 测试relativeTo参数
	if( relativeTo ){

		//获取偏移的参照对象
		var $target = $( '.h5_component_name_' + relativeTo.target );
		//参照对象高度
		var target_H = $target.height();
		//组件偏离高度
		var offsetTop = parseInt( $target.position().top ) + parseInt( target_H );
		var offsetLeft = parseInt( $target.position().left);
		// alert($(component).attr('class'))
		 // alert(offsetTop + relativeTo.offsetY)
	    relativeTo.offsetY && $(component).css( "top" , offsetTop + relativeTo.offsetY );

	    if( cfg.center !== true ){

	    	relativeTo.offsetX &&$ (component).css( "left" , offsetLeft );
	    }
	}


	//离场动画
		component.on('onLeave',function(){
			var $_this = $(this)
			setTimeout(function(){
				$_this.addClass( cls +'_onLeave' ).removeClass( cls +'_onLoad' );
				cfg.animateOut && $_this.animate( cfg.animateOut );
			}, cfg.delay || 0)
			return false;

		});

			//入场动画
		component.on('onLoad',function(){
			var $_this = $(this);
			setTimeout(function(){
				$_this.addClass( cls +'_onLoad' ).removeClass( cls +'_onLeave' );
				cfg.animateIn && $_this.animate( cfg.animateIn );
			}, cfg.delay || 0)
			return false;
		})
		
	return component;

}