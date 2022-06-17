export const state = () => ({
  scopes: [
    { comment: 'Application options' },
    { scope: 'app:user-online', comment: 'Users online indicator' },
    { scope: 'app:selected-html', comment: 'Enabled selected from HTML' },

    { comment: 'User notifications' },
    { scope: 'notification:post', comment: 'Create notification for users' },

    { comment: 'Statistics of services' },
    { scope: 'statistic:dashboard', comment: 'Dashboard' },
    { scope: 'statistic:ipaddress', comment: 'Statistic of IP Addresses' },
    { scope: 'statistic:inspector', comment: 'Statistic of PC SysInspector' },
    { scope: 'statistic:onmap', comment: 'Statistic of ONMAP' },
    { scope: 'statistic:request', comment: 'Statistic of Operational journal' },

    { comment: 'List of channels' },
    { scope: 'channel', comment: 'Access to the list of channels' },
    { scope: 'channel:get', comment: 'Get channel' },
    { scope: 'channel:post', comment: 'Create channel' },
    { scope: 'channel:put', comment: 'Update channel' },
    { scope: 'channel:delete', comment: 'Delete channel' },
    {
      scope: 'channel:export:table',
      comment: 'Export channels in CSV file'
    },

    { comment: 'List of VPN clients' },
    { scope: 'vpn', comment: 'Access to the list of VPN clients' },
    { scope: 'vpn:get', comment: 'Get VPN' },
    { scope: 'vpn:post', comment: 'Create VPN' },
    { scope: 'vpn:put', comment: 'Update VPN' },
    { scope: 'vpn:delete', comment: 'Delete VPN' },
    {
      scope: 'vpn:export:table',
      comment: 'Export VPNs in CSV file'
    },

    { comment: 'List of ipaddresses' },
    { scope: 'ipaddress', comment: 'Access to the list of ipaddresses' },
    { scope: 'ipaddress:get', comment: 'Get ipaddress' },
    { scope: 'ipaddress:post', comment: 'Create ipaddress' },
    { scope: 'ipaddress:put', comment: 'Update ipaddress' },
    { scope: 'ipaddress:delete', comment: 'Delete ipaddress' },
    {
      scope: 'ipaddress:client:freeip',
      comment: 'Show free IP Addresses in table'
    },
    {
      scope: 'ipaddress:client:internet',
      comment: 'Show IP Addresses with Internet'
    },
    {
      scope: 'ipaddress:client:email',
      comment: 'Show IP Addresses with E-Mails'
    },
    {
      scope: 'ipaddress:export:table',
      comment: 'Export IP Addresses in CSV file'
    },
    {
      scope: 'ipaddress:export:internet',
      comment: 'Export IP Addresses with Internet to CSV file'
    },

    { comment: 'List of SysInspector reports' },
    {
      scope: 'inspector',
      comment: 'Access to the list of SysInspector reports'
    },
    { scope: 'inspector:get', comment: 'Get SysInspector report' },
    { scope: 'inspector:post', comment: 'Create SysInspector report' },
    { scope: 'inspector:put', comment: 'Update SysInspector report' },
    { scope: 'inspector:delete', comment: 'Delete SysInspector report' },
    {
      scope: 'inspector:export:table',
      comment: 'Export PC SysInspector reports in CSV file'
    },

    { comment: 'List of ONMAP reports' },
    { scope: 'onmap', comment: 'Access to the list of ONMAP reports' },
    { scope: 'onmap:get', comment: 'Get ONMAP report' },
    { scope: 'onmap:post', comment: 'Create ONMAP report' },
    { scope: 'onmap:put', comment: 'Update ONMAP report' },
    { scope: 'onmap:delete', comment: 'Delete ONMAP report' },
    {
      scope: 'onmap:export:table',
      comment: 'Export ONMAP reports in CSV file'
    },

    { comment: 'List of operational journal requests' },
    {
      scope: 'request',
      comment: 'Access to the list of operational journal requests'
    },
    { scope: 'request:get', comment: 'Get operational journal request' },
    { scope: 'request:post', comment: 'Create operational journal request' },
    { scope: 'request:put', comment: 'Update operational journal request' },
    { scope: 'request:delete', comment: 'Delete operational journal request' },

    { comment: 'List of companies' },
    { scope: 'company', comment: 'Access to the list of companies' },
    { scope: 'company:get', comment: 'Get company' },
    { scope: 'company:post', comment: 'Create company' },
    { scope: 'company:put', comment: 'Update company' },
    { scope: 'company:delete', comment: 'Delete company' },

    { comment: 'List of branches' },
    { scope: 'branch', comment: 'Access to the list of branches' },
    { scope: 'branch:get', comment: 'Get branch' },
    { scope: 'branch:post', comment: 'Create branch' },
    { scope: 'branch:put', comment: 'Update branch' },
    { scope: 'branch:delete', comment: 'Delete branch' },

    { comment: 'List of enterprises' },
    { scope: 'enterprise', comment: 'Access to the list of enterprises' },
    { scope: 'enterprise:get', comment: 'Get enterprise' },
    { scope: 'enterprise:post', comment: 'Create enterprise' },
    { scope: 'enterprise:put', comment: 'Update enterprise' },
    { scope: 'enterprise:delete', comment: 'Delete enterprise' },

    { comment: 'List of departments' },
    { scope: 'department', comment: 'Access to the list of departments' },
    { scope: 'department:get', comment: 'Get department' },
    { scope: 'department:post', comment: 'Create department' },
    { scope: 'department:put', comment: 'Update department' },
    { scope: 'department:delete', comment: 'Delete department' },

    { comment: 'List of locations' },
    { scope: 'location', comment: 'Access to the list of locations' },
    { scope: 'location:get', comment: 'Get location' },
    { scope: 'location:post', comment: 'Create location' },
    { scope: 'location:put', comment: 'Update location' },
    { scope: 'location:delete', comment: 'Delete location' },

    { comment: 'List of positions' },
    { scope: 'position', comment: 'Access to the list of positions' },
    { scope: 'position:get', comment: 'Get position' },
    { scope: 'position:post', comment: 'Create position' },
    { scope: 'position:put', comment: 'Update position' },
    { scope: 'position:delete', comment: 'Delete position' },

    { comment: 'List of units' },
    { scope: 'unit', comment: 'Access to the list of units' },
    { scope: 'unit:get', comment: 'Get unit' },
    { scope: 'unit:post', comment: 'Create unit' },
    { scope: 'unit:put', comment: 'Update unit' },
    { scope: 'unit:delete', comment: 'Delete unit' },

    { comment: 'List of users' },
    { scope: 'user', comment: 'Access to the list of users' },
    { scope: 'user:get', comment: 'Get user' },
    { scope: 'user:post', comment: 'Create user' },
    { scope: 'user:put', comment: 'Update user' },
    { scope: 'user:delete', comment: 'Delete user' },

    { comment: 'List of logs' },
    { scope: 'logger', comment: 'Access to the list of logs' },
    {
      scope: 'logger:export:table',
      comment: 'Export logs in CSV file'
    }
  ]
});

export const getters = {
  scopes: (state) => {
    return state.scopes.filter((item) => item);
  }
};

export const mutations = {
  scopes(state, val) {
    val.sort((a, b) => a.scope.localeCompare(b.scope));

    state.scopes.unshift(...val);
    state.scopes.unshift({ comment: 'Helpdesk applications' });
  }
};
