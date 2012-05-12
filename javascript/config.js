exports.WIDTH = 320;
exports.HEIGHT = 240;

exports.SCALE = 2;


exports.cutscenes = [
	{"image":'./static/backgrounds/death_01b.png', "music":'', "sound":'', 'duration':3000},
	{"image":'./static/backgrounds/death_02.png', "music":'', "sound":'static/sounds/death_02.ogg', 'duration':3000},
	{"image":'./static/backgrounds/victory_01.png', 'music':'', 'sound':'', 'duration':3000}
];

exports.bombs = [
	{'timer':30 * 100,"image":'./static/bombs/bomb_1.png', 'music':'', 'traps':[{'order':0,'image':['./static/bombs/wire_green.png','./static/bombs/wire_green_cut.png'],'pos':[8,128]},/*{'order':0,'image':['./static/bombs/panel_down.png','./static/bombs/panel_up.png'],'pos':[10,50]}*/]}
];

exports.pointer = [
	{"snippers":'./static/icons/snippers_open.png'}
];