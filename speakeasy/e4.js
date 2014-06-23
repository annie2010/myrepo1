#!/usr/bin/env node

speakeasy=require('speakeasy')
assert=require('assert')

// generate a key
a=speakeasy.generate_key({length: 20, symbols: true});
console.log(a)
// => { ascii: 'km^A?n&sOPJW.iCKPHKU', hex: '6b6d5e413f6e26734f504a572e69434b50484b55', base32: 'NNWV4QJ7NYTHGT2QJJLS42KDJNIEQS2V' }

// generate a key and request QR code links
b=speakeasy.generate_key({length: 20, qr_codes: true});
console.log(b)
// => { ascii: 'eV:JQ1NedJkKn&]6^i>s', ... (truncated)
//      qr_code_ascii: 'https://www.google.com/chart?chs=166x166&chld=L|0&cht=qr&chl=eV%3AJQ1NedJkKn%26%5D6%5Ei%3Es',
//      qr_code_hex: 'https://www.google.com/chart?chs=166x166&chld=L|0&cht=qr&chl=65563a4a51314e65644a6b4b6e265d365e693e73',
//      qr_code_base32: 'https://www.google.com/chart?chs=166x166&chld=L|0&cht=qr&chl=MVLDUSSRGFHGKZCKNNFW4JS5GZPGSPTT' }

// generate a key and get a QR code you can scan with the Google Authenticator app
c=speakeasy.generate_key({length: 20, google_auth_qr: true});
console.log(c)
// => { ascii: 'V?9f6.Cq1&<H?<nxe.XJ', ... (truncated)
//      google_auth_qr: 'https://www.google.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/SecretKey%3Fsecret=KY7TSZRWFZBXCMJGHRED6PDOPBSS4WCK' }
