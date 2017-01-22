// Markdownのオプション（改行あり）
marked.setOptions({
  breaks: true,
});

new Vue({
  el: '#app',
  // データ
  data: {
    questions: {},
    question: {
      problem: '',
      answer: ''
    },
    choices: [],
    checkedChoices: [],
    isCorrect: false,
    answerOpen: false,
    questionOpen: true,
    endOpen: false,
    questionIndex: 0,
    correctNum: 0,
    shuffledArr: []
  },
  // メソッド
  methods: {
    fetchData: function() {
      console.log("hey");
      fetchCSV();

    },
    // 回答する
    answerQuiz: function () {
      // 項目を未選択の場合進まない
      if (this.checkedChoices.length === 0) return;

      // 正解を開き正誤の結果を表示する
      this.answerOpen = true;
      this.isCorrect = compareArr(this.checkedChoices, this.question.corrects);
      if (this.isCorrect) this.correctNum++;
    },
    // 次の問題へ
    nextQuiz: function () {
      this.answerOpen = false;
      this.questionIndex++;

      // questionIndex + 1と問題総数が一緒の場合、終わりページを開く
      if (this.questionIndex === this.questions.length) {
        this.questionOpen = false;
        this.endOpen = true;
        window.scrollTo(0,0);
      } else {

        // questionに次の問題をセットする
        this.question = this.questions[this.shuffledArr[this.questionIndex]];
        // 選択肢を生成する correctsとincorrectsを繋げシャッフル
        this.choices = _.shuffle(_.concat(this.question.corrects, this.question.incorrects));
        this.checkedChoices = [];
        window.scrollTo(0,0);
      }
    },
    // 初期化処理
    initializeApp: function () {

      // 変数の初期化
      this.questionIndex = 0;
      this.correctNum = 0;
      this.isCorrect = false;
      this.answerOpen = false;
      this.questionOpen = true;
      this.endOpen = false;
      this.checkedChoices = [];

      // 問題を取得する
      this.questions = getQuestions();

      // 問題をランダムに並べた配列を作成する
      var questionsNum = this.questions.length;

      var arr = [];
      for (var i = 0; i < questionsNum; i++) {
        arr[i] = i;
      }

      var randomIndex;
      for (var i = 0; i < questionsNum; i++) {
        randomIndex = Math.floor(Math.random() * arr.length);
        this.shuffledArr[i] = arr[randomIndex];
        arr.splice(randomIndex, 1);
      }

      // questionにquestionsの1問目を設定する
      this.question = this.questions[this.shuffledArr[this.questionIndex]];

      // 選択肢を生成する correctsとincorrectsを繋げシャッフル
      this.choices = _.shuffle(_.concat(this.question.corrects, this.question.incorrects));
    }
  },
  // 画面生成後実行されるメソッド
  ready: function () {

    this.initializeApp();

  },
  filters: {
    marked: marked
  }
})

// 問題を取得し返却するメソッド TODO: JSONから取得するよう修正
function getQuestions() {
  questions = [
    {
      id: "0001",
      problem: "算数の問題です。1 + 1 = ?",
      corrects: ["2"],
      incorrects: ["1", "3", "4"],
      answer: "指を折り曲げて数えてみましょう。"
    },
    {
      id: "0002",
      problem: "複数正解があるタイプの問題にも対応しています",
      corrects: ["正解1", "正解2"],
      incorrects: ["不正解1", "不正解2"],
      answer: "this is sample answer, this is sample answer, this is sample answer"
    },{"id": "0003", "problem": "what is the main color?", "problemImage": "data:image/png;base64,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",  "corrects": ["blue"], "incorrects": ["yellow", "pink", "green"], "answer": "it is obvious", "answerImage": ""},{"id": "0004", "problem": "下記のJavaScriptを実行した場合、何が返されるか。\n```\nif(1 === 1) {\n return true\n}\n```", "problemImage": "",  "corrects": ["true"], "incorrects": ["false", "error", "1"], "answer": "yes **this is the truth**!!!\n we love MARKDOWN of http://github.com", "answerImage": ""},
  ]
  return questions;
}

// Array比較function、配列のオーダーに関係なく同じ内容を含む場合はtrueを、そうでない場合はfalseを返す
function compareArr(arr1, arr2) {
  // 解答数と回答数が異なる場合false
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1 = arr1.sort();
  arr2 = arr2.sort();

  // 解答と回答の内容が異なる場合false
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// CSVをfetchする
function fetchCSV(url) {
  url = (url || "data/test.csv");
  console.log("is it in?");
  fetch(url).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text);
    return text;
  });
}