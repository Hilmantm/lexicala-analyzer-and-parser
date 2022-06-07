var inputKalimat = document.getElementById('input_kalimat');
var hasil = document.getElementById('result');
var clear = document.getElementById('btn-clear');
var loading = document.getElementById('loading');
var form = document.getElementById('form')

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
transition_table[['q9', 'n']] = 'q2'
transition_table[['q9', 'd']] = 'q10'
transition_table[['q9', 'e']] = 'q14'
transition_table[['q9', 'u']] = 'q18'
transition_table[['q9', 'i']] = 'q19'
transition_table[['q9', 'b']] = 'q22'
transition_table[['q9', 'k']] = 'q25'
transition_table[['q9', 'm']] = 'q31'
transition_table[['q9', 't']] = 'q38'
transition_table[['q9', 'a']] = 'q42'
transition_table[['q9', 'r']] = 'q45'

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

// transition table for: dahar
transition_table[['q1', 'd']] = 'q10'
transition_table[['q10', 'a']] = 'q11'
transition_table[['q11', 'h']] = 'q12'
transition_table[['q12', 'a']] = 'q13'
transition_table[['q13', 'r']] = 'q8'

// transition table for: emang
transition_table[['q1', 'e']] = 'q14'
transition_table[['q14', 'm']] = 'q15'
transition_table[['q15', 'a']] = 'q16'
transition_table[['q16', 'n']] = 'q17'
transition_table[['q17', 'g']] = 'q8'

// transition table for: urang
transition_table[['q1', 'u']] = 'q18'
transition_table[['q18', 'r']] = 'q15'

// transition table for: indung
transition_table[['q1', 'i']] = 'q19'
transition_table[['q19', 'n']] = 'q20'
transition_table[['q20', 'd']] = 'q21'
transition_table[['q21', 'u']] = 'q16'

// transition table for: bawang
transition_table[['q1', 'b']] = 'q22'
transition_table[['q22', 'a']] = 'q23'
transition_table[['q23', 'w']] = 'q24'
transition_table[['q24', 'a']] = 'q16'

// transition table for: kecap
transition_table[['q1', 'k']] = 'q25'
transition_table[['q25', 'e']] = 'q26'
transition_table[['q26', 'c']] = 'q27'
transition_table[['q27', 'a']] = 'q28'
transition_table[['q28', 'p']] = 'q8'

// transition table for: kaen
transition_table[['q25', 'a']] = 'q29'
transition_table[['q29', 'e']] = 'q30'
transition_table[['q30', 'n']] = 'q8'

// transition table for: mobil
transition_table[['q1', 'm']] = 'q31'
transition_table[['q31', 'o']] = 'q32'
transition_table[['q32', 'b']] = 'q33'
transition_table[['q33', 'i']] = 'q34'
transition_table[['q34', 'l']] = 'q8'

// transition table for: masak
transition_table[['q31', 'a']] = 'q35'
transition_table[['q35', 's']] = 'q36'
transition_table[['q36', 'a']] = 'q37'
transition_table[['q37', 'k']] = 'q8'

// transition table for: tumpak
transition_table[['q1', 't']] = 'q38'
transition_table[['q38', 'u']] = 'q39'
transition_table[['q39', 'm']] = 'q40'
transition_table[['q40', 'p']] = 'q41'
transition_table[['q41', 'a']] = 'q37'

// transition table for: abdi
transition_table[['q1', 'a']] = 'q42'
transition_table[['q42', 'b']] = 'q43'
transition_table[['q43', 'd']] = 'q44'
transition_table[['q44', 'i']] = 'q8'

// transition table for: ali
transition_table[['q42', 'l']] = 'q44'

// transition table for: roti
transition_table[['q1', 'r']] = 'q45'
transition_table[['q45', 'o']] = 'q46'
transition_table[['q46', 't']] = 'q44'



form.onsubmit = (event) => {

    event.preventDefault()

    loading.style = 'display: inline-block'

    // lexical analysis
    var indexChar = 0;
    var state = 'q1';
    var currentToken = '';
    var validation = '';
    var inputChar = inputKalimat.value + '#';
    console.log(inputChar);
    while (state != 'accept') {
        var currentChar = inputChar.charAt(indexChar)
        currentToken += currentChar
        state = transition_table[[state, currentChar]]
        if(state == 'q8') {
            console.log("valid gais")
            validation += "valid "
            currentToken = ''
        }
        if(state == 'error') {
            console.log("error")
            validation += "error "
            break;
        }
        indexChar += 1
    }

    console.log(validation);
    hasil.value = validation.trim();

    loading.style = 'display: none'
}

clear.onclick = (event) => {
    inputKalimat.value = "";
    hasil.value = "";
}
