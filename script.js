//bebyggelse
const byggUrl =
  "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvBebyggdLnKnN";
const byggQuery = {
  query: [
    {
      code: "Region",
      selection: {
        filter: "vs:RegionLän99EjAggr",
        values: [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
        ],
      },
    },
    {
      code: "Markanvandningsklass",
      selection: {
        filter: "item",
        values: ["239"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: ["2020"],
      },
    },
  ],
  response: {
    format: "JSON",
  },
};

//Land och vatten
const landYtaUrl =
  "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0802/Areal2012NN";
const landYtaQuery = {
  query: [
    {
      code: "Region",
      selection: {
        filter: "vs:BRegionLän07N",
        values: [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
        ],
      },
    },
    {
      code: "ArealTyp",
      selection: {
        filter: "item",
        values: ["01"],
      },
    },
    {
      code: "ContentsCode",
      selection: {
        filter: "item",
        values: ["000001O4"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: ["2020"],
      },
    },
  ],
  response: {
    format: "JSON",
  },
};

//skyddad natur skyddad
const skyddadUrl =
  "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/skyddadnaturN";
const skyddadQuery = {
  query: [
    {
      code: "Region",
      selection: {
        filter: "vs:RegionLän07EjAggr",
        values: [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
        ],
      },
    },
    {
      code: "Skyddsform",
      selection: {
        filter: "item",
        values: ["TOTO"],
      },
    },
    {
      code: "ContentsCode",
      selection: {
        filter: "item",
        values: ["000003HJ"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: ["2020"],
      },
    },
  ],
  response: {
    format: "json",
  },
};

// skogsbruk
const skogUrl =
  "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN";
const skogQuery = {
  query: [
    {
      code: "Region",
      selection: {
        filter: "vs:RegionLän07",
        values: [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
        ],
      },
    },
    {
      code: "Markanvandningsklass",
      selection: {
        filter: "item",
        values: ["211"],
      },
    },
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: ["2020"],
      },
    },
  ],
  response: {
    format: "json",
  },
};

const regionCodes = {
  "01": "Stockholm",
  "03": "Uppsala",
  "04": "Södermanland",
  "05": "Östergötland",
  "06": "Jönköping",
  "07": "Kronoberg",
  "08": "Kalmar",
  "09": "Gotland",
  10: "Blekinge",
  12: "Skåne",
  13: "Halland",
  14: "Västra Götaland",
  17: "Värmland",
  18: "Örebro",
  19: "Västmanland",
  20: "Dalarna",
  21: "Gävleborg",
  22: "Västernorrland",
  23: "Jämtland",
  24: "Västerbotten",
  25: "Norrbotten",
};

// bebyggelsekarta
async function calculateByggData() {
  const byggData = await fetch(byggUrl, {
    method: "POST",
    body: JSON.stringify(byggQuery),
  }).then((res) => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery),
  }).then((res) => res.json());

  const bygg = byggData.data.map((item) => ({
    region: item.key[0],
    value: parseFloat(item.values[0]),
  }));

  const landYta = landYtaData.data.map((item) => ({
    region: item.key[0],
    area: parseFloat(item.values[0]),
  }));

  const result = bygg.map((item) => {
    const regionName = regionCodes[item.region];
    const yta = landYta.find((l) => l.region === item.region)?.area;
    const procent = (item.value / yta) * 100;
    return {
      region: regionName,
      value: parseFloat(procent.toFixed(2)),
    };
  });

  return {
    regions: result.map((r) => r.region),
    values: result.map((r) => r.value),
  };
}

async function displayByggDataOnMap() {
  const mapData = await calculateByggData();

  const data = [
    {
      type: "choroplethmap",
      locations: mapData.regions,
      featureidkey: "properties.name",
      z: mapData.values,
      geojson:
        "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
      zmin: 0,
      zmax: 15,
      colorscale: [
        [0, "#E9E9E9"],

        [0.33, "#8EB1B9"],

        [0.66, "#4A7E89"],

        [1, "#3A6A74"],
      ],
      colorbar: {
        title: "Bebbyggelse (%)",
        tickvals: [0, 5, 10, 15],
        tickfont: { color: "#000" },
        ticktext: ["0%", "5%", "10%", "15%"],
      },
    },
  ];

  const layout = {
    map: { center: { lon: 17.3, lat: 63 }, zoom: 3.4, style: "dark" },
    height: 650,
    width: 550,
    title: "Andel bebyggelse per län (2020)",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  Plotly.newPlot("byggStatistik", data, layout, { displayModeBar: false });
}

// Bara ett anrop till displayskogDataOnMap
displayByggDataOnMap();

//SKOGKARTA

// Gör bara ett anrop till displayskogDataOnMap, som i sin tur anropar calculateskogData
async function calculateSkogData() {
  const skogData = await fetch(skogUrl, {
    method: "POST",
    body: JSON.stringify(skogQuery),
  }).then((res) => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery),
  }).then((res) => res.json());

  const skog = skogData.data.map((item) => ({
    region: item.key[0],
    value: parseFloat(item.values[0]),
  }));

  const landYta = landYtaData.data.map((item) => ({
    region: item.key[0],
    area: parseFloat(item.values[0]),
  }));

  const result = skog.map((item) => {
    const regionName = regionCodes[item.region];
    const yta = landYta.find((l) => l.region === item.region)?.area;
    const procent = (item.value / yta) * 100;
    return {
      region: regionName,
      value: parseFloat(procent.toFixed(2)),
    };
  });

  return {
    regions: result.map((r) => r.region),
    values: result.map((r) => r.value),
  };
}

async function displaySkogDataOnMap() {
  const mapData = await calculateSkogData();

  const data = [
    {
      type: "choroplethmap",
      locations: mapData.regions,
      featureidkey: "properties.name",
      z: mapData.values,
      geojson:
        "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
      zmin: 0,
      zmax: 80,
      colorscale: [
        [0, "#CCB8C0"],
        [0.16, "#B295A1"],
        [0.32, "#987182"],
        [0.64, "#765664"],
        [1, "#3B2B32"],
      ],
      colorbar: {
        title: "Produktiv skogsmark (%)",
        tickvals: [0, 20, 40, 60, 80],
        tickfont: { color: "#000" },
        ticktext: ["0%", "20%", "40%", "60%", "80%"],
      },
    },
  ];

  const layout = {
    map: { center: { lon: 17.3, lat: 63 }, zoom: 3.4, style: "dark" },
    height: 650,
    width: 550,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  Plotly.newPlot("skogStatestik", data, layout, { displayModeBar: false });
}

// Bara ett anrop till displayskogDataOnMap
displaySkogDataOnMap();

//Karta över skyddad natur
async function calculateSkyddadData() {
  const skyddadData = await fetch(skyddadUrl, {
    method: "POST",
    body: JSON.stringify(skyddadQuery),
  }).then((res) => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery),
  }).then((res) => res.json());

  const skyddad = skyddadData.data.map((item) => ({
    region: item.key[0],
    value: parseFloat(item.values[0]),
  }));

  const landYta = landYtaData.data.map((item) => ({
    region: item.key[0],
    area: parseFloat(item.values[0]),
  }));

  const result = skyddad.map((item) => {
    const regionName = regionCodes[item.region];
    const yta = landYta.find((l) => l.region === item.region)?.area;
    const procent = (item.value / yta) * 100;
    return {
      region: regionName,
      value: parseFloat(procent.toFixed(2)),
    };
  });

  return {
    regions: result.map((r) => r.region),
    values: result.map((r) => r.value),
  };
}
async function displaySkyddadDataOnMap() {
  const mapData = await calculateSkyddadData();

  const data = [
    {
      type: "choroplethmap",
      locations: mapData.regions,
      featureidkey: "properties.name",
      z: mapData.values,
      geojson:
        "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
      zmin: 0,
      zmax: 30,
      colorscale: [
        [0.0, "#DCECC7"],
        [0.33, "#AABD8C"],
        [0.66, "#7E985F"],
        [1.0, "#4F6039"],
      ],
      colorbar: {
        title: "skyddad Natur (%)",
        tickvals: [0, 5, 10, 15, 20, 25, 30],
        tickfont: { color: "#000" },
        ticktext: ["0%", "5%", "10%", "15%", "20%", "25%", "30%"],
      },
    },
  ];

  const layout = {
    map: { center: { lon: 17.3, lat: 63 }, zoom: 3.4, style: "dark" },
    width: 550,
    height: 650,
    title: "Andel produktiv skogsmark per län (2020)",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  Plotly.newPlot("skyddadStatistik", data, layout, { displayModeBar: false });
}

displaySkyddadDataOnMap();

/* 


// Förhindrar scroll till toppen vid klick på meny
function showSidebar(event) {
  if (event) event.preventDefault(); 
  document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar(event) {
  if (event) event.preventDefault(); 
  document.querySelector('.sidebar').style.display = 'none';
} */

//diagram för alla kartor med län

async function createCompareChart() {
  const [byggData, skogData, skyddadData] = await Promise.all([
    fetch(byggUrl, { method: "POST", body: JSON.stringify(byggQuery) }).then(
      (res) => res.json()
    ),
    fetch(skogUrl, { method: "POST", body: JSON.stringify(skogQuery) }).then(
      (res) => res.json()
    ),
    fetch(skyddadUrl, {
      method: "POST",
      body: JSON.stringify(skyddadQuery),
    }).then((res) => res.json()),
  ]);

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery),
  }).then((res) => res.json());

  const landYta = landYtaData.data.reduce((acc, item) => {
    acc[item.key[0]] = parseFloat(item.values[0]);
    return acc;
  }, {});

  // Summera total landyta
  const totalLandYta = Object.values(landYta).reduce((a, b) => a + b, 0);

  function procentData(data, type) {
    return data.data.map((item) => {
      const code = item.key[0];
      const name = regionCodes[code] || code;
      const yta = landYta[code] || 1;
      const value = parseFloat(item.values[0]);
      const procent = (value / yta) * 100;
      return {
        region: name,
        [type]: parseFloat(procent.toFixed(2)),
        absolut: value,
      };
    });
  }

  const bygg = procentData(byggData, "bygg");
  const skog = procentData(skogData, "skog");
  const skydd = procentData(skyddadData, "skydd");

  // Kombinera per region
  const combined = {};
  [...bygg, ...skog, ...skydd].forEach((item) => {
    if (!combined[item.region])
      combined[item.region] = { bygg: 0, skog: 0, skydd: 0 };
    combined[item.region] = { ...combined[item.region], ...item };
  });

  // Beräkna totaler (för hela Sverige)
  const totalBygg = bygg.reduce((sum, r) => sum + r.absolut, 0);
  const totalSkog = skog.reduce((sum, r) => sum + r.absolut, 0);
  const totalSkydd = skydd.reduce((sum, r) => sum + r.absolut, 0);

  combined["Hela Sverige"] = {
    bygg: parseFloat(((totalBygg / totalLandYta) * 100).toFixed(2)),
    skog: parseFloat(((totalSkog / totalLandYta) * 100).toFixed(2)),
    skydd: parseFloat(((totalSkydd / totalLandYta) * 100).toFixed(2)),
  };

  const labels = Object.keys(combined);
  const byggArr = labels.map((l) => combined[l].bygg);
  const skogArr = labels.map((l) => combined[l].skog);
  const skyddArr = labels.map((l) => combined[l].skydd);

  const canvas = document.getElementById("compareChart");
  canvas.height = 20 * labels.length;
  canvas.width = 20 * labels.length;

  new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Bebyggd mark (%)",
          data: byggArr,
          backgroundColor: "#4A7E89",
        },
        {
          label: "Produktiv skogsmark (%)",
          data: skogArr,
          backgroundColor: "#765664",
        },
        {
          label: "skyddad natur (%)",
          data: skyddArr,
          backgroundColor: "#7E985F",
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            callback: (value) => value + "%",
            color: "#000",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#000",
            font: { size: 10 },
          },
        },
      },
      plugins: {
        legend: {
          align: "start",
          labels: {
            color: "#000",
            align: "start",
          },
        },
      },
    },
  });
}

createCompareChart();

//accordion

const accordions = document.querySelectorAll(".accordion .contentBx");

accordions.forEach((accordion) => {
  accordion.querySelector(".label").addEventListener("click", () => {
    accordion.classList.toggle("active");

    const label = accordion.querySelector(".label");
    const expanded = accordion.classList.contains("active");
    label.setAttribute("aria-expanded", expanded);
  });
});
