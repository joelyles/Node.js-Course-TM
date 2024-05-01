import crypto from 'crypto';

// create hash
const hash = crypto.createHash('sha256');
hash.update('password123!');
console.log(hash.digest('hex'));

// random bytes
crypto.randomBytes(12, (err, buf) => {
    if (err) throw err;
    console.log(buf.toString('hex'));
})