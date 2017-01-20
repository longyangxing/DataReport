var jData = []
// 内容管理对象
var H5 = function (){
	this.id = ('h5_' + Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+ this.id +'">').hide();
	this.page = [];
	$('body').append( this.el );
	/**
	 * 新增一个页面
	 * @param {string} name 组件名称，会加入到className中
	 * @param {string} text 页内文本用于测试
	 * @return {H5} 返回H5对象可以用于链式操作
	 */
	this.addPage = function( name, text ){
		jData.push({ isPage : true , name : name , text : text})
		var page = $('<div class="h5_page section">');
		if( name !== undefined ){
			page.addClass( 'h5_page_' + name );
		}
		if( text !== undefined ){
			page.text( text )
		}
		this.el.append( page );
		this.page.push( page );
		return this;
	}
	this.addComponent = function( name , cfg ){
		// jData.push({ isPage : false , name : name , cfg : cfg})
		var cfg = cfg || {};
		//添加默认类型
		cfg = $.extend({
			type : 'base'
		},cfg);

		//取出需要添加组件的页面
		var page = this.page.slice(-1)[0]
		//创建存储组件
		var component;
		switch( cfg.type ){
			case 'base': 
				component = new H5ComponentBase( name , cfg );
				break;
			case 'polyline': 
				component = new H5ComponentPolyline( name , cfg );
				break;
			case 'pie': 
				component = new H5ComponentPie( name , cfg );
				break;
			case 'bar': 
				component = new H5ComponentBar( name , cfg );
				break;
			case 'bar_v': 
				component = new H5ComponentBar_v( name , cfg );
				break;
			case 'radar': 
				component = new H5ComponentRadar( name , cfg );
				break;
			case 'ring': 
				component = new H5ComponentRing( name , cfg );
				break;
			case 'point': 
				component = new H5ComponentPoint( name , cfg );
				break;
			default:
			    break; 
		}

		page.append( component );
		return this;
	}

	//H5对象初始化呈现
	this.loader = function ( firstPage ){

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
	this.loader = typeof H5_loading == 'function' ? H5_loading : loader;
	return this;
}