var str1 = "]][a[b]c]d[e[fg]h[";
var final1 = [];
var temp1 = [];
for (var i = 0; i < str1.length; i++) {
    switch (str1.charAt(i)) {
        case "[":
            temp1.push([]);
            break;
        case "]":
            if (temp1.length > 0) {
                final1 = final1.concat(temp1[temp1.length - 1]);
                temp1 = temp1.slice(0, temp1.length - 1);
            }
            break;
        default:
            if (temp1.length > 0) {
                temp1[temp1.length - 1].push({ index: i, char: str1.charAt(i) });
            }
            break;
    }
}
console.log(final1);
var txt1 = "";
final1
    .sort(function (a, b) { return a.index - b.index; })
    .forEach(function (keys) {
    txt1 += keys.char;
});
console.log(txt1);
