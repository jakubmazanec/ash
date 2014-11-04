'use strict';

var isNative = require('../internals/isNative');

/* Native method shortcuts */
var nativeMatchMedia = isNative(nativeMatchMedia = window.matchMedia) && nativeMatchMedia;



/**	
 * Checks if the query is matching.
 *
 * @method
 * @memberof ash
 * @param {*} query The query to match.
 * @returns {boolean} Returns true if the query is a match, else false.
 **/
function matchMedia(query)
{
	if (nativeMatchMedia)
	{
		ash.matchMedia = function (query)
		{
			return nativeMatchMedia.call(window, query).matches;
		}; // ash.matchMedia
	} else
	{
		ash.matchMedia = function ()
		{
			return false;
		}; // ash.matchMedia
	} // if

	return ash.matchMedia(query);
} // matchMedia

module.exports = matchMedia;