function findFormula(){
    var v = [], out, calculation, ans, final_calculation,
        sym = ["+","-","*","/"],
        allowBrak = ["00000000", "00001002", "00100200", "10020000", "10021002", "00100002", "10000200"];
    v[0] = document.getElementById("value1").value; //get value1
    v[1] = document.getElementById("value2").value; //get value2
    v[2] = document.getElementById("value3").value; //get value3
    v[3] = document.getElementById("value4").value; //get value4
    out = document.getElementById("output").value; //get output

    var numAll = permute(v); //all possible permutation of numbers
    var operAll = combine([sym, sym, sym]); //all possible combinations of symbols
    var brakAll = convert_num2brak(allowBrak); //all possible location of brackets

    calculate: {
        var i, j, k;
        for(i=0; i<numAll.length; i++){
            var num = numAll[i];
            for(j=0; j<operAll.length; j++){
                var oper = operAll[j];
                for(k=0; k<brakAll.length; k++){
                    var brak = brakAll[k];
                    calculation = brak[0]+num[0]+brak[1]+oper[0]+brak[2]+num[1]+brak[3]+oper[1]+brak[4]+num[2]+brak[5]+oper[2]+brak[6]+num[3]+brak[7];
                    ans = eval(calculation.toString());
                    if (ans == out){
                        final_calculation = (calculation.replace(/[*]/g,"&times;")).replace(/[/]/g,"&#x00F7;") + " = " + ans;
                        break calculate;
                    }
                }
            }
        }
        if (ans != out){
            final_calculation = "No possible solution found"
        }
    }

    outputText(final_calculation);//output answer
    permArr=[], usedChars=[];
    
    return false; //prevent link to action
}


//permuting number function -- recursive
var permArr = [], usedChars = [];//global variable
function permute(input){
    var i, ch;
    for(i=0; i<input.length; i++){
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if(input.length == 0){
            permArr.push(usedChars.slice());
        }
        permute(input); //recursive part
        input.splice(i, 0, ch);
        
        usedChars.pop();
    }
    return permArr;
}

//combining symbol function -- recursive
function combine(arr) {
    if (arr.length === 0) {
        return [];
    } else if (arr.length === 1){
        return arr[0];
    } else {
        var result = [];
        var others = combine(arr.slice(1)); //recursive part
        for(var c in others) {
            for (var i = 0; i < arr[0].length; i++) {
                result.push(arr[0][i] + others[c]);
            }
        }
        return result;
    }
}

//converting brackets to symbols 1=(, 2=), 0=""
function convert_num2brak(arr){
    var result = [];
    for(var i=0; i<arr.length; i++){ //seperate each string
        //convert each number to brackets
        var currentArr = arr[i].split("");
        result[i] = [];
        for(var j=0; j<currentArr.length; j++){
            if(currentArr[j] == "0"){
                result[i][j] = " ";
            } else if(currentArr[j] == "1"){
                result[i][j] = "(";
            } else if(currentArr[j] == 2){
                result[i][j] = ")";
            } else {
                result[i][j] = " ";
            }
        }
    }
    return result;
}

//output function
function outputText(output){//output answer
    document.getElementById("formula").innerHTML = output;
}
