$('form [type="submit"]').on("click", function (e) {
  e.preventDefault();
  // Uncomment de code below to test form submit values
  console.log("name: " + $('form [name="name"]').val());
  console.log("e-mail: " + $('form [name="email"]').val());
  console.log("car: " + $('form [name="cars"]').val());
});

$(".show-original").on("click", function () {
  $(this).toggleClass("active");
  $("form select").slideToggle();
});
