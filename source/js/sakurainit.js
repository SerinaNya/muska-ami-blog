var sakura_load = false;

function sakura() {
  if (!sakura_load) {
    var sakura = new Sakura("body", {
      colors: [
        {
          gradientColorStart: "rgba(255, 183, 197, 0.9)",
          gradientColorEnd: "rgba(255, 197, 208, 0.9)",
          gradientColorDegree: 120,
        },
        {
          gradientColorStart: "rgba(255,189,189)",
          gradientColorEnd: "rgba(227,170,181)",
          gradientColorDegree: 120,
        },
        {
          gradientColorStart: "rgba(212,152,163)",
          gradientColorEnd: "rgba(242,185,196)",
          gradientColorDegree: 120,
        },
      ],
    });
    sakura_load = true;
  }
}
