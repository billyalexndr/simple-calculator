const CACHE_KEY = "calculation_history"

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
    if(checkForStorage()) {
        let historyData = null
        if(localStorage.getItem(CACHE_KEY) === null) {
            historyData = []
        }else{
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY))
        }
        
        historyData.unshift(data)

        if(historyData.length > 5){
            historyData.pop()
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData))
    }
}

/*
1. JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
2. JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String
3. LocalStorage hanya dapat menyimpan data primitif seperti string, sehingga kita perlu mengubah objek ke dalam bentuk string jika ingin menyimpan ke dalam localStorage
4. JSON sendiri adalah singkatan dari JavaScript Object Notation. JSON merupakan format yang sering digunakan dalam pertukaran data. Saat ini JSON banyak diandalkan karena formatnya berbasis teks dan relatif mudah dibaca.
5. fungsi unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index. Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.
6. Fungsi pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5. Hal ini kita terapkan agar riwayat kalkulasi yang muncul adalah lima hasil kalkulasi terakhir oleh pengguna.

*/


function showHistory() {
    if(checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || []
    }else{
        return []
    }
}

/*
Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.
*/


function renderHistory() {
    const historyData = showHistory()
    let historyList = document.querySelector('#historyList')

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
    
    for (let history of historyData) {
        let row = document.createElement('tr')
        row.innerHTML = "<td>" + history.firstNumber + "</td>"
        row.innerHTML += "<td>" + history.operator + "</td>"
        row.innerHTML += "<td>" + history.secondNumber + "</td>"
        row.innerHTML += "<td>" + history.result + "</td>"

        historyList.appendChild(row)
    }
}


renderHistory()