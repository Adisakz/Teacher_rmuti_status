const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const cors = require("cors")
      
const config = {
  channelAccessToken: 'BPl2Oacv9a8Ik8x+H3MEDiqC+8vlThph2hyFOqiCjkt3B62PLGaCFbBBA8s4QXdCVLyBTnTH69a6tPzc3Rh4EftnxVbFbVIfVW3j8BNTtYV2TEdyBRtAMvoX+LJpKxFMYr059XF2y6AHswKd3/yLYAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'a22ca9d594198bbd247efdced1edf444'
};


const client = new line.Client(config);
const url = "https://status_api.pcnone.com/"
const app = express();
app.use(bodyParser.json());
app.use(cors());

const thaiNames = {
  parsan: 'อ.ประสาน เอื้อทาน',
  atirarj: 'อ.อติราช สุขสวัสดิ์',
  apiwat: 'อ.อภิวัฒน์ สวัสดิรัตน์',
  yotaka: 'อ.โยธกา ตั้งตระกูล',
  piyanuch: 'อ.ปิยะนุช ตั้งกิตติพล์',
  chaluemwut: 'อ.เฉลิมวุฒิ น้อยอุ่นแสน',
  saweth: 'อ.เศวษ หงษ์ประสิทธิ์',
  prapas: 'อ.ประภาส ผ่องสนาม',
  jagraphon: 'อ.จักรพนธ์ อบมา',
  jakkrit: 'อ.จักรกริช ปานเรือนแสน',
};

function Thai(name) {
  return thaiNames[name] || name; // ถ้าไม่พบในพจนานุกรมให้ใช้ชื่อเดิม
}


app.post('/webhook', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


function handleEvent(event) {
  if (event.type === 'follow') {
    const replyText = `สวัสดี คุณ ${event.source.profile().displayName}\n\nนี่คือบัญชีทางการของ Teacher status\nเป็นระบบบริการบอกสถานะอาจารย์\nคณะวิศวกรรมคอมพิวเตอร์ ⚙️🖥️\n\n— การใช้งาน —\n1.กด “แสดงสถานะ” เพื่อแสดงสถานะอาจารย์ทั้งหมด\n2.กด “ลงทะเบียน” เพื่อรับการแจ้งเตือน`;
    return client.replyMessage(event.replyToken, { type: 'text', text: replyText });
  }
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text;
      // ตรวจสอบว่าผู้ใช้ถามเกี่ยวกับราคาห้องหรือไม่
      if (userMessage.includes('แสดงสถานะอาจารย์')) { 
        str =''      
        fetch(url)
        .then((res) => res.json())
        .then(data => {
          const selectData = data.slice(0, 10);
          const formatData = selectData.map(item => `${Thai(item.name)} :: ${item.status === '1' ? 'อยู่' : 'ไม่อยู่'}`);
          const msg = formatData.join('\n'); // ถ้าคุณต้องการเว้นบรรทัดระหว่างข้อมูล
          client.replyMessage(event.replyToken, {
            type: 'text',
            text: msg
          });
        })             
      } 
     
      else {
        // กรณีผู้ใช้ถามอื่น ๆ ที่ไม่เกี่ยวข้อง
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ขออภัย ฉันไม่เข้าใจคำถามของคุณ'
        });
      }
    }
  }
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
