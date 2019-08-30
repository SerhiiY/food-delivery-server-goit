function hasNumber (myString) {
  return /\d/.test(myString)
}

function getId(url, params) {
  // url example : `/users/12345`
  const lastIndex = url.lastIndexOf('/');
  const idString = url.slice(lastIndex + 1).trim(); // = user or product id on the end of url (/:id)
  if(hasNumber(idString) && +idString !== -1) return idString;
  if(getParam(params) === "ids") {
    return getParamValuesArr(params);
  }
  if(getParam(params) === "category") {
    return getParamValuesArr(params);
  }
  return null;
}

function getParamValuesArr (item) {
  item = decodeURIComponent(item).slice(item.lastIndexOf('=') + 1).trim();
  item = item.replace(/[`'"\s+]/g,"");
  return item.split(',');
}

function getParam(params) {
  if(params === null) return null;
  return params.slice(params.lastIndexOf('?') + 1, params.lastIndexOf('='));
}

function getIdFreeUrl (url, params) {
  // url example : `/users`
  const lastIndex = url.lastIndexOf('/');
  if ( getId(url, params) === null ) return url;
  return url.slice(0, lastIndex);
};

// routerConfig = router.js with routes to db routs (e.g. users, products)
// url which we use with something method
const idFreeUrl = (routerConfig, url, params) => {
  return routerConfig[getIdFreeUrl(url, params)];
};

module.exports = {
  idFreeUrl: idFreeUrl,
  id: getId,
  param: getParam
  }