/**
 * Mục đích: Tạo file thực hiện các thao tác tính tiền + in bill
 * Người tạo: Lượng
 * Ngày tạo: 4/9/2020
 * Version: 1.0
 */

var taxiFee;
function calcBill() {
    //tìm loại taxi theo vị trí index trong mảng TaxiList
    var index = checkTaxiType();

    var numberKM = getEle("numberKM").value;
    var waitingTime = getEle("waitingTime").value;

    if (index == -1) {
        alert("Vui lòng chọn loại xe");
    } else if (numberKM == ""){
        alert("Vui lòng nhập số KM");
    } else {    
        taxiFee = new TaxiFee(numberKM, waitingTime, index, taxiArray);
        
        getEle("xuatTien").innerHTML = taxiFee.calcSumWaitingFee() + taxiFee.calcSumTaxiFee();
        getEle("divThanhTien").style.display = "block";
    }
    
}

//Hàm dùng để kiểm tra loại taxi sử dụng --> đưa ra vị trí trong mảng TaxiList
function checkTaxiType() {
    var index;
    //cách 1: duyệt mảng theo name selector
    // var selectorArray = document.getElementsByName("selector");
    // for (var i = 0; i < selectorArray.length; i++) {
    //     if (selectorArray[i].checked) {
    //         index = i;
    //         break;
    //     }
    // }
    
    //cách 2 là dùng switch case nếu số lượng selector ít
    switch (true) {
        case getEle("uberX").checked:
            index = 0;
            break;
        case getEle("uberSUV").checked:
            index = 1;
            break;
        case getEle("uberBlack").checked:
            index = 2;
            break;
        default:
            index = -1;
            break;
    }
    return index;
}

function getEle(id) {
    return document.getElementById(id);
}