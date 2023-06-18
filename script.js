function fetchEmployeeData() {
    var employeeId = document.getElementById('employeeIdInput').value;
    var url = `https://sheets.googleapis.com/v4/spreadsheets/1vRpGEopfvu5o_2Zm9m6aklujpXSDCNgljmHxSEYEcmU/values/MASTER%20SHEET?key=AIzaSyAE--GAox2E7bcrXU9JSvp-O903FJ9X86c`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var values = data.values;
        var employeeData = null;
  
        if (values.length > 1) {
          var headers = values[0];
          var employeeIndex = headers.indexOf("Employee Id");
  
          for (var i = 1; i < values.length; i++) {
            var row = values[i];
            if (row[employeeIndex] == employeeId) {
              employeeData = {
                employeeId: row[employeeIndex],
                imageLink: row[1],
                accountCareOf: row[2],
                fatherName: row[3],
                phoneNumber: row[4],
                alternatePhoneNumber: row[5],
                streetAddress: row[6],
                locality: row[7],
                city: row[8],
                pin: row[9],
                function1: row[10],
                accountName1: row[11],
                function2: row[12],
                accountName2: row[13],
                comments: row[14],
                accountSince: row[15],
                age: row[16]
              };
              break;
            }
          }
        }
  
        if (employeeData) {
          displayEmployeeData(employeeData);
        } else {
          displayErrorMessage("Employee data not found");
        }
      })
      .catch(error => {
        displayErrorMessage("Failed to fetch employee data: " + error.message);
      });
  }
  
  function displayEmployeeData(employeeData) {
    var employeeDataDiv = document.getElementById('employeeData');
    
    var table = document.createElement('table');
    table.classList.add('employee-table');
    
    var tbody = document.createElement('tbody');
    
    for (var key in employeeData) {
      if (employeeData.hasOwnProperty(key)) {
        var dataRow = document.createElement('tr');
        
        var headerCell = document.createElement('th');
        headerCell.textContent = key;
        
        var dataCell = document.createElement('td');
        
        if (key === 'imageLink') {
          var imageContainer = document.createElement('div');
          imageContainer.classList.add('employee-image-container');
          
          var image = document.createElement('img');
          image.src = employeeData[key];
          image.alt = 'Employee Image';
          
          imageContainer.appendChild(image);
          dataCell.appendChild(imageContainer);
        } else {
          dataCell.textContent = employeeData[key];
        }
        
        dataRow.appendChild(headerCell);
        dataRow.appendChild(dataCell);
        
        tbody.appendChild(dataRow);
      }
    }
    
    table.appendChild(tbody);
    employeeDataDiv.innerHTML = '';
    employeeDataDiv.appendChild(table);
  }
  
  
  
  
  function displayErrorMessage(errorMessage) {
    var employeeDataDiv = document.getElementById('employeeData');
    employeeDataDiv.innerHTML = `<p>${errorMessage}</p>`;
  }
  