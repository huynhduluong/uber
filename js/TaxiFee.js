/**
 * Mục đích: Tạo đối tượng để thực hiện tính phí taxi
 * Người tạo: Lượng
 * Ngày tạo: 4/9/2020
 * Version: 1.0
 */

function TaxiFee(_numberKM, _waitingTime, _index, _taxiArray) {
    this.numberKM = _numberKM;
    this.waitingTime = _waitingTime;
    this.taxiType = _taxiArray[_index].taxiType;
    this.theFirstKM = _taxiArray[_index].theFirstKM;
    this.from1To20KM = _taxiArray[_index].from1To20KM;
    this.higher21KM = _taxiArray[_index].higher21KM;
    this.waitingFee = _taxiArray[_index].waitingFee;

    this.calcSumWaitingFee = function () {
        var sumWaitingFee;
        if (this.waitingTime == "") {
            sumWaitingFee = 0;
        } else {
            sumWaitingFee = Math.ceil(parseFloat(this.waitingTime))*parseFloat(this.waitingFee);
        }        
        return sumWaitingFee;
    };

    this.calcSumTaxiFee = function () {
        var sumTaxiFee;
        if (this.numberKM <= 1) {
            sumTaxiFee = parseFloat(this.theFirstKM);
        }else if (this.numberKM <= 20) {
            sumTaxiFee = parseFloat(this.theFirstKM) + parseFloat(this.from1To20KM)*(parseFloat(this.numberKM) - 1);
        } else {
            sumTaxiFee = parseFloat(this.theFirstKM) + parseFloat(this.from1To20KM)*19 + parseFloat(this.higher21KM)*(parseFloat(this.numberKM) - 20);
        }
        return sumTaxiFee;
    }
}