var demo = new Vue({

  el: '#qjm',
  data: {
    questions: {},
    modalImage: "",
    isModalActive: false
  },
  methods: {
    fetchData: function() {
      return new Promise((resolve, reject) => {
        fetch('./data/ap.json')
          .then(response => response.json())
          .then(data => {

            console.log('get data')
            resolve(data.data);
          })
          .catch(error => {
            console.log('error on fetch!!!');
            reject(error);
          });
      })
    },
    showImageModal: function(base64Image) {
      this.isModalActive = true;
      this.modalImage = base64Image;
      
    },
    closeImageModal: function() {
      this.isModalActive = false;
      this.modalImage = "";
    }
  },
  ready: function () {
    this.fetchData()
      .then(data => {
        console.log(data);
        this.questions = data;

      })
  }
})
