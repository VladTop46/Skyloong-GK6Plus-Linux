
function hue2rgb( p, q, t)
{
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function rgb2hsv( inVal)
{
	const       out = {};
	let       min, max, delta;
	min = inVal.r < inVal.g ? inVal.r : inVal.g;
	min = min  < inVal.b ? min  : inVal.b;

	max = inVal.r > inVal.g ? inVal.r : inVal.g;
	max = max  > inVal.b ? max  : inVal.b;

	out.v = max;                                // v
	delta = max - min;
	if (delta < 0.00001)
	{
		out.s = 0;
		out.h = 0; // undefined, maybe nan?
		return out;
	}
	if( max > 0.0 ) { // NOTE: if Max is == 0, this divide would cause a crash
		out.s = (delta / max);                  // s
	} else {
		// if max is 0, then r = g = b = 0              
		// s = 0, v is undefined
		out.s = 0.0;
		out.h = 0.0;                            // its now undefined
		return out;
	}
	if( inVal.r >= max )                           // > is bogus, just keeps compilor happy
		out.h = ( inVal.g - inVal.b ) / delta;        // between yellow & magenta
	else
		if( inVal.g >= max )
			out.h = 2.0 + ( inVal.b - inVal.r ) / delta;  // between cyan & yellow
		else
			out.h = 4.0 + ( inVal.r - inVal.g ) / delta;  // between magenta & cyan

	out.h *= 60.0;                              // degrees

	if( out.h < 0.0 )
		out.h += 360.0;
   // console.log('rgb2hsv',out,inVal);
	return out;
}


 function hsv2rgb( inVal)
{
	let       hh, p, q, t, ff;
	let         i;
	let          out={};

	if(inVal.s <= 0.0) {       // < is bogus, just shuts up warnings
		out.r = inVal.v;
		out.g = inVal.v;
		out.b = inVal.v;
		return out;
	}
	hh = inVal.h;
	if(hh >= 360.0) hh = 0;
	hh /= 60;
	i = Math.floor(hh);
	ff = hh - i;
	
	p = inVal.v * (1 - inVal.s);
	q = inVal.v * (1 - (inVal.s * ff));
	t = inVal.v * (1 - (inVal.s * (1 - ff)));

	//e.log({hh,i,ff,p,q,t});

	switch(i) {
	case 0:
		out.r = inVal.v;
		out.g = t;
		out.b = p;
		break;
	case 1:
		out.r = q;
		out.g = inVal.v;
		out.b = p;
		break;
	case 2:
		out.r = p;
		out.g = inVal.v;
		out.b = t;
		break;

	case 3:
		out.r = p;
		out.g = q;
		out.b = inVal.v;
		break;
	case 4:
		out.r = t;
		out.g = p;
		out.b = inVal.v;
		break;
	case 5:
	default:
		out.r = inVal.v;
		out.g = p;
		out.b = q;
		break;
	}
	//console.log('hsv2rgb',out,inVal);
	return out;     
}


function rgb2hsl( inVal)
{
	inVal.r /= 255, inVal.g /= 255, inVal.b /= 255;
	let      min, max;

	min = inVal.r < inVal.g ? inVal.r : inVal.g;
	min = min  < inVal.b ? min  : inVal.b;

	max = inVal.r > inVal.g ? inVal.r : inVal.g;
	max = max  > inVal.b ? max  : inVal.b;
	let  out = {};
	out.h = out.s = out.l = (max+min)/2;

	if(max == min){
		out.h = out.s = 0; // achromatic
	}else{
		let d = max - min;
		out.s = out.l > 0.5 ? d / (2 - max - min) : d / (max + min);
		if(max==inVal.r)
			out.h = (inVal.g - inVal.b) / d + (inVal.g < inVal.b ? 6 : 0);
		else if(max==inVal.g)
			out.h = (inVal.b - inVal.r) / d + 2;
		else if(max==inVal.b)
			out.h = (inVal.r - inVal.g) / d + 4;
		out.h /= 6;
	}

	return out;
}

 function  hsl2rgb( inVal)
{
	let  h=inVal.h;
	let  sl=inVal.s;
	let  l=inVal.l;
	let  v;
	let  r,g,b;

	r = l;   // default to gray
	g = l;
	b = l;
	v = (l <= 0.5) ? (l * (1.0 + sl)) : (l + sl - l * sl);
	if (v > 0)
	{
		let  m;
		let  sv;
		let  sextant;
		let  fract, vsf, mid1, mid2;

		m = l + l - v;
		sv = (v - m ) / v;
		h *= 6.0;
		sextant = Math.floor(h)
		fract = h - sextant;
		vsf = v * sv * fract;
		mid1 = m + vsf;
		mid2 = v - vsf;
		switch (sextant)
		{
		case 0:
			r = v;
			g = mid1;
			b = m;
			break;
		case 1:
			r = mid2;
			g = v;
			b = m;
			break;
		case 2:
			r = m;
			g = v;
			b = mid1;
			break;
		case 3:
			r = m;
			g = mid2;
			b = v;
			break;
		case 4:
			r = mid1;
			g = m;
			b = v;
			break;
		case 5:
			r = v;
			g = m;
			b = mid2;
			break;
		}
	}
	let  out = {};
	out.r = Math.round(r*255);
	out.g = Math.round(g*255);
	out.b = Math.round(b*255);
	return out;
}

module.exports = {
    hue2rgb,
    rgb2hsv,
    hsv2rgb,
    rgb2hsl,
    hsl2rgb
}