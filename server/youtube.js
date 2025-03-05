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

async function search(q, page, limit) {
  if (!q) return;
  try {
    return(await client.search(q, {type: "all"}));
  } catch (error) {
    return null;
  }
}

async function getComments(id) {
  if (!id) return;
  try {
    return(await client.getComments(id));
  } catch (error) {
    return null;
  }
}

module.exports = { 
  infoGet, 
  setClient,
  search,
  getComments
};