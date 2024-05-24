function dateInitialize() {
    $('#start').datepicker(
        {
            orientation: "bottom" 
          }
    );
    $('#end').datepicker(
        {
            orientation: "bottom" 
          }
    );
}
function from_date() {
    return $('#start').val();
}
function to_date() {
    return $('#end').val();
}