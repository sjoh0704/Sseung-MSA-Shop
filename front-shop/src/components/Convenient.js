export function setDate(time) {
    if (!time) return time;
    let [date, tmp] = time.split("T");
    console.log(date);
    let [hour, min] = tmp.split(":");
    console.log(hour, min);
    let _date = `${date} ${hour}:${min}`;
    return _date;
}

export function setMoney(amount) {
    let _amount = amount
        ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : amount;

    return _amount;
}
