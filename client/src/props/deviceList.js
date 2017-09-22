let deviceList = {
  listName: 'Devices',
  endpoint: '/devices/',
  headerLabels: ['Name', 'Type', 'Location', 'Local IP', 'Status', 'State', 'Last Status Update', 'Last State Change'],
  fields: {
    name: '',
    type: '',
    location: '',
    localIp: '',
    status: '',
    state: '',
    lastStatusUpdate: '',
    lastStateChange: ''
  }
};

export default deviceList;
