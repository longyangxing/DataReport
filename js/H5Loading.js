var H5_loading = function( images , firstPage){
	var id = this.id;
	if( this._images == undefined ){
		this._images = ( images || [] ).length;
		this._loaded = 0 ;
		// console.log(this._images)

		window[id] = this;//用于图片加载完成后进行回调
		// var that = this;
		for( var i = 0 ; i < images.length; i++ ){
			var item = images[i];
			var img = new Image();

			img.onload = function(){
				
				window[id].loader();
			}
			img.src = item;
		}
		$('#rate').text( '0%' );
		 return this;
	}else{
		this._loaded++;
		// console.log( ( ( (  this._loaded / this._images )*100 ) >> 0 ) + '%')
		$('#rate').text( ( ( (  this._loaded / this._images )*100) >> 0 ) + '%' );
		if( this._loaded < this._images ){
		 return this;
		}
	}

	window[id] = null;

	this.el.show();
	$( this.page[0] ).find('.h5_component').trigger('onLoad');

	$( this.el ).fullpage({
	onLeave:function( index, nextIndex, direction ){
				 	 // $('#h5').find('.page').eq(index-1).trigger('onLeave');
				 	// alert($( this ).attr('className')) 
				$( this ).find('.h5_component').trigger('onLeave');
				 },
	 afterLoad:function( anchorLink, index ){
				 	// $('#h5').find('.page').eq(index-1).trigger('onLoad');
				$( this ).find('.h5_component').trigger('onLoad');
				 }
		}); 
	if( firstPage ){
			$.fn.fullpage.moveTo( firstPage );
		}
}