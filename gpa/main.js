window.onload = function () {
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
        $(".delete").click(function () {
            // console.log(this);
            $(this).parent().parent().remove()
        })
    })

    $("#calculate").click(function () {
        //traverse the class="data" tablerow calculate weighted-sum
        $(".data").each(function (index, elem) {
            //select a row
            let credit = $(elem).find("td input[type='number']")[0].value
            let score = $(elem).find("td input[type='number']")[1].value
            let weighted_sum = credit * score
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

    $(".delete").click(function () {
        // console.log(this);
        $(this).parent().parent().remove()
    })

    function processRawString(data) {
        data = data.split('\n')
        data = data.map(element => {
            let e = element.split('\t');
            let courseName = e[3];
            let weight = e[5];
            let score = e[10];
            let grade = e[11];
            return [courseName, weight, score, grade];
        });
        return data
    }

    $("#import").click(function () {
        let rawString = prompt("将表格数据复制到此处");
        let desiredData = processRawString(rawString); //2d array
        for (row of desiredData){
            appendRow(num=1, courseName=row[0], weight=row[1], score=row[2])
        }
    })
}