$(function() {
  var json_base_url = "./assets/json";
  // var json_base_url =
    "https://raw.githubusercontent.com/ka-nineteen-developer/facts/master/assets/json";
  var factArray = [];
  var currentYear = new Date().getFullYear();
  $('[data-toggle="tooltip"]').tooltip();

  //   Add all list of JSON files
  var list_of_files = [2019, 2020, 2021, 2022];
  list_of_files.sort(function(a, b) {
    return b - a;
  });
  apiCall();

  function apiCall() {
    // $.each(list_of_files, function(index, file) {
    list_of_files.map((file, index) => {
      // })
      if (file <= currentYear) {
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
              }
            } else {
              generatePagination();
              console.error("Something went wrong");
            }
          })
          .catch(function(err) {
            console.error(err);
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

  // Dynamic fact list
  function appendList(data) {
    $("#fact_list_w").empty();
    data.map(fact => {
      $("#fact_list_w").append(
        `
              <li class="border_shadow pt-20 pr-20 pb-10 pl-20 mb-10">
                  <h3 class="mb-10">#` +
          fact.id +
          `</h3>
                  <h4>` +
          fact.facts +
          `</h4>
          <h6 class="text-right mt-10 text-uppercase"><strong>- ` +
          moment(fact.publish_date, "DD-MM-YYYY").format("DD MMMM YYYY") +
          `</strong>
              </li>
            `
      );
    });

    // Set header title width
    let headerW = $(".banner_header").width();
    $(".banner_subheader").css("width", headerW);
    $(".banner_subheader").css("text-align", "right");

    // On resize set header title width
    $(window).resize(function() {
      headerW = $(".banner_header").width();
      $(".banner_subheader").css("text-align", "right");
      $(".banner_subheader").css("width", headerW);
    });

    // On click of pagination scroll to top
    $(".paginationjs-page").on("click", function() {
      let scrollToId = "#fact_list_w";
      scrollToTop(scrollToId);
    });
    $(".paginationjs-prev").on("click", function() {
      let scrollToId = "#fact_list_w";
      scrollToTop(scrollToId);
    });
    $(".paginationjs-next").on("click", function() {
      let scrollToId = "#fact_list_w";
      scrollToTop(scrollToId);
    });

    // Scroll to top
    function scrollToTop(scrollToId) {
      $("html, body").animate(
        {
          scrollTop: $(scrollToId).offset().top
        },
        1000
      );
    }
  }
});
