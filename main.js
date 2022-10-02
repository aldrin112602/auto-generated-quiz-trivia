function generateQuiz() {
    let category = [], correct_answer_arr = []
    for(let i = 9; i <= 32; i++) {
      category.push(i);
    }
    category = category[Math.floor(Math.random() * category.length)];
    const url = `https://opentdb.com/api.php?amount=50&category=${category}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const { results } = res
        results.forEach((element, index) => {
          const { question, incorrect_answers, correct_answer } = element;
          correct_answer_arr.push(correct_answer);
            let div = document.createElement('div');
            div.class = 'form-outline';
            let label = document.createElement('label');
            label.class = 'form-label';
            label.innerHTML = `<br><br>${index+1}.) ${question}`;
            div.appendChild(label);
            incorrect_answers.forEach(op => {
              let opt = document.createElement('div')
              opt.class = 'form-check';
              
              let option = document.createElement('input');
              option.class = 'form-check-input';
              option.type = 'radio';
              option.value = op;
              option.setAttribute('name', `answer-${index}`);
              option.setAttribute('required', true)
              opt.appendChild(option);
              let txt = document.createElement('label');
              txt.class = 'form-check-label';
              txt.innerHTML = '&nbsp;' + op;
              opt.appendChild(txt)
              div.appendChild(opt)
            })
            $('#con').append(div)
        });
      });
      let correct_ans = 0;
      $('form').on('submit', e => {
        e.preventDefault()
        let c = new URLSearchParams($('form').serialize()).entries();
        let d = [];
        for(let [k, v] of c) d.push(v);
        for(let i = 0; i < 50; i++) {
          if(correct_answer_arr[i] != d[i]) correct_ans++; 
        }
        alert(`You got ${50 - correct_ans} over 50`)
        let con = confirm('Do you want to answer more?')
        if(con) location.reload();
      })
  }
  $(document).ready(() => {
    generateQuiz();
  })
