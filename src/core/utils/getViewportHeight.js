'use strict';

var matchMedia = require('./matchMedia');


/**	
 * Viewport height
 *
 * @method
 * @memberof ash
 * @returns {number} Returns the viewport height
 */
var getViewportHeight = function ()
{
	if ( document.documentElement['clientHeight'] < window['innerHeight'] && matchMedia('(min-height' + ':' + window['innerHeight'] + 'px)'))
	{
		getViewportHeight = function ()
		{
			return window['innerHeight'];
		};
	} else
	{
		getViewportHeight = function ()
		{
			return document.documentElement['clientHeight'];
		};
	}

	return getViewportHeight();
};

module.exports = getViewportHeight;