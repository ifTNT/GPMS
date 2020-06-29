const db = require("./db");
const crypto = require("crypto");
const dateFormat = require("dateformat");

function createUser(obj) {
  let sha1sum = crypto.createHash("sha1");
  sha1sum.update(obj.userPassword);
  obj.userPassword = sha1sum.digest("hex");

  return db.Profile.create(obj);
}

(async () => {
  await createUser({
    userId: "admin", // 使用者ID, string
    userPassword: "12345", // 使用者密碼, sha1 hash後, string
    avatar: "", // 以Bae64編碼過後的使用者頭像, string
    name: "超級管理員", // 使用者名稱, string
    mail: "admin@csie.nuk.edu.tw", // 使用者電子郵件, string
    website: "127.0.0.1", // 使用者個人網站, string
    lab: "NUK", // 實驗室名稱, 老師專屬欄位, 如果是學生則為空字串, string
    roll: "admin", // 使用者的角色, enum Roll
    groups: [],
    collections: [],
    notifications: [],
  });
  await createUser({
    userId: "A1055515", // 使用者ID, string
    userPassword: "12345", // 使用者密碼, sha1 hash後, string
    avatar: "", // 以Bae64編碼過後的使用者頭像, string
    name: "鄭宏彬", // 使用者名稱, string
    mail: "a1055515@mail.nuk.edu.tw", // 使用者電子郵件, string
    website: "", // 使用者個人網站, string
    lab: "", // 實驗室名稱, 老師專屬欄位, 如果是學生則為空字串, string
    roll: "member", // 使用者的角色, enum Roll
    groups: [
      {
        year: 108,
        nthGroup: 1,
      },
    ],
    collections: [],
    notifications: [],
  });
  await createUser({
    userId: "A1055514", // 使用者ID, string
    userPassword: "12345", // 使用者密碼, sha1 hash後, string
    avatar: "", // 以Bae64編碼過後的使用者頭像, string
    name: "林柏文", // 使用者名稱, string
    mail: "a1055514@mail.nuk.edu.tw", // 使用者電子郵件, string
    website: "", // 使用者個人網站, string
    lab: "", // 實驗室名稱, 老師專屬欄位, 如果是學生則為空字串, string
    roll: "leader", // 使用者的角色, enum Roll
    groups: [
      {
        year: 108,
        nthGroup: 1,
      },
    ],
    collections: [],
    notifications: [],
  });
  await createUser({
    userId: "huang", // 使用者ID, string
    userPassword: "12345", // 使用者密碼, sha1 hash後, string
    avatar: "", // 以Bae64編碼過後的使用者頭像, string
    name: "黃健峯", // 使用者名稱, string
    mail: "cfhuang15@nuk.edu.tw", // 使用者電子郵件, string
    website: "http://www.csie.nuk.edu.tw/~cfhuang/", // 使用者個人網站, string
    lab: "機器學習與金融科技實驗室", // 實驗室名稱, 老師專屬欄位, 如果是學生則為空字串, string
    roll: "teacher", // 使用者的角色, enum Roll
    groups: [
      {
        year: 108,
        nthGroup: 1,
      },
    ],
    collections: [],
    notifications: [],
  });

  await db.Exhibition.create({
    year: 108,
    date: "2019-12-4",
    location: "高雄市楠梓區高雄大學路700號圖資2樓",
    mapB64: "",
    poster: "",
    freezed: false,
  });

  await db.Exhibition.create({
    year: 107,
    date: "2018-12-4",
    location: "高雄市楠梓區高雄大學路700號圖資2樓",
    mapB64: "",
    poster: "",
    freezed: true,
  });

  await db.Exhibition.create({
    year: 106,
    date: "2017-12-4",
    location: "高雄市楠梓區高雄大學路700號圖資2樓",
    mapB64: "",
    poster: "",
    freezed: true,
  });

  await db.Exhibition.create({
    year: 105,
    date: "2016-12-4",
    location: "高雄市楠梓區高雄大學路700號圖資2樓",
    mapB64: "",
    poster: "",
    freezed: true,
  });

  await db.Exhibition.create({
    year: 104,
    date: "2016-12-4",
    location: "高雄市楠梓區高雄大學路700號圖資2樓",
    mapB64: "",
    poster: "",
    freezed: true,
  });

  await db.Project.create({
    year: 108,
    nthGroup: 1,
    topic: "123選股好簡單",
    description:
      "隨著E世代的來臨，人們可以更容易的使用電腦及網路來獲取股票資訊，各式各樣的財經APP也不斷地推陳出新，使用這些APP都是為了能更快速便捷的獲取最新的股票資訊，來得到在股票市場上的優勢，為此我們希望能有一個APP能在整合各式財經資訊的基礎上給予更多的幫助，因此我們決定藉由現正流行的AI人工智慧，來幫助使用者在股票交易上的判斷能有比較好的選擇建議",
    tag: ["AI", "FinTech", "投資"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "黃健峯",
    leader: "A1055514 林柏文",
    members: ["A1055515 鄭宏彬", "A1055518 曾浩軒", "A1055531 陳謹皓"],
    note: {
      noteText: "",
    },
  });

  await db.Project.create({
    year: 108,
    nthGroup: 2,
    topic: "Dimension",
    description:
      "在現代生活中，越來越注重於環境與居家的美感與帶來的舒適程度，其中居家物品、傢俱、藝術品的選擇與擺放位置皆會影響個人觀感感受，但在物品選擇時無法呈現出預期效果，擺放上也需要人為多次調整。因此，我們希望能夠透過個人手機及AR技術的應用，透過手機即可預覽整體呈現的效果。 運用 ARKit 實現 AR 物品排列預覽，與 3D 模型閱覽網站做整合，從中挑選使用者屬意的模型，在選定的場景中調整、選擇，使用者間可以連線共同在同個場景下做編輯，互相交流自身的想法，來達成使用者想要的效果。期望透過3D模型閱覽網站與App間整合，能夠聯繫起使用者與模型設計者，透過設計者分享模型，供使用者下載、擺設及預覽實際效果，建立起兩者間的溝通橋樑。",
    tag: ["AR", "ARKit", "模型"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "吳俊興",
    leader: "A1055512 黃柏健",
    members: ["A1055521 吳亮躍", "A1055532 林呈澧", "A1055533 尤呈譽"],
    note: {
      noteText: "",
    },
  });

  await db.Project.create({
    year: 108,
    nthGroup: 3,
    topic: "哎呀（IR）！投影樂器",
    description:
      "近年來智慧行動裝置以及網路越來越普及，攜帶方便的特性已逐漸成為產品之發展趨勢。因此，希望藉由將影像處理的技術，將資訊科技的技術應用到樂器當中，打造出體積小、便攜的一種創新產品，並降低樂器所需的空間限制與經濟門檻，使其更為通俗，讓大家都能感受到音樂所帶來的歡樂。使用雷射發射器投出不可見之紅外光網，透過紅外線攝影機進行手指反射光源之拍攝。使用 OpenCV 針對影像進行灰階化、二值化進行資訊過濾。後使用邊緣檢測以及透視投影轉換方法，來算出使用者的手部位置，將座標位置傳送至手機 APP，使其映射到相對應的樂器打擊位置，發出適當的音效。預計在整體完成後加入深度學習的技術，以提升判斷手指是否按下之準確度。",
    tag: ["OpenCV", "IR", "投影"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "洪宗貝",
    leader: "A1055503 洪為騰",
    members: ["A1055505 林怡秀", "A1055506 劉慶珉", "A1055511 卞正冠"],
    note: {
      noteText: "",
    },
  });

  await db.Project.create({
    year: 108,
    nthGroup: 4,
    topic: "Mercenary",
    description:
      "目前市面上的遊戲大多是將資料儲存在遊戲公司的伺服端，但若是有一天遊戲被取消了，那麼玩家過去投注在遊戲上的時間及金錢，就會在一夕間化為烏有。因此，我們希望能透過區塊鏈去中心化的特性及利用P2P的連線方式，開發一個線上的多人對戰遊戲，玩家能夠掌握自己的資料，也能玩得更加安心，而且不需要透過遊戲公司作為中間人。",
    tag: ["P2P", "MMORPG", "遊戲"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "陳建源",
    leader: "A1055513 黃尹愷",
    members: ["A1055534 周政嘉", "A1055542 許庭菱", "A1055544 林洛竹"],
    note: {
      noteText: "",
    },
  });

  await db.Project.create({
    year: 108,
    nthGroup: 5,
    topic: "NeoHand2",
    description:
      "本企劃主軸為音樂遊戲，特色為融入手勢判斷，提供方便、獨特的遊戲體驗。我們的遊戲開發主要分成兩個部分：手勢判斷系統，以及遊戲系統。手勢判斷系統是我們開發這套遊戲的主要技術，負責判斷遊戲中的手勢是否成功觸發。遊戲系統部分，除了前述判斷系統以外的核心功能幾乎都由遊戲系統負責，舉凡連線、畫面、音樂、分數等，目的在提供玩家一個完整的遊戲體驗。以下我們將分別為這兩個系統作介紹。",
    tag: ["NeoHand", "OpenCV", "遊戲"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "郭錦福",
    leader: "徐煒博",
    members: ["李孟叡", "吳凱倫", "廖敏翔"],
    note: {
      noteText: "",
    },
  });

  await db.Project.create({
    year: 108,
    nthGroup: 6,
    topic: "WOW!DISCO!",
    description:
      "面上充斥著許多語音軟體，卻沒一個有辦法同時滿足不同領域的需求，時常須搭配其他軟體共用，因此我們希望能打造出讓使用者更方便的軟體—DISCO",
    tag: ["Discord", "Python", "BR"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "張保榮",
    leader: "A1055502 洪至謙",
    members: ["A1055540 張丞賢", "A1055510 黃冠淇"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 108,
    nthGroup: 7,
    topic: "你說我聽－智能會議記錄",
    description: "人無法一次記住對話內容，記憶也會因時間的關係變得模糊，如果會議沒有紀錄，有百分之五十的內容會在30分鐘內被遺忘。 如果是人工記錄，記錄員可能會有來不及紀錄的情形，我們的專題就是希望能讓電腦代替記錄員，使會議記錄更方便。",
    tag: ["會議", "智能", "紀錄"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "潘欣泰",
    leader: "A1055507 李明潔",
    members: ["A1055519 袁嘉潞", "A1055520 林季醇", "A1055548 謝豐安"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 108,
    nthGroup: 8,
    topic: "Home Elves家庭語音助理",
    description: "想法源自小米音箱、Echo等智慧音箱，目的是創造一個迅速、便利、安全、且智慧化的產品，當人們使用這些智能裝置時除了可以不用在瑣事上浪費時間外，也能提高生活上的品質與效率。另外，此產品擁有遠端控制的功能，當使用者出門忘記關閉電器時，可以透過APP控制，既節能又安全。",
    tag: ["家庭", "語音", "助理"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "殷堂凱",
    leader: "黃宬瑋",
    members: ["莊博翔", "陳宥臻", "李宛萱"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 108,
    nthGroup: 9,
    topic: "物品遺失警訊系統",
    description: "本文所設計出來的產品為物品遺失警訊系統程式。用戶可以使用本應用程式，就可以透過手機尋找自身重要物品在室內的位置。除此之外，本程式還提供提醒用戶物品丟失的功能，一旦物品失去連線，手機將會發出通知提醒用戶，用戶可透過本應用程式確認各物品的情形。",
    tag: ["警報", "物品", "遺失"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "余亞儒",
    leader: "林煒堉",
    members: ["蘇詠盛", "雷皓哲", "蘇逸源"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 108,
    nthGroup: 10,
    topic: "行車安全警示系統",
    description: "交通部曾統計，分心駕駛是造成交通事故主要原因之一，台灣每年因駕駛分心或疲勞駕駛而發生事故比例約占車禍總事故的20％。為了促進行車安全及避免駕駛在長時間的車程中打瞌睡，我們開發了這個行車安全警示系統，以物聯網的開發板應用為基礎，運用雷射三角測距的原理來測量駕駛與前方障礙物的距離，輔以時速的數據，來推算行進中的交通工具是否已經小於當前車速應保持的安全距離，在駕駛人未保持好安全距離或是車子失速時給予警示，幫助駕駛人注意路況以避免危險的發生。",
    tag: ["行車", "安全", "警示"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "楊惠芳",
    leader: "賴冠穎",
    members: ["李宣槿", "楊麒勳"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 107,
    nthGroup: 1,
    topic: "Test107",
    description: "Test",
    tag: ["Test"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "Test",
    leader: "Leader",
    members: ["Member1", "Member2"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 106,
    nthGroup: 1,
    topic: "Test106",
    description: "Test",
    tag: ["Test"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "Test",
    leader: "Leader",
    members: ["Member1", "Member2"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 105,
    nthGroup: 1,
    topic: "Test105",
    description: "Test",
    tag: ["Test"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "Test",
    leader: "Leader",
    members: ["Member1", "Member2"],
    note: {
      noteText: "",
    },
  });
  
  await db.Project.create({
    year: 104,
    nthGroup: 1,
    topic: "Test104",
    description: "Test",
    tag: ["Test"],
    grade: [],
    img: "",
    browse: 0,
    comment: [],
    board: {
      nextStickerId: 0,
      stickers: [],
    },
    calender: {
      nextEventId: 0, // 下一個事件的 ID, 嚴格遞增
      events: [],
    },
    teacher: "Test",
    leader: "Leader",
    members: ["Member1", "Member2"],
    note: {
      noteText: "",
    },
  });

  process.exit();
})();
