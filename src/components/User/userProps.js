let userProps = {
  listName: 'Users',
  endpoint: 'http://localhost:4242/users/',
  headerLabels: ['First Name', 'Last Name', 'Username', 'Permissions'],
  fields: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
};

export default userProps;
