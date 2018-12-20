/// <reference path="jquery-3.3.1.js" />

$(function () {

    $("#myTable").ready(function () {
        var lines = [];
        var keys = Object.keys(localStorage);
        for (var i = 0; i < keys.length; i++) {
            lines.push(localStorage.getItem(keys[i]));
        }
        var linesJS = [];
        for (var i = 0; i < lines.length; i++) {
            linesJS.push(JSON.parse(lines[i]));
        }
        for (var i = 0; i < linesJS.length; i++) {
            var bundleID = linesJS[i].bundle;
            var url = linesJS[i].URL;
            var trLine = document.createElement("tr");

            if (url.includes("google")) {
                trLine.setAttribute("class", "table-success");
            } else {
                trLine.setAttribute("class", "table-primary");
            }

            var myTable = document.getElementById("myTable");
            var tdBundle = document.createElement("td");
            var tdURL = document.createElement("td");
            var xButton = document.createElement("td");
            tdBundle.innerText = bundleID;
            tdURL.innerHTML = "<a href='" + url + "' target='_blank'>" + url + "</a>";
            xButton.innerHTML = "<a class='delete' href='#'><img src='images/xbutton.png' width='30' height='30' class='d-inline-block align-top' alt='X'></img></a>";
            trLine.appendChild(tdBundle);
            trLine.appendChild(tdURL);
            trLine.appendChild(xButton);
            myTable.appendChild(trLine);

            $("#myTable").on("click", ".delete", function () {
                var key = $(this).parent().prev().prev().text();
                localStorage.removeItem(key);
                $(this).closest("tr").remove();
            });
        }


    });

    $("#googleSub").click(function () {
        var GplayBox = document.getElementById("GplayBox");
        var GplayBundle = GplayBox.value;
        var url = "https://play.google.com/store/apps/details?id=" + GplayBundle;
        var myTable = document.getElementById("myTable");
        var newTR = document.createElement("tr");
        newTR.setAttribute("class", "table-success");
        var tdBundle = document.createElement("td");
        tdBundle.innerText = GplayBundle;
        var tdURL = document.createElement("td");
        tdURL.innerHTML = "<a href='" + url + "' target='_blank'>" + url + "</a>";
        var xButton = document.createElement("td")
        xButton.setAttribute("class", "xButton");
        xButton.innerHTML = "<a class='delete' href='#'><img src='images/xbutton.png' width='30' height='30' class='d-inline-block align-top' alt='X'></img></a>";


        newTR.appendChild(tdBundle);
        newTR.appendChild(tdURL);
        newTR.appendChild(xButton);
        myTable.appendChild(newTR);
        window.open(url, "_blank");


        var bundle = "bundle";
        var URL = "URL";


        var tableLine = new Object;
        tableLine[bundle] = GplayBundle;
        tableLine[URL] = url;


        setJSON(tableLine);

        $('input[type="search"]').val('');


        $("#myTable").on("click", ".delete", function () {
            var key = $(this).parent().prev().prev().text();
            localStorage.removeItem(key);
            $(this).closest("tr").remove();
        });
    });

    $("#iosSub").click(function () {
        var itunesBox = document.getElementById("itunesBox");
        var iosBundle = itunesBox.value;
        var url = "https://itunes.apple.com/app/id" + iosBundle + "?mt=8";
        var myTable = document.getElementById("myTable");
        var newTR = document.createElement("tr");
        newTR.setAttribute("class", "table-primary");
        var tdBundle = document.createElement("td");
        tdBundle.innerText = iosBundle;
        var tdURL = document.createElement("td");
        tdURL.innerHTML = "<a href='" + url + "' target='_blank'>" + url + "</a>";
        var xButton = document.createElement("td")
        xButton.setAttribute("class", "xButton");
        xButton.innerHTML = "<a class='delete' href='#'><img src='images/xbutton.png' width='30' height='30' class='d-inline-block align-top' alt='X'></img></a>";

        newTR.appendChild(tdBundle);
        newTR.appendChild(tdURL);
        newTR.appendChild(xButton);
        myTable.appendChild(newTR);
        window.open(url, "_blank");

        var bundle = "bundle";
        var URL = "URL";


        var tableLine = new Object;
        tableLine[bundle] = iosBundle;
        tableLine[URL] = url;


        setJSON(tableLine);

        $('input[type="search"]').val('');


        $("#myTable").on("click", ".delete", function () {
            var key = $(this).parent().prev().prev().text();
            localStorage.removeItem(key);
            $(this).closest("tr").remove();
        });
    });

    function setJSON(tableLine) {
        var line = tableLine;
        var bundle = tableLine.bundle;
        var jasonThisLine = JSON.stringify(line);
        localStorage.setItem(bundle, jasonThisLine);
    }


    $('#export').click(function () {
        var titles = ["Bundle ID", "App Store URL"];
        var data = [];

        var lines = [];
        var keys = Object.keys(localStorage);
        for (var i = 0; i < keys.length; i++) {
            lines.push(localStorage.getItem(keys[i]));
        }
        var linesJS = [];
        for (var i = 0; i < lines.length; i++) {
            linesJS.push(JSON.parse(lines[i]));
        }
        for (var i = 0; i < linesJS.length; i++) {
            var bundleID = linesJS[i].bundle;
            var url = linesJS[i].URL;
            data.push(bundleID);
            data.push(url);
        }


        var CSVString = prepCSVRow(titles, titles.length, '');
        CSVString = prepCSVRow(data, titles.length, CSVString);


        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", CSVString]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "data.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    function prepCSVRow(arr, columnCount, initial) {
        var row = ''; // this will hold data
        var delimeter = ','; // data slice separator, in excel it's `;`, in usual CSv it's `,`
        var newLine = '\r\n'; // newline separator for CSV row

        function splitArray(_arr, _count) {
            var splitted = [];
            var result = [];
            _arr.forEach(function (item, idx) {
                if ((idx + 1) % _count === 0) {
                    splitted.push(item);
                    result.push(splitted);
                    splitted = [];
                } else {
                    splitted.push(item);
                }
            });
            return result;
        }
        var plainArr = splitArray(arr, columnCount);
        // don't know how to explain this
        // you just have to like follow the code
        // and you understand, it's pretty simple
        // it converts `['a', 'b', 'c']` to `a,b,c` string
        plainArr.forEach(function (arrItem) {
            arrItem.forEach(function (item, idx) {
                row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
            });
            row += newLine;
        });
        return initial + row;
    }



});

