// 饼图图组件js代码
var H5ComponentPie = function( name , cfg ){
	var component = new H5ComponentBase( name , cfg );
	// component.text( cfg.data[0][0] );
	var w = cfg.width;
	var h = cfg.height;


	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css( 'z-index' , 1 );
	component.append(cns); 
	var r = w/2;
	var step = cfg.data.length;
	
	//绘制背景图
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc( r , r , r , 0 , 2*Math.PI );
	ctx.fill();
	ctx.stroke();


	//绘制数据
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css( 'z-index' , 2 );
	component.append(cns); 

	var sAngle = 1.5*Math.PI;
	var eAngle = 0;
	var aAngle = 2*Math.PI;   //整元角度
	var colors = [ 'red' , 'yellow' , 'green' , 'blue' , '#f00'];
	
	// ctx.lineWidth = 1;
	
	for ( var i = 0 ; i < step ; i++ ){
		var item = cfg.data[i];
	    var color = item[2] || ( item[2] = colors.pop() ); 

		eAngle = sAngle + aAngle*item[1];
		ctx.beginPath();
		ctx.moveTo( r , r );
		ctx.arc( r , r , r , sAngle , eAngle );

		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.fill();
		ctx.stroke();
		sAngle = eAngle

		//添加项目名称
		var text = $('<div class="text">');
		var per = $('<div class="per">');
		text.text( item[0] );
		per.text( item[1]*100 + '%' );

		var x = r + Math.sin( 0.5*Math.PI - sAngle ) *r;
		var y = r + Math.cos( 0.5*Math.PI - sAngle ) *r;
		// text.css( 'left' , x/2 ).css( 'top' , y/2 );
		if( x > w/2 ){
			text.css( 'left' , x/2 );
		}else{
			text.css( 'right' , (w-x)/2 +5 );
		}
		if( y > h/2 ){
			text.css( 'top' , y/2  );
		}else{
			text.css( 'bottom' , (h-y)/2 + 10);
		}
		if( item[2] ){
			text.css( 'color' , item[2] );
		}
		text.append( per );
		component.append( text );
	}

	//添加遮罩层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css( 'z-index' , 3 );
	component.append(cns); 

	
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	

	function draw( per ){
		ctx.clearRect( 0 , 0 , w , h );
		ctx.beginPath();
		ctx.moveTo( r , r );
		if( per <= 0){
		    ctx.arc( r , r , r , 0 , sAngle + 2*Math.PI);
		    component.find('.text').css( 'opacity' , 0 );
		}else{
		   ctx.arc( r , r , r , sAngle , sAngle + 2*Math.PI*per , true);
		}
		ctx.fill();
		ctx.stroke();
		if( per >= 1 ){
			ctx.clearRect( 0 , 0 , w , h );
		    component.find('.text').css( 'opacity' , 1 );
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