function createDateString() {
  var d = new Date();
  return Utilities.formatDate( d, 'Asia/Tokyo', 'M月d日');
}

function getSkypeFreeConf(title?: string) {
  const url = 'https://api.join.skype.com/v1/meetnow/createjoinlinkguest';
  let payload: SkypeMakeFreeConfSendArguments = { ...this.defaults };
  if (typeof title === 'string') {
    payload.title = title;
  } else {
    payload.title = '会議';
  }

  try {
    // eslint-disable-next-line camelcase
    const opts: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };
    const response = UrlFetchApp.fetch(url, opts);
    return JSON.parse(response.getContentText())['joinLink'];
  } catch (error) {
    console.error({ error });
  }
}

export interface SkypeMakeFreeConfSendArguments {
  title: string;
}

function sendAsamokuText() {
  // slack_hook_url is in Setting.ts
  var webhook = new SlackWebhook.IncomingWebhook(slack_hook_url);
  if (use_skype) {
    const conf_url = getSkypeFreeConf('朝モク会場(' + createDateString() + ')'); 
    webhook.send('<!channel>\nおはようございます。\n本日(' + createDateString() + ')の会場は下記になります。\n開始は7時30分～になっております。\n' + conf_url);      
  } else {
    webhook.send('<!channel>\nおはようございます。\n本日(' + createDateString() + ')はこちらのslackで行います。\n開始は7時30分～になっております。\n好きな時間にJOINいただいて、本日のモクモク内容を共有してからもくもく開始しましょう。');      
  }
}
