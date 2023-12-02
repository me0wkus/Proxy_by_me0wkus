document.getElementById('applyButton').addEventListener('click', applySelectedProxy);
document.getElementById('disableButton').addEventListener('click', disableProxy);

// Загрузка текущего прокси при открытии popup.html
document.addEventListener('DOMContentLoaded', function() {
  loadActiveProxy();
});

function applySelectedProxy() {
  const selectedProxy = document.getElementById('proxyList').value;

  if (selectedProxy) {
    setAndApplyProxy(selectedProxy);
  } else {
    console.log('Не выбран прокси. Примените прокси сначала.');
  }
}

function setAndApplyProxy(selectedProxy) {
  chrome.storage.local.set({ selectedProxy: selectedProxy }, function() {
    console.log('Выбран прокси:', selectedProxy);
    applyProxySettings(selectedProxy);
    loadActiveProxy(); // Обновляем отображение активного прокси в списке после применения
  });
}

function applyProxySettings(selectedProxy) {
  let host, port;

  if (selectedProxy === "proxy1") {
    host = "70.35.213.226";
    port = "4153";
  } else if (selectedProxy === "proxy2") {
    host = "148.77.34.200";
    port = "54321";
  } else if (selectedProxy === "proxy3") {
    host = "96.36.50.99";
    port = "39593";
  }

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

function disableProxy() {
  chrome.proxy.settings.clear({ scope: 'regular' }, function() {
    console.log('Прокси отключен');
    loadActiveProxy(); // Обновляем отображение активного прокси в списке после отключения
  });
}

function loadActiveProxy() {
  chrome.storage.local.get('selectedProxy', function(data) {
    const selectedProxy = data.selectedProxy;

    if (selectedProxy) {
      document.getElementById('proxyList').value = selectedProxy;
    }
  });
}
