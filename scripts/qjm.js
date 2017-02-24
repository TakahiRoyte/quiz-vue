var demo = new Vue({

  el: '#qjm',
  data: {
    questions: {},
    modalImage: "",
    isModalActive: false
  },
  methods: {
    showImageModal: function (base64Image) {
      this.isModalActive = true;
      this.modalImage = base64Image;

    },
    closeImageModal: function () {
      this.isModalActive = false;
      this.modalImage = "";
    }
  },
  ready: function () {
    this.questions = quizData;
  }
})
