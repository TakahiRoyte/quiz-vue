var demo = new Vue({

  el: '#qjc',
  data: {
    id: '',
    problemText: '',
    correct1: '',
    correct2: '',
    correct3: '',
    correct4: '',
    correct5: '',
    incorrect1: '',
    incorrect2: '',
    incorrect3: '',
    incorrect4: '',
    incorrect5: '',
    answerText: '',
    output: ''
  },
  methods: {
    addQuiz: function () {
    	// 改行のサニタイズ
      var problem = this.problemText.replace(/\n/g, "\\n");
      var answer = this.answerText.replace(/\n/g, "\\n");
          
      // 選択肢の配列文字列の形成
      var corrects = CreateChoiceArrayStr(this.correct1, this.correct2, this.correct3, this.correct4, this.correct5);
      var incorrects = CreateChoiceArrayStr(this.incorrect1, this.incorrect2, this.incorrect3, this.incorrect4, this.incorrect5);
      
      this.output += `{"id": "${this.id}", "problem": "${problem}", "corrects": ${corrects}, "incorrects": ${incorrects}, "answer": "${answer}"},`;
      toastr.info('problem added!:D');
      this.resetInput();
    },
    resetInput: function() {
      this.id = '';
      this.problemText = '';
      this.correct1 = '';
      this.correct2 = '';
      this.correct3 = '';
      this.correct4 = '';
      this.correct5 = '';
      this.incorrect1 = '';
      this.incorrect2 = '';
      this.incorrect3 = '';
      this.incorrect4 = '';
      this.incorrect5 = '';
      this.answerText = '';
      document.getElementById('id').focus();
    }
  }
})

function CreateChoiceArrayStr(choice1, choice2, choice3, choice4, choice5) {
  var result = `["${choice1}"`;
  if (choice2) result += `, "${choice2}"`;
  if (choice3) result += `, "${choice3}"`;
  if (choice4) result += `, "${choice4}"`;
  if (choice5) result += `, "${choice5}"`;
  result += ']';
  return result
}

function showNotification(message) {
  toastr.info(message);
}