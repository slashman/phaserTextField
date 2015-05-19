/**
 * Locates input fields over the phaser canvas using stage coordinates and scaling.
 * 
 * In order to prevent losing control on the game, this utility sets stage.disableVisibilityChange to true while there are textfields being displayed
 * 
 * @author Santiago Zapata (@slashie_)
 * 
 */

function PhaserTextField(phaser) {
	this.phaser = phaser;
	var container = document.createElement("div");
	container.style.position = 'absolute';
	container.style.top = 0;
	container.style.left = 0;
	document.body.appendChild(container); 
	this.container = container;
	this.components = [];
	var ptf = this;
	window.addEventListener("resize", function(){setTimeout(function(){ptf._relocateComponents();}, 100);});
	this.defaultDisableVisibilityChange = this.phaser.stage.disableVisibilityChange;
}

module.exports = PhaserTextField;

PhaserTextField.prototype = {
	create: function(id, x, y, width, height, params){
		var cssClass = params.cssClass;
		var type = params.type;
		var textField = document.createElement("input");
		if (type)
			textField.setAttribute("type", type);
		if (params.onBlur){
			textField.addEventListener("blur", params.onBlur);
		}
		
		textField.style.visibility = 'hidden';
		textField.style.position = 'absolute';
		textField.ptf_top = y;
		textField.ptf_left = x;
		textField.ptf_width = width;
		textField.ptf_height = height;
		textField.id = id;
		if (cssClass)
			textField.className = cssClass;
		this.container.appendChild(textField);
		this.components.push(textField);
		this._relocateComponents();
		textField.style.visibility = 'visible';
		this.phaser.stage.disableVisibilityChange = true;
	},
	getValue: function(id){
		return this._get(id).value;
	},
	destroy: function(id){
		for (var i = 0; i < this.components.length; i++){
			var component = this.components[i];
			if (component.id == id){
				this.components.splice(i, 1);
				break;
			}
		}
		this.container.removeChild(this._get(id));
		if (this.components.length == 0){
			this.phaser.stage.disableVisibilityChange = this.defaultDisableVisibilityChange;
		}
	},
	_relocateComponents: function(){
		var oy = this.phaser.canvas.offsetTop;
		var ox = this.phaser.canvas.offsetLeft;
		var xsf = this.phaser.scale.scaleFactorInversed.x;
		var ysf = this.phaser.scale.scaleFactorInversed.y;
		for (var i = 0; i < this.components.length; i++){
			var component = this.components[i];
			component.style.top = (component.ptf_top * ysf + oy)+"px"; 
			component.style.left = (component.ptf_left *xsf + ox)+"px";
			component.style.width = (component.ptf_width * xsf)+"px";
			component.style.height = (component.ptf_height * ysf)+"px";
			component.style.fontSize = ((component.ptf_height - 2) * ysf)+"px";

		}
	},
	_get: function(id){
		return document.getElementById(id);
	}
}