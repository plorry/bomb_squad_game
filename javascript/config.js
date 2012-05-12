exports.WIDTH = 320;
exports.HEIGHT = 240;

exports.SCALE = 2;


exports.cutscenes = [
	{"image":'./static/backgrounds/death1b.png', "music":'', "sound":'', 'duration':3000},
	{"image":'./static/backgrounds/death2.png', "music":'', "sound":'', 'duration':3000},
];

exports.bombs = [
	{"image":'./static/bombs/bomb_1.png', 'music':'', 'wires':[{'image':['./static/bombs/wire_red.png','./static/bombs/wire_green_cut.png'],'pos':[0,100]},{'image':['./static/bombs/wire_red.png','./static/bombs/wire_green_cut.png'],'pos':[0,130]}]}
];

exports.pointer = [
	{"snippers":'./static/icons/snippers_open.png'}
];