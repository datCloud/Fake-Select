(function ($) {
  $.fn.fakeSelect = function () {
    $(this).each(function (index) {
      if (!$(this).is("select")) {
        console.error(
          "Hey! Fake Select here.\nYou know I can't deal with other element than <select>.\nSo why did you do this to me?"
        );
        console.log(this);
        console.error("Pretty please, check your HTML structure.");
        return false;
      }
      $(this).hide();
      $(this).after(`<div class="fake-select" tabindex="${index}"></div>`);
      let options = [];
      $(this)
        .find("option")
        .each(function () {
          options.push([$(this).val(), $(this).text()]);
        });
      let fakeSelect = $(this).next(".fake-select");
      fakeSelect.append(
        `<div class="fake-select--options" style="display:none;"></div>`
      );
      let getDefaultOption = false;
      for (option of options) {
        if (!getDefaultOption) {
          fakeSelect.prepend(`<div data-selected>${option[1]}</div>`);
          getDefaultOption = true;
          continue;
        }
        fakeSelect
          .find(".fake-select--options")
          .append(`<div data-option="${option[0]}">${option[1]}</div>`);
      }
      fakeSelect.on("click", function () {
        $(this).toggleClass("collapsed");
        if ($(this).hasClass("collapsed")) {
          $(this).find(".fake-select--options").fadeIn();
        } else {
          $(this).find(".fake-select--options").fadeOut();
        }
      });
      fakeSelect.on("focusout", function () {
        if ($(this).hasClass("collapsed")) {
          $(this).removeClass("collapsed");
          $(this).find(".fake-select--options").fadeOut();
        }
      });
      fakeSelect.find("[data-option]").on("click", function () {
        $(this)
          .parent()
          .prev()
          .attr("data-selected", $(this).attr("data-option"));
        $(this).parent().prev().text($(this).text());
        fakeSelect
          .prev()
          .find('[value="' + $(this).attr("data-option") + '"]')
          .attr("selected", "selected");
      });
    });
    return this;
  };
})(jQuery);
