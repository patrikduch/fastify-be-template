export const schema = `
type Query {
  hello: String
  getUsers: [User]
}
type User {
  id: ID
}
`;
