# phaserTextField
Allows positioning textfields atop a phaser canvas for easy user input.
Scales and relocates the input fields based on the location and scale of phaser canvas.

# Usage
```javascript
var phaser = new Phaser.Game( [...] );
var ptf = new PhaserTextField(phaser);
ptf.create('txtUsername', 10, 10, 120, 20, {cssClass: 'prettyCssClass', type: 'text'}); // x, y, width, height
[...]
var value = ptf.getValue('txtUsername');
[...]
ptf.destroy('txtUsername');
```

# Credits
Made by Santiago Zapata (@slashie_)
