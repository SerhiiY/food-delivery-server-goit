const mainRoute = (req, res) => {
  // const filePath = path.join(__dirname, 'build', `index.html`);
  // res.sendFile(filePath);
  res.end('You have an error in the route!');
}

module.exports = mainRoute;