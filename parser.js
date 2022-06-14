var inputKalimatParser = document.getElementById('input_kalimat_parser');
var hasilParser = document.getElementById('result-parser');
var clearParser = document.getElementById('btn-clear-parser');
var loadingParser = document.getElementById('loading-parser');
var formParser = document.getElementById('form-parser');

var nonTerminals = ['I', 'S', 'NN', 'VB'];
var terminals = ['abdi', 'urang', 'indung', 'emang', 'mobil', 'ali', 
                'roti', 'kaen', 'kecap', 'bawang', 'tumpak', 
                'nganggo', 'dahar', 'masak'];

var parse_table = [];

parse_table[['I', 'abdi']] = ['S', 'VB', 'NN']
parse_table[['I', 'urang']] = ['S', 'VB', 'NN']
parse_table[['I', 'indung']] = ['S', 'VB', 'NN']
parse_table[['I', 'emang']] = ['S', 'VB', 'NN']
parse_table[['I', 'mobil']] = ['error']
parse_table[['I', 'ali']] = ['error']
parse_table[['I', 'roti']] = ['error']
parse_table[['I', 'kaen']] = ['error']
parse_table[['I', 'kecap']] = ['error']
parse_table[['I', 'bawang']] = ['error']
parse_table[['I', 'tumpak']] = ['error']
parse_table[['I', 'nganggo']] = ['error']
parse_table[['I', 'dahar']] = ['error']
parse_table[['I', 'masak']] = ['error']
parse_table[['I', 'EOS']] = ['error']

parse_table[['S', 'abdi']] = ['abdi']
parse_table[['S', 'urang']] = ['urang']
parse_table[['S', 'indung']] = ['indung']
parse_table[['S', 'emang']] = ['emang']
parse_table[['S', 'mobil']] = ['error']
parse_table[['S', 'ali']] = ['error']
parse_table[['S', 'roti']] = ['error']
parse_table[['S', 'kaen']] = ['error']
parse_table[['S', 'kecap']] = ['error']
parse_table[['S', 'bawang']] = ['error']
parse_table[['S', 'tumpak']] = ['error']
parse_table[['S', 'nganggo']] = ['error']
parse_table[['S', 'dahar']] = ['error']
parse_table[['S', 'masak']] = ['error']
parse_table[['S', 'EOS']] = ['error']

parse_table[['NN', 'abdi']] = ['error']
parse_table[['NN', 'urang']] = ['error']
parse_table[['NN', 'indung']] = ['error']
parse_table[['NN', 'emang']] = ['error']
parse_table[['NN', 'mobil']] = ['mobil']
parse_table[['NN', 'ali']] = ['ali']
parse_table[['NN', 'roti']] = ['roti']
parse_table[['NN', 'kaen']] = ['kaen']
parse_table[['NN', 'kecap']] = ['kecap']
parse_table[['NN', 'bawang']] = ['bawang']
parse_table[['NN', 'tumpak']] = ['error']
parse_table[['NN', 'nganggo']] = ['error']
parse_table[['NN', 'dahar']] = ['error']
parse_table[['NN', 'masak']] = ['error']
parse_table[['NN', 'EOS']] = ['error']

parse_table[['VB', 'abdi']] = ['error']
parse_table[['VB', 'urang']] = ['error']
parse_table[['VB', 'indung']] = ['error']
parse_table[['VB', 'emang']] = ['error']
parse_table[['VB', 'mobil']] = ['error']
parse_table[['VB', 'ali']] = ['error']
parse_table[['VB', 'roti']] = ['error']
parse_table[['VB', 'kaen']] = ['error']
parse_table[['VB', 'kecap']] = ['error']
parse_table[['VB', 'bawang']] = ['error']
parse_table[['VB', 'tumpak']] = ['tumpak']
parse_table[['VB', 'nganggo']] = ['nganggo']
parse_table[['VB', 'dahar']] = ['dahar']
parse_table[['VB', 'masak']] = ['masak']
parse_table[['VB', 'EOS']] = ['error']

formParser.onsubmit = (event) => {
    event.preventDefault();
    var inputData = inputKalimatParser.value.toLowerCase();

    processParser(inputData.split(' '), inputData)
} 

clearParser.onclick = (event) => {
    inputKalimatParser.value = ""
    hasilParser.value = ""
}

var processParser = (tokens, sentences) => {
    // stack initialization
    var stack = [];
    stack.push('#');
    stack.push('I');

    tokens.push('EOS')
    console.log('tokens: ', tokens)
    var idxToken = 0;
    var symbol = tokens[idxToken];

    while(stack.length > 0) {
        var top = stack[stack.length - 1];
        console.log('top =', top);
        console.log('symbol =', symbol);
        if(terminals.includes(top)) {
            console.log('top adalah simbol terminal');  
            if(top == symbol) {
                stack.pop();
                idxToken += 1;
                symbol = tokens[idxToken];
                if(symbol == 'EOS') {
                    console.log('isi stack: ', stack);
                    stack.pop();
                }
            }
        } else if(nonTerminals.includes(top)) {
            console.log('top adalah simbol non terminal');
            if(parse_table[[top, symbol]][0] != 'error') {
                stack.pop();
                var symbolToBePushed = parse_table[[top, symbol]];
                console.log('symbol to be pushed: ', symbolToBePushed);
                for(let i = symbolToBePushed.length - 1; i > -1; i--) {
                    stack.push(symbolToBePushed[i]);
                }
            } else {
                console.log('error');
                break;
            }
        } else {
            console.log('error');
            break;
        }
        console.log('isi stack: ', stack);
    }

    // conclusion
    console.log('konklusi');
    if(symbol == 'EOS' && stack.length == 0) {
        console.log('Input string ', sentences, 'diterima sesuai grammar');
        hasilParser.value = `Input string ${sentences} diterima sesuai grammar`;
    } else {
        console.log('Error, tidak diterima karena tidak sesuai grammar');
        hasilParser.value = 'error, tidak diterima karena tidak sesuai grammar';
    }
}