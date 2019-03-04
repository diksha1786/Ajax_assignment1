$(document).ready(function () {
    $.ajax({
        url: " https://jsonplaceholder.typicode.com/posts", success: function (data) {
            let arrayofobjects = data;
            function create_New_Table() {
                let previousTable = document.getElementById('Table');
                if (!!previousTable) {
                    previousTable.remove();
                }
                let table = document.createElement('table');
                table.setAttribute('id', 'Table');
                let header = Object.keys(arrayofobjects[0]);
                let tr = document.createElement('tr');
                // for (var i = 0; i < header.length; i++) //in for loop
                let myhead = header.map((array) => { //using map
                    var th = document.createElement('th');
                    th.innerHTML = array;
                    th.setAttribute('class', 'tableClass1');
                    th.setAttribute('id', array)
                    tr.appendChild(th);
                })
                table.appendChild(tr);
                // for (var i = 0; i < arrayofobjects.length; i++)  //instead using map
                let arr = arrayofobjects.map((array1) => {
                    var tr = document.createElement('tr');
                    // for (var j = 0; j < header.length; j++) //instead using map
                    var array2 = header.map((myarray) => {
                        var td = document.createElement('td');
                        td.innerHTML = array1[myarray];
                        td.setAttribute('class', 'tableClass');
                        tr.appendChild(td);
                    })
                    table.appendChild(tr);
                })
                document.body.appendChild(table);
                addEventsToColumns();
            }
            create_New_Table();
            function addEventsToColumns() {
                var header = Object.keys(arrayofobjects[0]);
                // for (var i = 0; i < header.length; i++) //instead using map 
                let head = header.map((myarray1) => {
                    document.getElementById(myarray1).addEventListener('click', function (event) {
                        console.log(event);
                        sortTable(event.target.innerText)
                    })
                })
            }
            let flag = true;
            function sortTable(param) {
                arrayofobjects.sort(compare);
                function compare(a, b) {
                    if (a[param] > b[param] && flag)
                        return 1;
                    else
                        return -1;
                }
                flag = !flag;
                create_New_Table();
            }
        }
    });
});
