export const accumulate = (items) => {
    if (items.length > 0) {

        let total = 0
        items.map(item => total += item.price)
        console.log("this:" + total)
        return total
    }
    return 0;
}