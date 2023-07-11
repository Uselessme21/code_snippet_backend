// codeRoutes.js
const express = require('express');
const axios = require('axios');
const Coderouter = express.Router();

Coderouter.post('/', async (req, res)=>{
   let {language_id,source_code,stdin} = req.body
   try {
function encodeBase64(data) {
   const buff = Buffer.from(data);
   let ans = buff.toString('base64');
   return ans
 };

 source_code= encodeBase64(source_code)
 stdin = encodeBase64(stdin)
 
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'd4aee7c832mshfa68fb5d09c5695p1305cdjsn1e8b4b85fea0',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: {
        language_id: language_id,
        source_code:`${source_code}`,
        stdin: `${stdin}`
      }
    };
      const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);    
    } catch (error) {
        console.error(error);
        res.send(error)
    }
});

Coderouter.get('/:id', async(req, res)=>{
   
let {id}= req.params;
try {
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${id}`,
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'X-RapidAPI-Key': 'd4aee7c832mshfa68fb5d09c5695p1305cdjsn1e8b4b85fea0',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = Coderouter;