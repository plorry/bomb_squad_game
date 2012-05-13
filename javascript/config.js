exports.WIDTH = 320;
exports.HEIGHT = 240;

exports.SCALE = 2;


exports.cutscenes = [
	//0
	{"panels":[
		{'image':'./static/backgrounds/death_01b.png', "music":'','sound':'', 'duration':3000},
	]},
	//1 - harder than I thought
	{"panels":[
		{'image':'./static/backgrounds/death_02.png', "music":'', "sound":'static/sounds/death_02.ogg', 'duration':'nope'},
		{'image':'./static/backgrounds/death_01b.png', "music":'', "sound":'static/sounds/explosion.ogg', 'duration':2000},
	]},
	//2
	{"panels":[
		{'image':'./static/backgrounds/victory_01.png', 'music':'', 'sound':'', 'duration':3000},
	]},
	//3 - deer in the woods
	{"panels":[
		{'image':'./static/backgrounds/death_05.png', "music":'', "sound":'', 'duration':1500},
		{'image':'./static/backgrounds/death_15a.png', "music":'', "sound":'', 'duration':1500},
		{'image':'./static/backgrounds/death_15b.png', "music":'', "sound":'', 'duration':1500},
		{'image':'./static/backgrounds/death_15c.png', "music":'', "sound":'', 'duration':1500},
		{'image':'./static/backgrounds/death_15d.png', "music":'', "sound":'', 'duration':1500},
		{'image':'./static/backgrounds/death_15e.png', "music":'', "sound":'', 'duration':2500},
		{'image':'./static/backgrounds/death_15e.png', "music":'', "sound":'static/sounds/explosion.ogg', 'duration':1500},
	]},
];

exports.bombs = [
	{'timer':15 * 100,"image":'./static/bombs/bomb_1.png', 'music':'',
		'traps':[
			{'order':1,'image':['./static/bombs/wire_green.png',],'disarmed':['./static/bombs/wire_green_cut.png',],'pos':[35,170], 'icon':'./static/icons/snippers_open.png'},
			{'order':2,'image':['./static/bombs/wire_red.png',],'disarmed':['./static/bombs/wire_red_cut.png'],'pos':[36,187], 'icon':'./static/icons/snippers_open.png'},
			{'order':0,'image':['./static/bombs/wire_blue.png',],'disarmed':['./static/bombs/wire_blue_cut.png'],'pos':[42,209], 'icon':'./static/icons/snippers_open.png'},
			{'order':3,'image':['./static/bombs/wire_yellow.png',],'disarmed':['./static/bombs/wire_yellow_cut.png'],'pos':[40,155], 'icon':'./static/icons/snippers_open.png'},
		], 'obstacles':[]},
	{'timer':15 * 100,"image":'./static/bombs/bomb_2.png', 'music':'','show_timer':1,
		'traps':[
			{'order':0,'image':['./static/bombs/lid_closed.png',],'disarmed':['./static/bombs/wire_green_cut.png',],'pos':[0,0], 'icon':'./static/icons/snippers_open.png', 'inactive':1},
		], 'obstacles':[
			{'trap_id':0, 'image':'./static/bombs/screw.png', 'disarmed':'./static/bombs/unscrewed.png','pos':[72,40],'icon':'./static/icons/drill.png'},
			{'trap_id':0, 'image':'./static/bombs/screw.png', 'disarmed':'./static/bombs/unscrewed.png','pos':[230,40],'icon':'./static/icons/drill.png'},
			{'trap_id':0, 'image':'./static/bombs/screw.png', 'disarmed':'./static/bombs/unscrewed.png','pos':[29,115],'icon':'./static/icons/drill.png'},
			{'trap_id':0, 'image':'./static/bombs/screw.png', 'disarmed':'./static/bombs/unscrewed.png','pos':[265,115],'icon':'./static/icons/drill.png'},
		],
	},
];

exports.pointer = [
	{"snippers":'./static/icons/snippers_open.png'}
];