
    var inventors = [
      { 
      first: 'Albert', 
      last: 'Einstein', 
      year: 1879, 
      passed: 1955 
    },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
    ];

    var updatedInventors = [];
    // const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];


    var tableRow = document.getElementById('js-table');

     function drawTable(i) {
       var tableHeaders = "<th>First Name</th>" + "<th>Last Name</th>" + "<th>Born</th>" + "<th>Died</th>";
       tableRow.innerHTML = tableHeaders;
       for (var i = 0; i < inventors.length; i++) {
         var tr = "<tr>";  
         tr += "<td>" + inventors[i].first + "</td>" + "<td>" + inventors[i].last + "</td>" +  "<td>" + inventors[i].year + "</td>" +  "<td>" + inventors[i].passed + "</td>" +"</tr>"
         tableRow.innerHTML += tr;
       }
       addListener();
      console.log('tesdst')
    }

    drawTable()

    var constants = {
      "First Name": "first",
      "Last Name": 'last',
      "Born": 'year',
      "Died": 'passed'
    };
    function sortCol(h) {
      // var colNum = h.path[0].cellIndex;
      var headerName = h.target.textContent;
      var columnName = constants[headerName];
      inventors = inventors.sort((a,b) => a[columnName]> b[columnName] ? 1 : -1);
      tableRow.innerHTML = '';
      drawTable();
      // console.log(colNum)
      console.log(h)
      // console.log(headerName)
    }
    
    
    function addListener() {
      var headerNodes = document.querySelectorAll('#js-table tr th');
      var headers = Array.from(headerNodes);
      headers.forEach(header => header.addEventListener('click' , sortCol));
    }
    
    // headers.forEach(header => header.addEventListener('click' , sortCol))

  

   // ---------------------TABLE SORTING---------------------
   
   // var table = document.getElementById("baseball-table");
   
   // function sortTable(n) {
     //   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
     //   table = document.getElementById("baseball-table");
    //   switching = true;
    //   dir = 'asc';

    //   while (switching) {
    //     switching = false;
    //     rows = table.rows;
    //     for (i = 1; i < (rows.length - 1); i++) {
    //       shouldSwitch = false;
    //       x = rows[i].getElementsByTagName("td")[n];
    //       y = rows[i + 1].getElementsByTagName("td")[n];
    //       if (dir == 'asc') {
      //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    //           shouldSwitch = true;
    //           break;
    //         }
    //       } else if (dir == 'desc') {
    //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
      //           shouldSwitch = true;
      //           break;
    //         }
    //       }
    //     }

    //     if (shouldSwitch) {
      //       /* If a switch has been marked, make the switch
      //       and mark that a switch has been done: */
      //       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      //       switching = true;
      //       // Each time a switch is done, increase this count by 1:
      //       switchcount ++; 
    //     } else {
      //       /* If no switching has been done AND the direction is "asc",
      //       set the direction to "desc" and run the while loop again. */
      //       if (switchcount == 0 && dir == "asc") {
    //         dir = "desc";
    //         switching = true;
    //       }
    //     }
    //   }
    // }

    // function test(e){
    //   console.log(e)
    // }
    


    // ---------------------ARRAY Questions---------------------
    
    
        // Array.prototype.filter()
        // 1. Filter the list of inventors for those who were born in the 1500's
    
    
    
        // Array.prototype.map()
        // 2. Give us an array of the inventors' first and last names 
        // - returns a new array
        // - *think works like a little factory* 
        // - always returns the same amount you give it 
    
        
        // Array.prototype.sort()
        // 3. Sort the inventors by birthdate, oldest to youngest
        
        
        // Array.prototype.reduce()
        // 4. How many years did all the inventors live?
        
       
    
        // 5. Sort the inventors by years lived
    
      
    
    
        // 7. sort Exercise
        // Sort the people alphabetically by last name
    
    
        // 8. Reduce Exercise
        // Sum up the instances of each of these

    // ---------------------ARRAY ANSWERS---------------------


    //     // Array.prototype.filter()
    // // 1. Filter the list of inventors for those who were born in the 1500's
    // const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year <1600);



    // // Array.prototype.map()
    // // 2. Give us an array of the inventors' first and last names 
    // // - returns a new array
    // // - *think works like a little factory* 
    // // - always returns the same amount you give it 
    // const fullNames = inventors.map(inventor => inventor.first + " " + inventor.last);
    
    // // Array.prototype.sort()
    // // 3. Sort the inventors by birthdate, oldest to youngest
    // const ordered = inventors.sort((a,b)=> a.year > b.year ? 1 : -1)
    // console.table(ordered)
    
    // // Array.prototype.reduce()
    // // 4. How many years did all the inventors live?
    
    // const totalYears = inventors.reduce((total , inventor) => {
    //   return total + (inventor.passed - inventor.year);
    // }, 0);

    // console.log(totalYears)

    // // 5. Sort the inventors by years lived
    // const oldest = inventors.sort((a, b) => {
    //   const lastGuy = a.passed - a.year;
    //   const nextGuy = b.passed - b.year;
    //   return lastGuy > nextGuy ? -1 : 1;
    // });

    // console.table(oldest);


    // // 7. sort Exercise
    // // Sort the people alphabetically by last name
    // const alpha = people.sort((lastOne , nextOne)=>{
    //   const [aLast, afirst] = lastOne.split(', ');
    //   const [bLast, bFirst] = nextOne.split(', ');
    //   return aLast > bLast ? 1 : -1;
    //   console.log(alpha)
    // })


    // // 8. Reduce Exercise
    // // Sum up the instances of each of these
    // const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
    // const transportation = data.reduce((obj, item)=> {
    //   if(!obj[item]){
    //     obj[item] = 0;
    //   }
    //   obj[item]++;
    //   return obj;
    // }, {});

    // console.log(transportation)