const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        username: String,
        email: { 
            type: String, 
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },	
        cycles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'cycle'
            }
        ],
        tags: [String]
    },
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

// Encrypt na senha antes de salvar
UserSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err); }


		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err); }

			user.password = hash;
			next();
		});
	});
});


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}


module.exports = mongoose.model('user', UserSchema);