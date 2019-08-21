function hasNumber (myString) {
  return /\d/.test(myString)
}

function getId(url) {
  // url example : `/users/12345`
  const lastIndex = url.lastIndexOf('/');
  const idString = url.slice(lastIndex + 1).trim(); // = user or product id on the end of url (/:id)
  if(hasNumber(idString) && +idString !== -1) return idString;
  return null;
}

function getIdFreeUrl (url) {
  // url example : `/users`
  const lastIndex = url.lastIndexOf('/');
  if ( getId(url) === null ) return url;
  return url.slice(0, lastIndex);
};

// routerConfig = router.js with routes to db routs (e.g. users, products)
// url which we use with something method
const idFreeUrl = (routerConfig, url) => {
  return routerConfig[getIdFreeUrl(url)];
};

module.exports = {
  idFreeUrl: idFreeUrl,
  id: getId,
  }