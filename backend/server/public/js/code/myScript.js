    const getItems=()=>{
      var promise=new Promise((resolve,reject)=>{
        fetch('/getItems').then((response)=>{
          if(!response.ok) throw Error("Can not fetch api");
            return response.json()
          }).then((items)=>{
              resolve(items)
         }).catch((error)=>{
    reject(error.message);
        });
  });
    return promise;
  }

  const loadItems = () => {
      const tbody = $("#itemsView>tbody");
      tbody.html('<tr><td colspan="3" align="center"><i class="fa-solid fa-spinner fa-spin"></i></td></tr>');
      getItems().then(items => {
              tbody.html("");
              if (items.length === 0) {
                  tbody.append('<tr><td colspan="6" align="center"><b>No items available</b></td></tr>');
                  return;
              }
              items.forEach((item, index) => {
                  tbody.append(`
                      <tr id="${item.code}">
                          <td>${index + 1}</td>
                          <td>${item.code}</td>
                          <td>${item.name}</td>
                      </tr>
                  `);
              });
              // Add click event for item rows
              tbody.find("tr").on("click", function () {
                  const itemId = $(this).attr("id");
                  const selectedItem = items.find(item => item.code == itemId);
                  loadItemsDetails(selectedItem);
              });
          })
          .catch(error => {
              tbody.html(`<tr><td colspan="6" align="center">${error}</td></tr>`);
          });
  };

  
  const getItemsDetails=(item)=>{
    var promise=new Promise((resolve,reject)=>{
        fetch('/getItemsDetails').then((response)=>{
          if(!response.ok) throw Error("Can not fetch api");
            return response.json()
          }).then((items)=>{
              resolve(items)
         }).catch((error)=>{
    reject(error.message);
        });
  });
    return promise;
  }

  
        const loadItemsDetails=(item)=>{
            var k=$("#itemDetailDivision");
            k.html("");
            k.append($("<p style='color:black;font-size: 12pt;'>Detail</p>"));
            k.append($("<p align='center'><i class='fa-solid fa-spinner fa-spin'></i></p>"));
            getItemsDetails(item).then((itemDetail)=>{
                k.html("");
                k.html(`<div class='x_panel'><table>
                  <br>
                  <tr>
                    <th style='font-size: 16pt;'>Item Tax</th>
                  </tr>
                  <tr>
                    <th style='font-size: 12pt;'>Item Name:${item.name}</th>
                  </tr>
                  <tr>
                    <th style='font-size: 12pt;'>CGST:${item.cgst}</th>
                  </tr>
                    <tr>
                    <th style='font-size: 12pt;'>SGST :${item.sgst}</th>
                  </tr>
                  <tr>
                    <th style='font-size: 12pt;'>IGST:${item.igst}</th>
                  </tr>
                  </table> </div>`);               
            });
        }  
  // Initialize on document ready
  
  $(() => {
  loadItems();

});

      const justDoIt = () => {
  // Check if jQuery UI dialog is working
  $("#what").dialog({
      "show": { effect: "drop", direction: "left", duration: 2000 },  // Show animation
      "width": 400,
      "height": 350,
  });
}
$(document).ready(function(){
  // Initialize the dialog content (hidden by default)
  $("#what").hide();
});
  
