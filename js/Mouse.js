/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
function Mouse(element){
    var click = {
            bind : function() {
                
                    $( element ).mousedown(function(event) {
                        return click.handler(event, true);
                    });
                    
                    $( element ).mouseup(function(event) {
                        return click.handler(event, false);
                    });
            },
            reset : function() {
                    this.left = false;
                    this.right = false;
            },
            unbind : function() {
                    $( element ).mouseup(function(){});
                    $( element ).mousedown(function(){});
            },
            handler : function(event, status) {
                    switch(event.button) {
                            case 0://Esquerdo
                                    this.left = status;
                                    break;
                            case 2://Direito
                                    this.right = status;
                                    break;
                    }

                    event.preventDefault();
                    return false;
            },
            left : false,
            right : false
    };
    return click;
}