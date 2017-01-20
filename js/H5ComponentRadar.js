// 折线图组件js代码
var H5ComponentRadar = function( name , cfg ){
	var component = new H5ComponentBase( name , cfg );
	// component.text( cfg.data[0][0] );
	var w = cfg.width;
	var h = cfg.height;

	//绘制网格线背景
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns); 
	var r = w/2;
	var step = cfg.data.length;
	
	// ctx.beginPath();
	// ctx.arc( r , r , 5 , 0 , 2*Math.PI );
	// ctx.stroke();

	// ctx.beginPath();
	// // ctx.moveTo( w/2 , h/2);
	// ctx.arc( r , r , r , 0 , 2*Math.PI );
	// ctx.stroke();
	/**绘制多边形定点坐标
	 *已知圆心坐标为(a,b)半径为r角度为deg
	 *rad = ( 2*Math.PI/360 )*( 360 / step )*i
	 *x = a + Math.sin( rad ) *r;
	 *y = b + Math.cos( rad ) *r;
	 */
	//绘制网格背景
	var isBlue = false;
	for( var s = 10 ; s > 0 ; s-- ){
		ctx.beginPath();
		for( var i = 0; i < step ; i++ ){
			var rad =  ( 2*Math.PI/360 )*( 360 / step )*i;
			var x = r + Math.sin( rad ) *r*(s/10);
			var y = r + Math.cos( rad ) *r*(s/10);
			ctx.lineTo( x , y );
		}
	ctx.closePath();
	ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
	ctx.fill()
	}
	//绘制骨架
	for( var i = 0 ; i < step ; i++ ){
		var rad =  ( 2*Math.PI/360 )*( 360 / step )*i;
		var x = r + Math.sin( rad ) *r;
		var y = r + Math.cos( rad ) *r;
		ctx.moveTo( r , r );
		ctx.lineTo( x , y );
		var text = $('<div class="text">');
		text.text( cfg.data[i][0] );
		text.css( 'transition' , 'all '+ (0.5*i) + 's');
		// text.css( 'left' , x/2 ).css( 'top' , y/2 );
		if( x > w/2){
			text.css( 'left' , x/2 );
		}else{
			text.css( 'right' , (w-x)/2 );
		}
		 if( y > h/2 ){
			text.css( 'top' , y/2 );
		 }else{
		 	text.css( 'bottom' , (h-y)/2 );
		 }
		component.append( text );
	}
	ctx.strokeStyle = '#e0e0e0'; 
	ctx.stroke();

	//绘制数据画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns); 
	//画数据线
	ctx.strokeStyle = '#f00';
	

	function draw( per ){
		if( per >= 1 ){
			$( '.text' ).css( 'opacity' , 1 );
		}else{
			$( '.text' ).css( 'opacity' , 0 );
		}
		ctx.clearRect( 0 , 0 , w , h );
		for( var i = 0 ; i < step ; i++ ){
			var rate = cfg.data[i][1]*per;
			var rad =  ( 2*Math.PI/360 )*( 360 / step )*i;
			var x = r + Math.sin( rad ) *r*rate;
			var y = r + Math.cos( rad ) *r*rate;
			ctx.lineTo( x , y );
		}
		ctx.closePath();
		ctx.stroke();

	//绘制点
		ctx.fillStyle = '#ff7676';
		for( var i = 0 ; i < step ; i++ ){
				var rate = cfg.data[i][1]*per;
				var rad =  ( 2*Math.PI/360 )*( 360 / step )*i;
				var x = r + Math.sin( rad ) *r*rate;
				var y = r + Math.cos( rad ) *r*rate;
				ctx.beginPath();
				ctx.arc( x , y , 5 , 0 , 2*Math.PI );
				ctx.fill();
				ctx.stroke();
			}
		}
	
	//入场动画
	component.on( 'onLoad' , function(){
		var s = 0;
		for( var i = 0; i < 100; i++){
			setTimeout(function(){
				s += 0.01;
				draw(s);
			},i*10)
		}
	})
	//退场动画
	component.on( 'onLeave' , function(){
		var s = 1;
		for( var i = 0; i < 100; i++){
			setTimeout(function(){
				s -= 0.01;
				draw(s);
			},i*10 + 500)
		}
	})
	return component;

}