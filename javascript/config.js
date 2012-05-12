exports.WIDTH = 320;
exports.HEIGHT = 240;

exports.SCALE = 2;


exports.cutscenes = [
	{"image":'./static/backgrounds/death_01b.png', "music":'', "sound":'', 'duration':3000},
	{"image":'./static/backgrounds/death_02.png', "music":'', "sound":'static/sounds/death_02.ogg', 'duration':3000},
	{"image":'./static/backgrounds/victory_01.png', 'music':'', 'sound':'', 'duration':3000}
];

exports.bombs = [
	{'timer':30 * 100,"image":'./static/bombs/bomb_1.png', 'music':'', 'traps':[
		{'order':0,'image':['./static/bombs/wire_green.png','./static/bombs/wire_green_cut.png'],'pos':[35,170]},
		{'order':1,'image':['./static/bombs/wire_red.png','./static/bombs/wire_red_cut.png'],'pos':[36,187]},
		{'order':2,'image':['./static/bombs/wire_blue.png','./static/bombs/wire_blue_cut.png'],'pos':[42,209]}]}
];

exports.pointer = [
	{"snippers":'./static/icons/snippers_open.png'}
];