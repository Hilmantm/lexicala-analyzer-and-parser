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

// transition for new token
transition_table[['q9', 'n']] = 'q1'
transition_table[['q9', 'd']] = 'q10'

// transition for final state
transition_table[['q8', ' ']] = 'q9'
transition_table[['q8', '#']] = 'accept'
transition_table[['q9', ' ']] = 'q9'
transition_table[['q9', '#']] = 'accept'

// transition table for: nganggo
transition_table[['q1', 'n']] = 'q2'
transition_table[['q2', 'g']] = 'q3'
transition_table[['q3', 'a']] = 'q4'
transition_table[['q4', 'n']] = 'q5'
transition_table[['q5', 'g']] = 'q6'
transition_table[['q6', 'g']] = 'q7'
transition_table[['q7', 'o']] = 'q8'

// transition table for: mobil
transition_table[['q1', 'd']] = 'q10'
transition_table[['q10', 'a']] = 'q11'
transition_table[['q11', 'h']] = 'q12'
transition_table[['q12', 'a']] = 'q13'
transition_table[['q13', 'r']] = 'q8'


submit.onclick = (event) => {
    // lexical analysis
    var indexChar = 0
    var state = 'q1'
    var currentToken = ''
    var inputChar = inputKalimat.value + '#'
    console.log(inputChar)
    while (state != 'accept') {
        var currentChar = inputChar.charAt(indexChar)
        currentToken += currentChar
        state = transition_table[[state, currentChar]]
        if(state == 'accept') {
            console.log("valid gais")
            currentToken = ''
        }
        if(state == 'error') {
            console.log("error")
            break;
        }
        indexChar += 1
    }
}
