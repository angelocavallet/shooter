/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 * 
 * MODIFIED BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * 
 */
function Keyboard(element){
    var keys = {
            bind : function() {
                    $(element).on('keydown', function(event) {	
                            return keys.handler(event, true);
                    });
                    $(element).on('keyup', function(event) {	
                            return keys.handler(event, false);
                    });
            },
            reset : function() {
                    this.left = false;
                    this.right = false;
                    this.up = false;
                    this.down = false;
            },
            unbind : function() {
                    $(element).off('keydown');
                    $(element).off('keyup');
            },
            handler : function(event, status) {
                    switch(event.keyCode) {
                            case 83://S
                                    this.down = status;
                                    break;
                            case 68://D
                                    this.right = status;
                                    break;
                            case 65://A
                                    this.left = status;			
                                    break;
                            case 87://W
                                    this.up = status;
                                    break;
                            default:
                                    return true;
                    }

                    event.preventDefault();
                    return false;
            },
            left : false,
            up : false,
            right : false,
            down : false
    };
    return keys;
}