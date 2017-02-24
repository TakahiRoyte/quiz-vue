// Markdownのオプション（改行あり）
marked.setOptions({
  breaks: true,
});

const quizJsonPath = './data/ap.json';

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
    isAnswerButtonDisabled: true,
    answerOpen: false,
    questionOpen: true,
    endOpen: false,
    questionIndex: 0,
    correctNum: 0,
    shuffledArr: []
  },
  // メソッド
  methods: {
    // 回答する
    answerQuiz: function () {
      // 項目を未選択の場合進まない
      if (this.checkedChoices.length === 0) return;
      // 正解を開き正誤の結果を表示する
      this.answerOpen = true;
      this.isAnswerButtonDisabled = true;
      this.isCorrect = compareArr(this.checkedChoices, this.question.corrects);
      if (this.isCorrect) this.correctNum++;
    },
    // 次の問題へ
    nextQuiz: function () {
      this.answerOpen = false;
      this.questionIndex++;

      // questionIndex + 1と問題総数が一緒の場合、終わりページを開く
      if (this.questionIndex === this.questions.length) {
        this.questionIndex = this.questions.length;
        this.questionOpen = false;
        this.endOpen = true;
        window.scrollTo(0, 0);
      } else {

        // questionに次の問題をセットする
        this.question = this.questions[this.shuffledArr[this.questionIndex]];
        // 選択肢を生成する correctsとincorrectsを繋げシャッフル
        this.choices = _.shuffle(_.concat(this.question.corrects, this.question.incorrects));
        this.checkedChoices = [];
        window.scrollTo(0, 0);
      }
    },
    // 初期化処理
    initializeApp: function () {

      console.log('init')

      // 変数の初期化
      this.questionIndex = 0;
      this.correctNum = 0;
      this.isCorrect = false;
      this.answerOpen = false;
      this.questionOpen = true;
      this.endOpen = false;
      this.checkedChoices = [];

      // 問題の取得
      this.questions = quizData;

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
