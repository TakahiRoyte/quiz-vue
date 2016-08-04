new Vue({
  el: '#app',
  // データ
  data: {
    questions: {},
    question: {},
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
      } else {

        // questionに次の問題をセットする
        this.question = this.questions[this.shuffledArr[this.questionIndex]];
        // 選択肢を生成する correctsとincorrectsを繋げシャッフル
        this.choices = _.shuffle(_.concat(this.question.corrects, this.question.incorrects));
        this.checkedChoices = [];
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
      problem: "this is sample question, this is sample question, this is sample question",
      corrects: ["A"],
      incorrects: ["B", "C", "D"],
      answer: "this is sample answer, this is sample answer, this is sample answer"
    },
    {
      id: "0003",
      problem: "複数正解があるタイプの問題にも対応しています",
      corrects: ["正解1", "正解2"],
      incorrects: ["不正解1", "不正解2"],
      answer: "this is sample answer, this is sample answer, this is sample answer"
    },
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