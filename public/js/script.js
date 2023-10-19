document.addEventListener("DOMContentLoaded", function() {
    const iconFilter = document.querySelector(".icon-filter");
    const filterBar = document.querySelector(".filter-bar");

    iconFilter.addEventListener("click", function() {
        filterBar.classList.toggle("show-filter-bar");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("filter-select");
    const cards = document.querySelectorAll(".card-pokemon");
    
    select.addEventListener("change", function() {
        const selectedType = select.value;

        cards.forEach(card => {
            const types = card.querySelectorAll(".card-types span");
            let shouldShow = false;

            if (selectedType === "all") {
                shouldShow = true;
            } else {
                types.forEach(type => {
                    if (type.classList.contains(selectedType)) {
                        shouldShow = true;
                    }
                });
            }

            card.style.display = shouldShow ? "block" : "none";
        });
    });
});