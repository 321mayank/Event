const {hash} = require('../security/password_hash')
function authenticateApiKey(req, res, next) {
const apiKey = req.headers.api_key;
const hashedApikey = hash(apiKey)

    const apiKeyDatabase = req.session.apiKey;
    
    if (!apiKey) {
      res.status(401).send('Unauthorized');
    } else if (hashedApikey === apiKeyDatabase){
          next();
    } else{
        res.status(401).send('Api Key Invalid');
    }
  
 
  }
  
  module.exports= {
    authenticateApiKey
}