const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

function passwordHash(myPassword){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        const sel = salt
        bcrypt.hash(myPassword, sel, function(err, hash) {
            const passHash = hash
        });
    });
}
 
function compare (){
    bcrypt.compare(myPassword, hash, function(err, res) {
        // res == true
    });
}




exports.hash = passwordHash
exports.compare = compare