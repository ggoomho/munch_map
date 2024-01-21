const main = document.querySelector("#main");
const question = document.querySelector("#question");
const result = document.querySelector("#result");
const endIndex = 3;
const selected = [];


function setResult() {
    const  resultName = document.querySelector('.resultName');
    var point = 0;

    if(selected[0] === "#압구정") {
        if(selected[1] === "#식당") {
            point = 0;
        } else {
            point = 1;
        }
    } else {
        if(selected[1] === "#식당") {
            point = 2;
        } else {
            point = 3;
        }
    }

    resultName.innerHTML = infoList[point].name;
    const resultDesc = document.querySelector('.resultDesc');

    const href = document.createElement('a');
    href.href = infoList[point].url;
    href.target = "_blank";
    href.textContent = "네이버 블로그 방문해보기";
    resultDesc.appendChild(href);
}

function goResult() {
    question.style.WebkitAnimation = "fadeOut 1s";
    question.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s"
        setTimeout(()=>{
            question.style.display = "none";
            result.style.display = "block";
        }, 450)        
    }, 200)

    setResult();
}


function addSelection(selectionText, selectionType, qIdx) {
    var a = document.querySelector(".answerBox");
    
    var selection = document.createElement('button');
    selection.innerHTML = selectionText;
    selection.classList.add("selectionList");
    selection.classList.add("my-2");
    selection.classList.add("py-3");
    selection.classList.add("mx-auto");
    selection.classList.add("fadeIn");
    a.appendChild(selection);


    selection.addEventListener("click", function() {
        var children = document.querySelectorAll('.selectionList');
        for(let i=0; i<children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }

        setTimeout(() => {
            selected[selected.length] = selectionType;
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(qIdx+1);
        }, 450)
    }, false)
}


function goNext(idx) {
    if(idx+1 === endIndex) {
        goResult();
        return;
    }

    var q = document.querySelector(".questionBox");
    q.innerHTML = questionList[idx].question;
    for(let i in questionList[idx].answer) {
        addSelection(questionList[idx].answer[i].selection, questionList[idx].answer[i].type, idx);
    }
}


function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        question.style.WebkitAnimation = "fadeIn 1s";
        question.style.animation = "fadeIn 1s"
        setTimeout(()=>{
            main.style.display = "none";
            question.style.display = "block";
        }, 450)        
    }, 450)

    let qIdx = 0;
    goNext(qIdx);
}
