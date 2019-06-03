const ValidationService = require("../services/validation-service");
const validationService = new ValidationService();

var fs = require("fs");

const roles = {
    ADMIN: "admin",
    PROVIDER: "provider",
    USER: "user"
};

module.exports = class AuthService {
    constructor() {}

    async register(user) {
        if (!validationService.isValidRegisterBody(user)) {
            throw new Error("Invalid payload");
        }
        
        fs.readFile("./src/data/data.json", function (err, data) {
            if (err) throw err;
            var parseData = JSON.parseData(data);

            var count = 0;
            parseData.users.forEach(existingUser => {
                if (existingUser.email == user.email) {
                    throw new Error("This email address has already been used");
                }
                count++;
            });

            const newUser = {
                id: (count + 1).toString(),
                name: user.name,
                surname: user.surname,
                cellPhone: user.cellPhone,
                email: user.email,
                password: user.password,
                role: roles.USER
            };

            parseData.users.push(newUser);
            fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
                if (err) throw err;
                return parseData.users;
            });
        });
    }

    async login(user) {
        if (!validationService.isValidRegisterBody(user)) {
          throw new Error("Invalid payload");
        }
        var found = false;
        let foundUser;
    
        fs.readFile("./src/data/data.json", function(err, data) {
            if (err) throw err;
            var parseData = JSON.parse(data);
    
        parseData.users.forEach(existingUser => {   
          if (existingUser.email === user.email) {
            foundUser = existingUser;
            found = true;
            console.log("foundEmail")
            return;
          }
          if (found) {
            throw new Error("User not found");
          }
        });
      });
      return foundUser;
    }
};