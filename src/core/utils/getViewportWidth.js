'use strict';

var matchMedia = require('./matchMedia');

/**	
 * Viewport width
 *
 * @method
 * @memberof ash
 * @returns {number} Returns the viewport width
 */
var getViewportWidth = function ()
{
	if (document.documentElement['clientWidth'] < window['innerWidth'] && matchMedia('(min-width' + ':' + window['innerWidth'] + 'px)'))
	{
		getViewportWidth = function ()
		{
			return window['innerWidth'];
		};
	} else
	{
		getViewportWidth = function ()
		{
			return document.documentElement['clientWidth'];
		};
	} // if

	return getViewportWidth();
};

module.exports = getViewportWidth;