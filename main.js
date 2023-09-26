const chalk = require('chalk')
const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron')
const { CheckScam } = require('./src/helpers/checkScam')
const { checkProfits } = require('./src/helpers/profits')
const store = new (require('node-storage'))(path.join(__dirname, 'user/config.json'))

const sleep = (timeMs) => new Promise(resolve => setTimeout(resolve, timeMs))
const { Init, Stop, Buy, Sell } = require('./src/sniper')
const { getTokenIndexByAddress } = require('./src/utils/token')

var isBotRunning = false

process.on('uncaughtException', function (error) {
  console.log('-----RATE LIMIT/TIMEOUT-----')
})
process.on('UnhandledPromiseRejectionWarning', function (error) {
  console.log('-----RETRY-----')
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  Menu.setApplicationMenu(null)
  if (process.argv[2] === 'dev')
    mainWindow.webContents.openDevTools()

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('restart-bot', async (event, data) => {
  await _stopBot()
  await sleep(2000)
  return await _initBot()
})

ipcMain.handle('init-bot', async (event, data) => {
  return await _initBot()
})

ipcMain.handle('get-tokens', async (event) => {
  return _getTokens()
})
ipcMain.handle('open-link', async (event, url) => {
  shell.openExternal(url)
})

ipcMain.handle('save-tokens', async (event, data) => {
  return _saveTokens(data)
})

ipcMain.handle('buy-token', async (event, data) => {
  return await _buyToken(data)
})
ipcMain.handle('sell-token', async (event, data) => {
  return await _sellToken(data)
})

/// FUNCTIONS
async function _saveConfig(data) {
  Object.keys(data).forEach((key) => {
    store.put(`config.${key}`, data[key])
  })

  await _stopBot()
  await _initBot()

  return {
    msg: 'success'
  }
}

function _saveTokens(data) {
  store.put('tokens', data)
}

function _getTokens() {
  var tokens = store.get('tokens') || undefined
  return {
    msg: tokens ? 'success' : 'error',
    tokens
  }
}

async function _initBot() {
  await Init(store)
  isBotRunning = true
  broadcastTokens()
  return await _getConfig()
}

async function _buyToken(token) {
  try {
    await Buy(token, store)

    await sleep(1000)
    return {
      msg: 'success'
    }
  } catch (err) {
    return {
      msg: 'error'
    }
  }
}

async function _sellToken(token) {
  try {
    await Sell(token, store)
    const tokenIndex = getTokenIndexByAddress(token.address, store.get('tokens'))
    if (tokenIndex)
      store.get('tokens').slice(tokenIndex, 1)

    await sleep(1000)
    return {
      msg: 'success'
    }
  } catch (err) {
    return {
      msg: 'error'
    }
  }
}

async function broadcastTokens() {
  while (true) {
    const tokens = store.get('tokens')
    const config = store.get('config')

    if (tokens && tokens.length > 0)
      for (var i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (config.checkScam && !token.isScam) {
          try {
            console.log(chalk.red('Checking SCAM...'))
            const isScam = await CheckScam(token, config)
            token['isScam'] = isScam
          } catch (err) { }
        }

        if (token.status === 'bought') {
          try {
            console.log(chalk.blue('Checking Profits...'))
            const response = await checkProfits(token.address)
            token['profit'] = response.profitPercent < 0 ? `-${response.profit.toString().replace('-', '').replace('+', '')}` : `+${response.profit.toString().replace('+', '').replace('-', '')}`
            token['profitText'] = response.msg
            token['profitPercent'] = response.profitPercent < 0 ? `-${response.profitPercent.toString().replace('-', '')}` : `+${response.profitPercent.toString().replace('+', '')}`
          } catch (err) { }

        }
      }

    store.put('tokens', tokens)
    await sleep(6000)
  }
}

async function _stopBot() {
  Stop()
  isBotRunning = false
  return await _getConfig()
}
