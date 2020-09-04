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
    };
    
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
    };
    return index;
}

function printBill() {
    getEle("tbodyTaxiBill").innerHTML = "";
    calcBill();
    var tagTR;
    //tạo hàng cho tiền taxi theo từng mức km
    if (taxiFee.numberKM <=1) {
        tagTR = printTR(taxiFee.taxiType, 1, taxiFee.theFirstKM, " km" );
        getEle("tbodyTaxiBill").appendChild(tagTR);
    }else if (taxiFee.numberKM <=20 ) {
        tagTR = printTR(taxiFee.taxiType, 1, taxiFee.theFirstKM, " km" );
        getEle("tbodyTaxiBill").appendChild(tagTR);

        tagTR = printTR(taxiFee.taxiType, (parseFloat(taxiFee.numberKM) - 1), taxiFee.from1To20KM, " km");
        getEle("tbodyTaxiBill").appendChild(tagTR);
    }else {
        tagTR = printTR(taxiFee.taxiType, 1, taxiFee.theFirstKM, " km" );
        getEle("tbodyTaxiBill").appendChild(tagTR);

        tagTR = printTR(taxiFee.taxiType, 19, taxiFee.from1To20KM, " km" );
        getEle("tbodyTaxiBill").appendChild(tagTR);

        tagTR = printTR(taxiFee.taxiType, (parseFloat(taxiFee.numberKM) - 20), taxiFee.higher21KM, " km");
        getEle("tbodyTaxiBill").appendChild(tagTR);
    };

    //tạo hàng cho phí chờ. Làm tròn lên cho thời gian chờ
    if (taxiFee.waitingTime != "") {
        tagTR = printTR("Thời gian chờ", Math.ceil(taxiFee.waitingTime), taxiFee.waitingFee, " phút" );
        getEle("tbodyTaxiBill").appendChild(tagTR);
    };

    //tạo hàng cho total
    tagTR = printTR("Total", "", (taxiFee.calcSumWaitingFee() + taxiFee.calcSumTaxiFee()) , "" );
    tagTR.style.backgroundColor = "#c9f2da";
    tagTR.style.color = "#006135";
    getEle("tbodyTaxiBill").appendChild(tagTR);

    //Hiện modal
    getEle("buttonPrint").dataset.target = "#myModal";

}

//tạo dòng cho bảng bill
function printTR(type, used, price, text) {
    //tạo dòng
    var tagTR = document.createElement("tr");
    var tagTD_ChiTiet = document.createElement("td");
    var tagTD_SuDung = document.createElement("td");
    var tagTD_DonGia = document.createElement("td");
    var tagTD_ThanhTien = document.createElement("td");

    //tạo nội dung cho cột
    tagTD_ChiTiet.innerHTML = type;
    tagTD_SuDung.innerHTML = used + text;
    
    if (type == "Total") {
        tagTD_DonGia.innerHTML = "";
        tagTD_ThanhTien.innerHTML = parseFloat(price);
    } else {
        tagTD_DonGia.innerHTML = price;
        tagTD_ThanhTien.innerHTML = parseFloat(used)*parseFloat(price);
    };

    //gắn cột vào dòng
    tagTR.appendChild(tagTD_ChiTiet);
    tagTR.appendChild(tagTD_SuDung);
    tagTR.appendChild(tagTD_DonGia);
    tagTR.appendChild(tagTD_ThanhTien);

    return tagTR;
}

function getEle(id) {
    return document.getElementById(id);
}