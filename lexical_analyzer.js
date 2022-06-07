var inputKalimat = document.getElementById('input_kalimat');
var submit = document.getElementById('btn-analyze');
var hasil = document.getElementById('result');

var transition_table = {};
var state_list = [];

var alphabet_list = [];
for(var i = 32; i <= 126; i++) {
    alphabet_list.push(String.fromCharCode( i ))
}

// make state list for 46 state
for(let i = 1; i <= 46; i++) {
    state_list.push('q' + i)
}

for(var state in state_list) {
    for(alphabet in alphabet_list) {
        transition_table[[state_list[state], alphabet_list[alphabet]]] = 'error'
    }
    transition_table[[state_list[state], '#']] = 'error'
    transition_table[[state_list[state], ' ']] = 'error'
}

transition_table['q1', ' '] = 'q1'


transition_table[['q1', 'n']] = 'q2'
transition_table[['q2', 'g']] = 'q3'
transition_table[['q3', 'a']] = 'q4'
transition_table[['q4', 'n']] = 'q5'
transition_table[['q5', 'g']] = 'q6'
transition_table[['q6', 'g']] = 'q7'
transition_table[['q7', 'o']] = 'q8'
transition_table[['q8', ' ']] = 'q9'
transition_table[['q8', '#']] = 'accept'
transition_table[['q9', ' ']] = 'q9'
transition_table[['q9', '#']] = 'accept'

submit.onclick = (event) => {
    // lexical analysis
    var indexChar = 0
    var state = 'q1'
    var currentToken = ''
    var inputChar = inputKalimat.value + '#'
    while (state != 'accept' || state != 'q8' || state != 'q9') {
        var currentChar = inputChar.charAt(indexChar)
        currentToken += currentChar
        state = transition_table[[state, currentChar]]
        if(state == 'q8') {
            console.log("valid gais")
            console.log(state)
            currentToken = ''
        }
        if(state == 'error') {
            console.log("error")
            break;
        }
        indexChar += 1
    }
}
