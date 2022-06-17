export default ({ app, store, $toast }, inject) => {
  const routesScope = app.router
    .getRoutes()
    .filter((item) => {
      return /^apps/.test(item.name);
    })
    .map((item) => {
      return {
        scope: item.name,
        comment: item.meta ? item.meta[1].apptitle : '-'
      };
    });
  store.commit('scope/scopes', routesScope);

  const sidebar = app.router.options.routes.reduce(
    (arr, obj) => ({
      ...arr,
      [obj.name]: {
        name: obj.name,
        path: obj.path,
        ...(obj.meta
          ? Object.assign({}, ...obj.meta)
          : { appicon: null, appsubtitle: null, apptitle: null }),
        children: obj.children
          ? obj.children.map((item) => {
              const { name } = item;
              const path = `${obj.path}/${item.path}`;
              const meta = item.meta
                ? Object.assign({}, ...item.meta)
                : { appicon: null, appsubtitle: null, apptitle: null };
              const children = item.children
                ? item.children.map((i) => {
                    const { name } = i;
                    const path = `${obj.path}/${item.path}/${i.path}`;
                    const meta = i.meta
                      ? Object.assign({}, ...i.meta)
                      : { appicon: null, appsubtitle: null, apptitle: null };
                    return { name, path, ...meta };
                  })
                : null;
              return { name, path, children, ...meta };
            })
          : null
      }
    }),
    {}
  );

  const socket = app.$nuxtSocket({
    path: '/helper',
    channel: '/helper',
    transports: ['websocket']
  });

  socket.on('disconnect', () => {
    store.commit('isMaintenance', true);
  });

  socket.on('updateUsers', (data) => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      store.commit('helper/updateUsers', data);
    }
  });

  socket.on('newMessage', (data) => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      $toast.success(data.text);
    }
  });

  inject('helpdesk', { ...sidebar, socket });
};
