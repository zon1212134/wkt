"use strict";
let client = null;

function setClient(newClient) {
  client = newClient;
}

async function infoGet(id) {
  try {
    let info = await client.getInfo(id);
    return info;
  } catch (error) {
    return;
  }
}

module.exports = { 
  infoGet, 
  setClient 
};