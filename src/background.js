chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ selectedProxy: "proxy1" });
});

chrome.runtime.onStartup.addListener(function() {
  applySelectedProxy();
});

chrome.proxy.settings.onChange.addListener(function(details) {
  console.log('Changing proxy settings:', details);
});

function applySelectedProxy() {
  chrome.storage.local.get('selectedProxy', function(data) {
    const selectedProxy = data.selectedProxy;

    if (selectedProxy) {
      if (selectedProxy === "proxy1") {
        applyProxySettings("70.35.213.226", "4153");
      } else if (selectedProxy === "proxy2") {
        applyProxySettings("148.77.34.200", "54321");
      } else if (selectedProxy === "proxy3") {
        applyProxySettings("96.36.50.99", "39593");
      }
    } else {
      console.log('Не выбран прокси. Примените прокси сначала.');
    }
  });
}

function applyProxySettings(host, port) {
  chrome.proxy.settings.set({
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "socks4",
          host: host,
          port: parseInt(port)
        }
      }
    },
    scope: "regular"
  }, function() {
    console.log('Прокси применен');
  });
}
