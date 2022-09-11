// Includes crypto module
const crypto = require('crypto');
// Difining algorithm
const algorithm = process.env.AlGORITHM;
// Defining key
const key = crypto.randomBytes(32);
// Defining iv
const iv = crypto.randomBytes(16);
// An encrypt function
function encrypt(dados) {
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  // Updating dados
  let encrypted = cipher.update(dados);
  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  // Returning iv and encrypted data
  return {
    iv: iv.toString(process.env.TYPE),
    encryptedData: encrypted.toString(process.env.TYPE),
  };
}

// A decrypt function
function decrypt(dados) {
  let iv = Buffer.from(dados.iv, process.env.TYPE);
  let encrypteddados = Buffer.from(dados.encryptedData, process.env.TYPE);
  // Creating Decipher
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  // Updating encrypted dados
  let decrypted = decipher.update(encrypteddados);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  // returns data after decryption
  return decrypted.toString();
}

// Encrypts output
//var output = encrypt('TESTE');
//console.log(output);

// Decrypts output
//console.log(decrypt(output));

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
};
