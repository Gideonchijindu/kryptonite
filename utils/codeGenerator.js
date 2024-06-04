import crypto from 'crypto';

export const codeGenerator = (length, alpha) => {
  const numeric = '1234567890';
  let result = '';
  const characters = alpha || numeric;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export const  generateUniqueApiKey =() =>{
  // Generate a random string for API key (you can adjust length and characters as needed)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const apiKeyLength = 32;
  let apiKey = '';
  for (let i = 0; i < apiKeyLength; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Check if the generated API key is unique in the database
  // You may need to add further checks or adjustments based on your database structure
  return apiKey;}

export const buildOtpHash = (email, otp, key, expiresAfter, algorithm = 'sha256') => {
  const ttl = expiresAfter * 60 * 1000; // Expires in minutes, converted to miliseconds
  const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
  const data = `${email}.${otp}.${expires}`; // email.otp.expiry_timestamp
  const hashBase = crypto.createHmac(algorithm, key).update(data).digest('hex'); // creating SHA256 hash of the data
  const hash = `${hashBase}.${expires}`; // Hash.expires, format to send to the user
  return hash;
};

export const verifyOTP = (email, otp, hash, key, algorithm = 'sha256') => {
  if (!hash.match('.')) return false; // Hash should have at least one dot
  // Seperate Hash value and expires from the hash returned from the user(
  const [hashValue, expires] = hash.split('.');
  // Check if expiry time has passed
  const now = Date.now();
  if (now > expires) return false;
  // Calculate new hash with the same key and the same algorithm
  const data = `${email}.${otp}.${expires}`;
  const newCalculatedHash = crypto.createHmac(algorithm, key).update(data).digest('hex');
  // Match the hashes
  if (newCalculatedHash === hashValue) {
    return hash;
  }
  return false;
};
