let deviceProps = {
  listName: 'Devices',
  endpoint: 'http://localhost:4242/devices/',
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

export default deviceProps;
