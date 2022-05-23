const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');
const { byValueKey } = require('appium-flutter-finder'); 
const osSpecificOps = require('../../appium-ui-core/app-mode/androideDriverConfig.json')
const HomePage = require('../page-objects/homepage');

  /**process.env.APPIUM_OS === 'android'
    ? {
        platformName: 'Android',
        deviceName: 'Mobile Pixel 5 API 32',
        // @todo support non-unix style path
        //app: 'E:/GrubTech/Automation/appium-flutter-driver/apps/android-real-debug.apk'
        // __dirname + '/../../apps/android-real-debug.apk' // download local to run faster and save bandwith
        app: 'https://github.com/truongsinh/appium-flutter-driver/releases/download/v0.0.4/android-real-debug.apk',
      }
    : process.env.APPIUM_OS === 'ios'
    ? {
        platformName: 'iOS',
        platformVersion: '12.4',
        deviceName: 'iPhone X',
        noReset: true,
        app: __dirname + '/../../apps/ios-sim-debug.zip' // download local to run faster and save bandwith
        // app: 'https://github.com/truongsinh/appium-flutter-driver/releases/download/v0.0.4/ios-sim-debug.zip',
      }
    : {};
**/
const opts = {
  port: 4723,
  path: '/wd/hub',
  capabilities: {
    ...osSpecificOps,
    automationName: 'Flutter'
  }
};

(async () => {
  const counterTextFinder = byValueKey('counter');
  const buttonFinder = byValueKey('increment');
  
  const driver = await wdio.remote(opts);

  if (process.env.APPIUM_OS === 'android') {
    await driver.switchContext('NATIVE_APP');
    //await (await driver.$('increment')).click();
    await driver.switchContext('FLUTTER');
  } else {
    console.log('Switching context to `NATIVE_APP` is currently only applicable to Android demo app.')
  }

  assert.strictEqual(await driver.getElementText(counterTextFinder), '0');

  await driver.elementClick(buttonFinder);
  await driver.touchAction({
    action: 'tap',
    element: { elementId: buttonFinder }
  });

  assert.strictEqual(await driver.getElementText(counterTextFinder), '2');

  driver.deleteSession();

})();

const validateElementPosition = async (driver, buttonFinder) => {
  const bottomLeft = await driver.execute(
    'flutter:getBottomLeft',
    buttonFinder
  );
 // assert.strictEqual(typeof bottomLeft.dx, 'number');
 // assert.strictEqual(typeof bottomLeft.dy, 'number');

  const bottomRight = await driver.execute(
    'flutter:getBottomRight',
    buttonFinder
  );
 // assert.strictEqual(typeof bottomRight.dx, 'number');
 // assert.strictEqual(typeof bottomRight.dy, 'number');

  const center = await driver.execute('flutter:getCenter', buttonFinder);
 // assert.strictEqual(typeof center.dx, 'number');
 // assert.strictEqual(typeof center.dy, 'number');

  const topLeft = await driver.execute('flutter:getTopLeft', buttonFinder);
 // assert.strictEqual(typeof topLeft.dx, 'number');
 // assert.strictEqual(typeof topLeft.dy, 'number');

  const topRight = await driver.execute('flutter:getTopRight', buttonFinder);
  //assert.strictEqual(typeof topRight.dx, 'number');
 // assert.strictEqual(typeof topRight.dy, 'number');
};
