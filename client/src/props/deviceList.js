let deviceList = {
  listName: 'Devices',
  endpoint: '/devices/',
  headerLabels: ['Name', 'Type', 'Location', 'Local IP', 'Status', 'State', 'Action'],
  fields: {
    name: '',
    type: '',
    location: '',
    localIp: '',
    status: '',
    state: ''
  }
};

export default deviceList;
