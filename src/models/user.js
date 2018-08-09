const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username é necessário'],
            validate: {
                validator: (username) => username.length > 2,
                message: 'Username deve ter pelo menos 3 caracteres.'
            }
        },
        email: { 
            type: String, 
            validate: {
                validator: (email) => new RegExp(/\S+@\S+\.\S+/).test(email),
                message: 'E-mail inválido.'
            },
            unique: [true, 'E-mail já está em uso.'],
            lowercase: true,
            required: [true, 'E-mail é necessário.']
        },
        password: {
            type: String,
            required: [true, 'Senha é necessário.'],
            validate: {
                validator: (pass) => pass.length > 5,
                message: 'Senha deve ter pelo menos 6 caracteres.'
            }
        },	
        cycles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'cycle'
            }
        ],
        leftovers: [
            {
                value: {
                    type: Number,
                    min: [0, 'O valor do saldo não pode ser R$ 0,00.']
                }
            }
        ],
        tags: [
            {
                name: {
                    type: String,
                    lowercase: true,
                    validate: {
                        validator: (tag) => tag.length > 2,
                        message: 'O nome da tag deve ter pelo menos 3 caracteres.'
                    }
                }
            }
        ]
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