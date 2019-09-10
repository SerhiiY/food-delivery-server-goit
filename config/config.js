const username = "serhii";
const password = 13243546;
const db = 'food-delivery-goit'

module.exports = {
  port: 3001,
  dbURL: `mongodb+srv://${username}:${password}@cluster0-xqunq.mongodb.net/${db}`,
};