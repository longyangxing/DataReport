// 折线图组件js代码
var H5ComponentPolyline = function( name , cfg ){
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
	//水平网格线 10份
	var step = 10;
    ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#AAA';

	window.ctx = ctx;
	for( var i = 0; i < step+1; i++ ){
				var y = (h/10)*i;
				ctx.moveTo( 0 , y);
				ctx.lineTo( w , y);
		}
	ctx.stroke();

	//垂直网格线
	step = cfg.data.length+1;
	for( var i = 0; i < step+1; i++ ){
		  var x = (w/step)*i;
		  ctx.moveTo( x , 0);
		  ctx.lineTo( x , h);

	//添加项目名称
		if( cfg.data[i] ){
		  var text = $( '<div class="text">');
		  text.text( cfg.data[i][0] );
		  text.css( 'width' , (w/step)/2 ).css( 'left' , x/2 + (w/step)/4 );
		  // text.css( 'width' , (w/step) ).css( 'left' , x/2 + (w/step)/2 );
		  // text.css( 'left' , x/2 + step );
		 component.append( text );
				}
	}
	ctx.stroke();

	//创建数据画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	
	function draw( per ){
		//清除画布
		ctx.clearRect(0,0,w,h);
		// console.log( per )
		//画点
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff8878';
		ctx.fillStyle = '#ff8878';
			// ctx.moveTo(0,0)
		var x = 0;
		var y = 0;
			// ctx.arc(0,0,5,0,2*Math.PI);
		step = w / (cfg.data.length + 1);
			// alert(step)
			// alert(step)
		for( var i = 0; i < cfg.data.length; i++ ){
			    x = step*i + step;
				y = h-( cfg.data[i][1]*h*per );
				ctx.moveTo( x , y );

				ctx.arc(x,y,5,0,2*Math.PI);
			}
		ctx.stroke();

			//连线
			// ctx.moveTo( step , h*( 1 - cfg.data[0][1] ) )
			// ctx.arc( step , h*( 1 - cfg.data[0][1] ),15,0,2*Math.PI);
		ctx.moveTo( step , y = h-( cfg.data[0][1]*h*per ) )
		for( var i = 0 ; i < cfg.data.length ; i++ ){
				x = step*i + step;
				y = h-( cfg.data[i][1]*h*per );
				ctx.lineTo( x , y );
			}
		ctx.stroke(); 
		ctx.lineTo( x , h );
		ctx.lineTo( step , h );
		ctx.lineWidth = 1;
		ctx.fillStyle = 'rgba(255, 136, 120, 0.19)';
		ctx.fill();

		//数据
		for( var i = 0; i < cfg.data.length; i++ ){
				x = step*i + step;
				y = h-(cfg.data[i][1]*h*per );
				// ctx.moveTo( x , y );
				ctx.fillStyle = cfg.data[i][2] ? cfg.data[i][2] : '#595959';
				ctx.fillText( ( cfg.data[i][1]*100 >> 0 ) + '%' , x-10 , y-10 );
			}
			ctx.stroke();
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