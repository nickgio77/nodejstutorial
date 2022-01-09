let express = require('express');
let app = express();

const path = require('path');

/* Root */
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'views/index.html'));    
});

/* pagina 1 */
app.get('/pagina1',function(req,res){
    res.sendFile(path.join(__dirname,'views/pagina1.html')); 
});



/* Listener pagina */
app.listen(3000, function(){
    console.log('Server attivo alla porta 3000');
})