function hasNumber (myString) {
  return /\d/.test(myString)
}

function getId(url, params) {
  // url example : `/users/12345`
  const lastIndex = url.lastIndexOf('/');
  const idString = url.slice(lastIndex + 1).trim(); // = user or product id on the end of url (/:id)
  if(hasNumber(idString) && +idString !== -1) return idString;
  if(params === null) return null;
  let ids = decodeURIComponent(params).slice(params.lastIndexOf('=') + 1).trim();
  ids = ids.replace(/[`'"\s+]/g,"");
  idsArr = ids.split(',');
  return idsArr;
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
  }