$(function() {
  var json_base_url = "./assets/json";
  // var json_base_url =
  //   "https://raw.githubusercontent.com/ka-nineteen-developer/jacts_json_generator/master/website/assets/json";
  var factArray = [];
  var currentYear = new Date().getFullYear();

  //   Add all list of JSON files
  var list_of_files = [2019, 2020, 2021, 2022];
  list_of_files.sort(function(a, b) {
    return b - a;
  });
  apiCall();

  function apiCall() {
    $.each(list_of_files, function(index, file) {
      if (file <= currentYear) {
        console.log(file);
        $.getJSON(json_base_url + "/" + file + ".json")
          .then(function(data) {
            if (data) {
              let filterd_data = data.filter(fact => {
                if (
                  moment(fact.publish_date, "DD-MM-YYYY").isSameOrBefore(
                    new Date(),
                    "DD-MM-YYYY"
                  )
                ) {
                  return fact;
                }
              });
              factArray = [...factArray, ...filterd_data.reverse()];
              if (index + 1 == list_of_files.length) {
                generatePagination();
                console.log("End of loop, call a function");
                console.log(factArray);
              }
            } else {
              generatePagination();
              console.error("Something went wrong");
            }
          })
          .catch(function(err) {
            console.error(err.statusText);
            generatePagination();
          });
      }
    });
  }

  function generatePagination() {
    $("#pagination-container").pagination({
      dataSource: factArray,
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        appendList(data);
      }
    });
  }

  function appendList(data) {
    $("#fact_list_w").empty();
    data.map(fact => {
      $("#fact_list_w").append(
        `
              <li class="border_shadow pt-20 pr-20 pb-20 pl-20 mb-10">
                  <h3 class="mb-10">#` +
          fact.id +
          `</h3>
                  <h4>` +
          fact.facts +
          `</h4>
              </li>
            `
      );
    });
    // $.each(data, function(index, fact) {
    //   $("#fact_list_w").append(
    //     `
    //         <li class="border_shadow pt-20 pr-20 pb-20 pl-20 mb-10">
    //             <h3 class="mb-10">#` +
    //       fact.id +
    //       `</h3>
    //             <h4>` +
    //       fact.facts +
    //       `</h4>
    //         </li>
    //       `
    //   );
    // });
  }
});
