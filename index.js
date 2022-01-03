const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS], intents: [Intents.FLAGS.GUILD_MESSAGES] });
require("dotenv").config();
const readline = require('readline');
const { google } = require('googleapis');
const creds = require('./credentials.json');
const Excel = require('exceljs');

const { initializeApp, applicationDefault, cert, SDK_VERSION } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccount.json');
const { Console } = require('console');
const console = require('console');
const { platform } = require('os');
const { response } = require('express');
const request = require('request');

var Discord = require('discord.js');
const { channel } = require('diagnostics_channel');
const { content } = require('googleapis/build/src/apis/content');
const { reseller } = require('googleapis/build/src/apis/reseller');
var date = new Date();
const axios = require('axios')


client.on('ready', async guild => {

  /* var btc_price = await getRate('Qwsogvtv82FCd');
   //const rate2 = await getRate('razxDUgYGNAdQ');
   //const rate3 = await getRate('D7B1x_ks7WhV5');
  
   var numb_btc= Number(btc_price);
   var rounded_btc = Math.round((numb_btc + Number.EPSILON) * 100) / 100;
   var string_btc = String(rounded_btc)
   //console.log(string_btc.toLocaleString())*/

  setInterval(async () => {
    // calculo para el BTC
    var btc_price = await getRate('Qwsogvtv82FCd');
    var numb_btc = Number(btc_price);
    var rounded_btc = Math.round((numb_btc + Number.EPSILON) * 100) / 100;
    var string_btc = String(rounded_btc);
    var format_btc = addCommas(string_btc);
    var concat_btc = "$ " + format_btc;

    // calculo para el ETH
    var eth_price = await getRate('razxDUgYGNAdQ');
    var numb_eth = Number(eth_price);
    var rounded_eth = Math.round((numb_eth + Number.EPSILON) * 100) / 100;
    var string_eth = String(rounded_eth)
    var format_eth = addCommas(string_eth);
    var concat_etc = "$ " + format_eth;


    // calculo para el LTC
    var ltc_price = await getRate('D7B1x_ks7WhV5');
    var numb_ltc = Number(ltc_price);
    var rounded_ltc = Math.round((numb_ltc + Number.EPSILON) * 100) / 100;
    var string_ltc = String(rounded_ltc)
    var format_ltc = addCommas(string_ltc);
    var concat_ltc = "$ " + format_ltc;

    //Client . channell
    client.channels.fetch('898610778503012365')
      .then(channel => {

        const embedcrypto = new MessageEmbed()
          .setTitle('Cryptocurrency')
          .setAuthor(client.user.username)
          .setDescription('You can observe the value of cryptocurrencies in real time')
          .setColor('RED')
          .setImage('https://cdn.discordapp.com/attachments/898610778503012365/926201676581445712/eteriun.jpg')
          .addField('LITECOIN', concat_ltc, true)
          .addField('BITCOIN', concat_btc, true)
          .addField('ETHEREUM', concat_etc, true)
          .setFooter("Information retrieved from coinranking API")
          .setURL("https://coinranking.com/")
          .setThumbnail(client.user.displayAvatarURL())
          .setInterval
        channel.send({ embeds: [embedcrypto] });

      })

  }, ((60 - date.getSeconds()) * 1000));
});


client.on("guildCreate", async guild => {

})

client.on('message', function (message) {
});

const getRate = async (coin) => {
  try {

    const response = await axios({
      method: 'GET',
      url: 'https://api.coinranking.com/v2/coin/' + coin + '/price',
      headers: {
        'x-access-token': 'coinranking13deaea73178c97ad2e45fdba22f5c9ddfe3334e2815966b',

      }
    });

    return response.data.data.price;

  } catch (error) {
    console.log(error)
  }
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}
client.login(process.env.DSTOKEN);

