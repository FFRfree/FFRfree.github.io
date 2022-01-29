window.onload = function () {
    function bindDeleteButton() {
        $(".delete").click(function () {
            // console.log(this);
            $(this).parent().parent().remove()
        })  
    }
    bindDeleteButton()

    function appendRow(num = 1,courseName='', weight='', score='') {
        for (let _ = 0; _ < num; _++) {
            let row = '<tr class="data">'+
            '<td><input type="text" class="form-control" value='+ courseName +'></td>'+
            '<td><input type="number" class="credit form-control" value='+ weight +'></td>'+
            '<td><input type="number" class="score form-control" value='+ score +'></td>'+
            '<td class="weightedSum text-center pt-3"></td>'+
            '<td><button class="delete btn btn-primary">delete</button></td>'+
            '</tr>'
            $("#mytable").append(row)
        }
    }
    $("#appendRow").click(function () {
        appendRow(1);
        bindDeleteButton();
    })

    $("#calculate").click(function () {
        //traverse the class="data" tablerow calculate weighted-sum
        $(".data").each(function (index, elem) {
            //select a row
            let credit = $(elem).find("td input[type='number']")[0].value
            let score = $(elem).find("td input[type='number']")[1].value
            let weighted_sum = credit * score
            weighted_sum = Math.round(weighted_sum * 10000)/10000
            $(elem).find("td.weightedSum")[0].innerHTML = weighted_sum
        })
        let selected1 = $(".credit")
        let selected2 = $(".weightedSum")
        let creditSum = 0
        let sum = 0
        for (let i = 0; i < selected1.length; i++) {
            credit = eval(selected1[i].value)
            if (typeof credit === 'number' && !isNaN(credit)){
                creditSum += credit
            }
        }
        for (let i = 0; i < selected2.length; i++) {
            weightedScore = parseInt(selected2[i].innerHTML);
            if (typeof weightedScore === 'number' && !isNaN(weightedScore)){
                sum += parseInt(selected2[i].innerHTML)
            }
        }
        // console.log(creditSum)
        // console.log(sum)
        $("#averageOutput").text("你的平均GPA是: " + sum / creditSum)
    })

    

    function grade2centesimal(grade) { 
        switch (grade) {
            case "A":
                return 4
            case "B+":
                return 3.5
            case "B":
                return 3
            case "C+":
                return 2.5
            case "C":
                return 2
            case "D+":
                return 1.5
            case "D":
                return 1
            default:
                return 1
        }
    }
    function processRawString(data) {
        data = data.split('\n')
        data = data.map(element => {
            let e = element.split('\t');
            let courseName = e[3];
            let weight = e[5];
            let grade = e[11];
            if(typeof grade === 'string'){
                grade = grade2centesimal(grade)
            }
            return [courseName, weight, grade];
        });
        return data
    }
    grade2centesimalMap = {
        "A": 4,
    }
    $("#import").click(function () {
        let rawString = prompt("将表格数据复制到此处");
        let desiredData = processRawString(rawString); //2d array
        for (row of desiredData){
            appendRow(num=1, courseName=row[0], weight=row[1], score=row[2])
        }
        bindDeleteButton()
    })
}