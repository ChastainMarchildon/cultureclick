(function() {
    var counter = 0;
    var btn = document.getElementById('btnAddQuestion');
    var form = document.getElementById('survey');
    var addInput = function() {
      counter++;
      var input = document.createElement("input");
      input.id = 'input-' + counter;
      input.type = 'text-area';
      input.name = 'name';
      input.className = 'form-input';
      input.placeholder = 'Question ' + counter;
      form.appendChild(input);
    };
    btn.addEventListener('click', function() {
      addInput();
    }.bind(this));
  })();

 function generateLink(surveyID){
    const answerLink = process.env.ANSWERLINK + surveyID
    const url = new URL(answerLink);
    const modal = document.createElement("div");
    modal.id = 'modal' + surveyID;
    modal.type = 'text';
    modal.name= 'link';
    modal.className='modal';
    modal.value= url;

  }