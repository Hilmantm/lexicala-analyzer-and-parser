var inputKalimat = document.getElementById('input_kalimat');
var submit = document.getElementById('btn-analyze');
var hasil = document.getElementById('result');

submit.onclick = (event) => {
    hasil.value = inputKalimat.value
}
