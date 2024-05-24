var myclose;
function popFeedback() {
    //var toggle = document.getElementById("toggle");
    var content = document.getElementById("pop");
    //toggle.addEventListener("click", function() {
        content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
    //});
}
function getDate() {
  var d = new Date();
  var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
  return strDate;
}
function feedclose() {
    $("#feed-succ").css("display", "none");

    //$("#f-form").css("display", null);
    var v = document.getElementById("pop");
    v.style.display = "none";
    $('#feedback_text').val('');
}
function displaySearchText(text) {
    document.getElementById("selected_vehicles_info").value = text;
}
function hideSearchText() {
    document.getElementById("selected_vehicles_info").value = '';
}

function updatePageTitle(text) {
    document.getElementById("page_title").innerHTML = text;
}

function hidePageTitle(text) {
  document.getElementById("page_title").innerHTML = '';
}

function vehicleTitle(text) {
  document.getElementById("vech_title").innerHTML = text;
}

function multipleselectyear() {
  $('.selectpicker').selectpicker();
};
function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
}
function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    $("." + arr1[1] + "").css("display", "none");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
}
var gAutoPrint = true;

function processPrint(blockid) {

  var make = document.getElementById("make_list").value;
  var model = document.getElementById("model_list").value;
  var year = document.getElementById("year_list").value;
  var key = document.getElementById("options_1").value;
  var option = document.getElementById("options_2").value;
  var option3 = document.getElementById("options_3").value;
  var option4 = document.getElementById("options_4").value;
  var option5 = document.getElementById("options_5").value;
  var option6 = document.getElementById("options_6").value;
  var makeNew = (make != "") ? " : " + make : "";
  var modelNew = (model != "") ? " : " + model : "";
  var yearNew = (year != "") ? year : "";
  var keyNew = (key != "") ? " : " + key : "";
  var optionNew = (option != "") ? " : " + option : "";
  var option3New = (option3 != "") ? " : " + option3 : "";
  var option4New = (option4 != "") ? " : " + option4 : "";
  var option5New = (option5 != "") ? " : " + option5 : "";
  var option6New = (option6 != "") ? " : " + option6 : "";
  if (document.getElementById != null) {

    var html = '<HTML>\n<HEAD>\n';

    if (document.getElementsByTagName != null) {

      var headTags = document.getElementsByTagName("head");

      if (headTags.length > 0) html += headTags[0].innerHTML;

    }

    html += '\n</HE' + 'AD>\n<BODY>\n';

    var printReadyElemTop = '\n<div style="padding:10px;font-weight:700;margin-bottom:10px;font-size:20px;">' + yearNew + "  " + makeNew + "  " + modelNew + "  " + keyNew + "  " + optionNew + "  " + option3New + "  " + option4New + "  " + option5New + "  " + option6New + "\n</div>";

    html += printReadyElemTop;


    var printReadyElem = document.getElementById(blockid);

    if (printReadyElem != null) html += printReadyElem.innerHTML;

    else {

      alert("Error, no contents.");

      return;

    }

    html += '\n</BO' + 'DY>\n</HT' + 'ML>';

    var printWin = window.open("", "Vehicle Details");

    printWin.document.open();

    printWin.document.write(html);

    printWin.document.close();
    
    if (gAutoPrint){
      setTimeout(function(){  printWin.print(); }, 3000);     
    }

  } 
  else {
  alert("Browser not supported.");
  }

}

function processPrintDetails(blockid, make, model, year, option1, option2, option3, option4, option5, option6) {

  var make = make;
  var model = model;
  var year = year;
  var key = option1;
  var option = option2;
  var option3 = option3;
  var option4 = option4;
  var option5 = option5;
  var option6 = option6;
  var makeNew = (make != "") ? " : " + make : "";
  var modelNew = (model != "") ? " : " + model : "";
  var yearNew = (year != "") ? year : "";
  var keyNew = (key != "") ? " : " + key : "";
  var optionNew = (option != "") ? " : " + option : "";
  var option3New = (option3 != "") ? " : " + option3 : "";
  var option4New = (option4 != "") ? " : " + option4 : "";
  var option5New = (option5 != "") ? " : " + option5 : "";
  var option6New = (option6 != "") ? " : " + option6 : "";
  if (document.getElementById != null) {

    var html = '<HTML>\n<HEAD>\n';

    if (document.getElementsByTagName != null) {

      var headTags = document.getElementsByTagName("head");

      if (headTags.length > 0) html += headTags[0].innerHTML;

    }

    html += '\n</HE' + 'AD>\n<BODY>\n';

    var printReadyElemTop = '\n<div style="padding:10px;font-weight:700;margin-bottom:10px;font-size:20px;">' + yearNew + "  " + makeNew + "  " + modelNew + "  " + keyNew + "  " + optionNew + "  " + option3New + "  " + option4New + "  " + option5New + "  " + option6New + "\n</div>";

    html += printReadyElemTop;


    var printReadyElem = document.getElementById(blockid);

    if (printReadyElem != null) html += printReadyElem.innerHTML;

    else {

      alert("Error, no contents.");

      return;

    }

    html += '\n</BO' + 'DY>\n</HT' + 'ML>';

    var printWin = window.open("", "Vehicle Details");

    printWin.document.open();

    printWin.document.write(html);

    printWin.document.close();
    
    if (gAutoPrint){
      setTimeout(function(){  printWin.print(); }, 3000);     
    }

  } 
  else {
  alert("Browser not supported.");
  }

}

function addOptions( fromId, toId ) {
  var fromEl = document.getElementById( fromId ),
      toEl = document.getElementById( toId );

  if ( fromEl.selectedIndex >= 0 ) {
      var index = toEl.options.length;

      for ( var i = 0; i < fromEl.options.length; i++ ) {
          if ( fromEl.options[ i ].selected ) {
              toEl.options[ index ] = fromEl.options[ i ];
              i--;
              index++
          }
      }
  }
}

function getOptions(fromId) {
  var fromEl = document.getElementById( fromId );
  var opt = [];
  for ( var i = 0; i < fromEl.options.length; i++ ) {
    opt[i] = fromEl.options[i].value.substring(fromEl.options[i].value.indexOf(':') + 1).trim();
  }
  return opt;
}
function watchPages() {
  $('.panel-body').on('mousedown touchstart', '.paginate_button:not(.previous):not(.next)', function() {
    $('.search_top_check').prop('checked', false);
    $('.search_section_check').each(function() {
      $(this).prop('checked', false);
    });
    $('#btnFlag').css('display', 'none');
  });
}

function imageGallery() {
  $('#search_results div.works-slideshow div.team-item').each(function() {
    var slider = $(this);
    slider.slick({
      arrows: true,
      dots: false,
      accessibility: false,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      slidesToScroll: 1
    });    
    var sLightbox = $(this);
    sLightbox.slickLightbox({
      src: 'src',
      itemSelector: '.team-image img'
    });
  });
}

function sectionimageGallery() {
  $('#search_results .image-slideshow').each(function() {
    var slider = $(this);
    slider.slick({
      arrows: true,
      dots: false,
      accessibility: false,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      slidesToScroll: 1
    });    
    var sLightbox = $(this);
    sLightbox.slickLightbox({
      src: 'src',
      itemSelector: '.section-image img'
    });
  });
}

function lboxo(id){
  $("#"+id).css('display', 'block');
}
function lboxc(id){
  $("#"+id).css('display', 'none');
}