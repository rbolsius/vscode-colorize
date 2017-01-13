'use strict';

// const COLOR_REGEX = /(#(?:[\da-f]{3}){1,2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))/gi
// const HEXA_COLOR = /#(?:[\da-f]{3}($| |,|;)){1}|(?:(#(?:[\da-f]{3}){2})(\t|$| |,|;))/gi


/**
 * Utils object for color manipulation
 */
const HEXA_COLOR_SMALL= /(#[\da-f]{3})($|,| |;|\n)/gi;
const HEXA_COLOR = /(#[\da-f]{6})($| |,|;|\n)/gi;

const ColorUtils = {

  getRGB(color: string): number[] {
    // var a;
    // if (b && b.constructor == Array && b.length == 3) return b;
    // if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) return [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])];
    // if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
    // if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3],
    // 	16)];

    let rgb;
    if (color.match(this.HEXA_COLOR_SMALL)) {
      rgb = /#(.+)/gi.exec(color);
      return rgb[1].split('').map(_ => parseInt(_ + _, 16));
    }
    if (color.match(this.HEXA_COLOR)) {
      rgb = /#(.+)/gi.exec(color);
      rgb = rgb[1].split('').map(_ => parseInt(_, 16));
      return [16 * rgb[0] + rgb[1], 16 * rgb[2] + rgb[3], 16 * rgb[4] + rgb[5]];
    }
    // if (rgb = /#(.+)/gi.exec(color)) {
    // 	return rgb[1].split('').map(_ =>  parseInt(_ + _, 16));
    // }
    return [];
    // return (typeof (rgb) != "undefined") ? rgb[rgb.trim().toLowerCase()] : [];
  },

  luminance(color: string): number {
    let rgb = this.getRGB(color);
    if (!rgb) {
      return null;
    }// return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
  },
  extractColor(text: string): Object {
    let match = null;
    if (match = this.HEXA_COLOR_SMALL.exec(text)) {
      return {
        model: 'hex_small',
        value: match[1]
      };
    }
  }
};

export { HEXA_COLOR, HEXA_COLOR_SMALL, ColorUtils };

// 'use strict';

// /**
//  * Utils object for color manipulation
//  */
// const ColorUtils = {

// // const COLOR_REGEX = /(#(?:[\da-f]{3}){1,2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))/gi
// // const HEXA_COLOR = /#(?:[\da-f]{3}($| |,|;)){1}|(?:(#(?:[\da-f]{3}){2})(\t|$| |,|;))/gi

// 	HEXA_COLOR_SMALL: /#[\da-f]{3}(?:$| |,|;)/gi,
// 	HEXA_COLOR: /#[\da-f]{6}(?:$| |,|;)/gi,

// 	getRGB(color:string):number[] {
// 		// var a;
// 		// if (b && b.constructor == Array && b.length == 3) return b;
// 		// if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) return [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])];
// 		// if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
// 		// if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3],
// 		// 	16)];

// 		let rgb;
// 		if (color.match(ColorUtils.HEXA_COLOR_SMALL)) {
// 			rgb = /#(.+)/gi.exec(color)
// 			return rgb[0].split('').map(_ =>  parseInt(_ + _, 16));
// 		}
// 		if (color.match(ColorUtils.HEXA_COLOR)) {
// 			rgb = /#(.+)/gi.exec(color)
// 			rgb = rgb[0].split('').map(_ =>  parseInt(_, 16));
// 			return [rgb[0]+rgb[1],rgb[2]+rgb[3],rgb[4]+rgb[5]];
// 		}
// 		// if (rgb = /#(.+)/gi.exec(color)) {
// 		// 	return rgb[1].split('').map(_ =>  parseInt(_ + _, 16));
// 		// }
// 		return [];
// 		// return (typeof (rgb) != "undefined") ? rgb[rgb.trim().toLowerCase()] : [];
// 	},

//    luminance(color:string):number {
// 		var rgb = ColorUtils.getRGB(color);
// 		if (!rgb) return null;
// 		// return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
// 		return ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
// 	},
// 	extractColor(text:string):Object {
// 		let match = null;
// 		if (match = ColorUtils.HEXA_COLOR_SMALL.exec(text))
// 		return {};
// 	}
// };
// export default ColorUtils;
