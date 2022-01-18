const selectBox = document.querySelector('.select-box'),
    selectX = selectBox.querySelector('.playerX'),
    selectO = selectBox.querySelector('.playerO'),
    playWithFriends = selectBox.querySelector('.playWithFriends'),
    playField = document.querySelector('.play-field'),
    boxes = document.querySelectorAll('section span'),
    teamX = document.querySelector('.X'),
    teamO = document.querySelector('.O'),
    teams = document.querySelector('.team'),
    body = document.querySelector('body'),
    result = document.querySelector(".result"),
    resultText = result.querySelector(".victory"),
    replay = result.querySelector('button'),
    turn = document.querySelector('.turn')
let noBot = false
function placeControllers() {
    for(let i = 0; i< boxes.length; i++) {
        boxes[i].setAttribute("onclick", "clickBox(this)")
    }

    selectO.onclick = () => {
        selectBox.classList.add('hide')
        playField.classList.add('show')
        teams.setAttribute("class",'team player')
        turn.innerText = 'O\'s Turn'
        teamO.setAttribute("class",'O active')
        body.setAttribute("class","O")
    }
    selectX.onclick = () => {
        selectBox.classList.add('hide')
        playField.classList.add('show')
        teamX.setAttribute("class",'X active')
        turn.innerText = 'X\'s Turn'
        body.setAttribute("class","X")
    }
    playWithFriends.onclick = () => {
        selectBox.classList.add('hide')
        playField.classList.add('show')
        teamX.setAttribute("class",'X active')
        turn.innerText = 'X\'s Turn'
        body.setAttribute("class","X")
        noBot = true
    }
}

const XIcon = "fas fa-times",
    OIcon = "far fa-circle"

let botStep = false
let playerSign = "X"
let stop = false

function clickBox(el) {
    if(!botStep) {
        if(teams.classList.contains("player")) {
            el.innerHTML = `<i class="${OIcon}"></i>`
            const classname = el.classList[0]
            playerSign = "O"
            el.setAttribute("id", playerSign)
            el.setAttribute("class",`${classname} O`)
            turn.innerText = 'X\'s Turn'
            teamX.setAttribute("class",'X active')
            teamO.setAttribute("class",'O')
            body.setAttribute("class","X")
        }else{
            el.innerHTML = `<i class="${XIcon}"></i>`
            turn.innerText = 'O\'s Turn'
            playerSign = "X"
            const classname = el.classList[0]
            el.setAttribute("id", playerSign)
            el.setAttribute("class",`${classname} X`)
            teamO.setAttribute("class",'O active')
            teamX.setAttribute("class",'X')
            body.setAttribute("class","O")
        }
    }
    el.style.pointerEvents = "none"
    if(!noBot) {
        if(!botStep) {
            setTimeout(() => {
                bot();
            }, 2000)
        }
        botStep = true
    }
    if(noBot) {
        if(teams.classList.contains("player")) {
            teams.setAttribute("class",'team')
        }else{
            teams.setAttribute("class",'team player')
        }
    }
    chooseWinner()
}
//bot
function bot() {
    playerSign = "O"
    let unselected = []
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].childElementCount === 0) {
            unselected.push(i)
        }
    }
    let random = unselected[Math.floor(Math.random() * unselected.length)]
    if(!stop) {
        if(unselected.length > 0) {
            if(teams.classList.contains("player")) {
                boxes[random].innerHTML = `<i class="${XIcon}"></i>`
                const classname = boxes[random].classList[0]
                boxes[random].setAttribute("class",`${classname} X`)
                turn.innerText = 'O\'s Turn'
                playerSign = "X"
                boxes[random].setAttribute("id", playerSign)
                teamO.setAttribute("class",'O active')
                teamX.setAttribute("class",'X')
                body.setAttribute("class","O")
            }else{
                boxes[random].innerHTML = `<i class="${OIcon}"></i>`
                const classname = boxes[random].classList[0]
                boxes[random].setAttribute("class",`${classname} O`)
                turn.innerText = 'X\'s Turn'
                boxes[random].setAttribute("id", playerSign)
                teamX.setAttribute("class",'X active')
                teamO.setAttribute("class",'O')
                body.setAttribute("class","X")
            }
            chooseWinner()
        }
        botStep = false
        try {
            boxes[random].style.pointerEvents = "none"
        } catch (e) {
            console.log("end")
        }
        playerSign = "X"
    }
}

function getClass(id) {
    return document.querySelector(`.box${id}`).id
}

function checkWin(val1, val2, val3, sign) {
    if(getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign) {
        return true;
    }
}

function chooseWinner() {
    if(checkWin(1,2,3,playerSign) ||
        checkWin(4,5,6,playerSign) ||
        checkWin(7,8,9,playerSign) ||
        checkWin(1,4,7,playerSign) ||
        checkWin(2,5,8,playerSign) ||
        checkWin(3,6,9,playerSign) ||
        checkWin(1,5,9,playerSign) ||
        checkWin(3,5,7,playerSign)
    ) {
        stop = true
        console.log(playerSign + " " + "is winner")
        setTimeout(() => {
            playField.classList.remove("show")
            resultText.innerHTML = `Player <span>${playerSign}</span> won the game!`
            result.classList.add("show")
            replay.classList.add(playerSign)
            body.setAttribute("class",playerSign)
        }, 1000)
    }else{
        if(getClass(1) !== "" &&
            getClass(2) !== "" &&
            getClass(3) !== "" &&
            getClass(4) !== "" &&
            getClass(5) !== "" &&
            getClass(6) !== "" &&
            getClass(7) !== "" &&
            getClass(8) !== "" &&
            getClass(9) !== "")
        {
            stop = true
            setTimeout(() => {
                playField.classList.remove("show")
                resultText.innerHTML = `Match has been drawn!`
                result.classList.add("show")
                replay.classList.add("draw")
                body.setAttribute("class","draw")
            }, 1000)
        }
    }
}

replay.onclick = () => {
    window.location.reload()
}
