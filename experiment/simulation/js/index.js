const charts = {};

var currPos = 0;
var currentStepProgress = 1;
var sampleLength = 0;
var sampleDiameter = 0;
var sampleFinalLength = 0;
var sampleFinalDiameter = 0;
const readingData = {
  strain: [
    0,0.00102,0.00204,0.00305,0.00404,0.00506,0.00608,0.00706,0.00809,0.00909,0.0101,0.0111,0.01212,0.01312,0.01412,0.01515,0.01615,0.01714,0.01816,0.01918,0.02017,0.02118,0.02219,0.0232,0.0242,0.02522,0.02624,0.02722,0.02825,0.02925,0.03026,0.03126,0.03227,0.03328,0.03428,0.0353,0.0363,0.0373,0.03832,0.03933,0.04033,0.04134,0.04236,0.04336,0.04436,0.04537,0.04639,0.04738,0.04841,0.04941,0.05041,0.05142,0.05243,0.05344,0.05443,0.05546,0.05647,0.05746,0.05848,0.05949,0.06048,0.0615,0.06251,0.06352,0.06452,0.06553,0.06655,0.06753,0.06856,0.06957,0.07057,0.07157,0.07259,0.07359,0.0746,0.07561,0.07662,0.07762,0.07863,0.07965,0.08064,0.08166,0.08267,0.08368,0.08467,0.08569,0.08671,0.08769,0.08873,0.08972,0.09072,0.09173,0.09275,0.09375,0.09476,0.09578,0.09678,0.09777,0.09879,0.09981,0.1008,0.10182,0.10283,0.10383,0.10483,0.10585,0.10686,0.10785,0.10888,0.10988,0.11088
  ],
  stress: [
    0.00775,18.47522,34.13279,45.91317,54.26454,60.64397,65.10211,68.00993,70.35943,71.69675,72.63501,73.19847,73.81171,74.0336,74.01914,74.4354,74.33933,74.28368,74.44012,74.51877,74.39392,74.3602,74.45804,74.38007,74.173,74.38076,74.37054,74.07286,74.26384,74.08412,74.05455,73.88942,73.98743,73.9506,73.69409,73.89313,73.66108,73.54348,73.57973,73.56848,73.37827,73.35681,73.39517,73.27201,73.02002,73.16682,73.10823,72.80545,73.04028,72.79296,72.70159,72.55263,72.63895,72.49696,72.23226,72.39602,72.20832,71.97734,72.01186,71.94099,71.68065,71.60306,71.51917,71.35278,71.07008,71.10391,70.92405,70.45852,70.54362,70.15283,69.90192,69.61033,69.4603,69.13049,68.64355,68.56995,68.06892,67.58309,67.37955,67.02003,66.4362,66.07457,65.66302,65.17361,64.55795,64.25238,63.75942,62.9735,62.73145,61.96445,61.3063,60.72474,60.14165,59.41832,58.62389,58.13129,57.22924,56.29755,55.71889,54.84151,53.7946,53.04533,52.07939,51.01392,49.83073,48.91432,47.66068,45.42425,41.99076,34.04399,24.80632
  ],
  strain2: [
    0,0.00067,0.00135,0.00202,0.00269,0.00335,0.00403,0.00471,0.00538,0.00605,0.00672,0.0074,0.00805,0.00873,0.00941,0.01009,0.01075,0.01143,0.0121,0.01276,0.01343,0.01411,0.01479,0.01545,0.01613,0.01681,0.01747,0.01814,0.01881,0.01949,0.02016,0.02083,0.0215,0.02218,0.02284,0.02351,0.02419,0.02486,0.02554,0.02621,0.02688,0.02756,0.02821,0.02889,0.02956,0.03024,0.03091,0.03158,0.03226,0.03292,0.03359,0.03427,0.03494,0.03561,0.03629,0.03696,0.03763,0.03829,0.03896,0.03964,0.04032,0.04099,0.04166,0.04234,0.04301,0.04367,0.04434,0.04502,0.0457,0.04636,0.04704,0.04772,0.04837,0.04904,0.04972,0.0504,0.05107,0.05174,0.05242,0.05308,0.05374,0.05442,0.0551,0.05577,0.05644,0.05712,0.05779,0.05845,0.05912,0.0598,0.06048,0.06115,0.06182,0.06249,0.06317,0.06383,0.0645,0.06518,0.06586,0.06652,0.06719,0.06787,0.06853,0.0692,0.06988,0.07056,0.07123,0.0719,0.07257,0.07324,0.0739,0.07458,0.07526,0.07593,0.0766,0.07727,0.07795,0.07861,0.07928,0.07996,0.08063,0.08131,0.08198,0.08265,0.08332,0.08398,0.08466,0.08534,0.08601,0.08668,0.08735,0.08803,0.08869,0.08936,0.09003,0.09072,0.09138,0.09205,0.09273,0.0934,0.09406,0.09473,0.09541,0.09609,0.09676,0.09743,0.0981,0.09877,0.09944,0.10011,0.10079,0.10147,0.10213,0.10281,0.10348,0.10414,0.10481,0.10549,0.10617,0.10684,0.10751,0.10819,0.10885,0.10952,0.11019,0.11087,0.11154,0.11221,0.11289,0.11311,0.11311
  ],
  stress2: [
    0.00902,16.8496,30.94467,42.6946,52.23155,60.26132,67.0563,72.79831,77.48372,81.27754,84.64675,87.44916,89.37869,91.17423,92.841,94.04839,94.83891,95.61151,96.24898,96.36982,96.55783,96.88295,97.13082,97.11332,97.26494,97.35526,97.32896,97.15308,97.07039,97.12899,97.12702,97.05337,96.96273,96.99636,96.78013,96.53567,96.45612,96.55292,96.47911,96.23726,96.30556,96.26893,95.82439,95.6693,95.73685,95.69573,95.42248,95.42238,95.45403,95.10366,94.84804,94.82926,94.77961,94.56574,94.50251,94.41441,94.28713,93.97389,93.74964,93.68911,93.62922,93.4347,93.27799,93.26849,92.97733,92.60715,92.41212,92.42539,92.28442,91.86565,91.8422,91.78423,91.24557,90.9649,90.93553,90.75101,90.42491,90.2719,90.21194,89.7697,89.34467,89.14801,89.01549,88.75653,88.51627,88.26562,88.05095,87.64089,87.25468,87.03093,86.88106,86.52659,86.1966,86.07006,85.77531,85.25277,84.84414,84.71976,84.44555,83.93345,83.79266,83.59248,82.90947,82.46894,82.20747,81.95884,81.51576,81.15826,80.88208,80.39742,79.81076,79.46194,79.09413,78.67431,78.26445,77.79489,77.46058,76.90107,76.2664,75.83552,75.4716,74.92458,74.34693,73.97573,73.47428,72.6936,72.09425,71.70381,71.19374,70.44441,69.99573,69.52121,68.65848,67.92265,67.34828,66.79977,66.03378,65.38205,64.75155,64.01055,63.11179,62.3624,61.641,60.93092,60.10359,59.19886,58.52584,57.58472,56.5134,55.64057,54.83385,53.90451,52.8305,51.97599,51.02306,49.70618,48.55787,47.59796,46.46267,45.15882,44.00864,42.74406,41.12853,39.19897,37.13653,34.82304,31.881,28.39255,24.9602,22.159,19.65884
  ],
  strain3: [
    0.00065,0.00132,0.002,0.00268,0.00335,0.00402,0.00469,0.00536,0.00603,0.0067,0.00738,0.00805,0.00873,0.00939,0.01007,0.01074,0.0114,0.01207,0.01276,0.01343,0.01409,0.01477,0.01545,0.0161,0.01678,0.01746,0.01813,0.0188,0.01947,0.02015,0.02081,0.02148,0.02216,0.02283,0.02351,0.02418,0.02485,0.02552,0.02619,0.02686,0.02753,0.02821,0.02888,0.02955,0.03022,0.0309,0.03156,0.03223,0.03291,0.03359,0.03426,0.03493,0.03561,0.03626,0.03693,0.03761,0.03829,0.03895,0.03963,0.04031,0.04097,0.04164,0.04231,0.04299,0.04366,0.04434,0.04501,0.04568,0.04635,0.04701,0.04769,0.04837,0.04904,0.04971,0.05038,0.05106,0.05172,0.05239,0.05307,0.05374,0.05441,0.05509,0.05576,0.05642,0.05709,0.05777,0.05845,0.05912,0.05979,0.06046,0.06113,0.0618,0.06247,0.06314,0.06382,0.06449,0.06516,0.06584,0.06651,0.06717,0.06784,0.06852,0.0692,0.06986,0.07054,0.07122,0.07187,0.07254,0.07323,0.0739,0.07457,0.07524,0.07592,0.07658,0.07725,0.07793,0.0786,0.07927,0.07995,0.08062,0.08129,0.08195,0.08263,0.0833,0.08398,0.08465,0.08532,0.08599,0.08667,0.08733,0.088
  ],
  stress3: [
    18.56494,34.73024,48.77665,60.77489,70.71197,78.94733,85.64415,90.80516,94.80071,98.08777,100.74526,102.80123,104.35921,105.48319,106.5394,107.25445,107.5544,107.98027,108.52974,108.74466,108.78255,109.08569,109.2262,108.96805,108.88476,109.03548,109.11969,108.92835,108.98288,109.05731,108.71308,108.5145,108.44854,108.46993,108.31565,108.20567,108.09855,108.10289,107.74634,107.54916,107.43769,107.41141,107.25155,106.99944,106.93698,106.75324,106.25232,106.0134,105.99379,105.73637,105.32553,105.17341,104.95727,104.27506,103.84335,103.62303,103.37095,102.84338,102.56265,102.30112,101.82035,101.20618,100.82264,100.53963,100.08367,99.72232,99.32787,98.98581,98.41722,97.85065,97.46231,97.193,96.77743,96.16611,95.96623,95.50835,94.76935,94.23788,93.96752,93.55108,92.90257,92.55167,92.19585,91.45612,90.78581,90.39775,89.95571,89.28702,88.81291,88.35706,87.72219,86.99402,86.32121,85.79226,85.25925,84.61804,83.99917,83.52282,82.66249,81.83615,81.11833,80.60611,79.90063,78.96556,78.38174,77.68638,76.58595,75.72699,75.041,74.1945,73.21693,72.41163,71.67263,70.49475,69.32733,68.3898,67.43802,66.31933,65.23918,64.15652,62.96466,61.56268,60.15531,58.83699,57.50308,55.88475,54.02499,51.99749,48.63574,44.62026,34.29048
  ],
  strain4: [
    0,0.00067,0.00134,0.00201,0.00268,0.00336,0.00404,0.0047,0.00538,0.00605,0.00671,0.00738,0.00806,0.00874,0.0094,0.01008,0.01076,0.01142,0.01209,0.01276,0.01344,0.01411,0.01478,0.01546,0.01613,0.01679,0.01746,0.01814,0.01882,0.01949,0.02016,0.02083,0.0215,0.02217,0.02284,0.02352,0.02419,0.02486,0.02554,0.02621,0.02687,0.02754,0.02822,0.0289,0.02956,0.03024,0.03092,0.03157,0.03224,0.03292,0.0336,0.03427,0.03494,0.03562,0.03629,0.03695,0.03762,0.0383,0.03897,0.03965,0.04031,0.04099,0.04166,0.04232,0.043,0.04368,0.04435,0.04502,0.04569,0.04637,0.04703,0.0477,0.04838,0.04906,0.04972,0.0504,0.05108,0.05173,0.0524,0.05308,0.05376,0.05443,0.0551,0.05577,0.05644,0.05711,0.05778,0.05845,0.05913,0.05981,0.06047,0.06115,0.06182,0.06248,0.06315,0.06383,0.06451,0.06518,0.06585,0.06653,0.06719,0.06785,0.06854,0.06921,0.06988,0.07055,0.07123,0.07189,0.07256,0.07323,0.07391,0.07459,0.07526,0.07593,0.0766,0.07727,0.07793,0.07861,0.07929,0.07996
  ],
  stress4: [
    0.02605,20.11028,36.57628,50.57992,62.42208,72.61526,80.98027,88.17124,94.26505,99.24769,103.29062,106.97074,110.32833,113.01723,114.91888,116.81842,118.51203,119.32717,120.14021,121.01446,121.74745,122.13726,122.5986,123.02623,123.1712,123.08601,123.2027,123.38147,123.51825,123.50865,123.4478,123.58443,123.28833,123.05659,122.95428,123.01655,122.88558,122.60396,122.55932,122.42881,121.84765,121.51298,121.38591,121.16045,120.56253,120.26063,119.99163,119.19073,118.53668,118.07274,117.65204,117.06256,116.5399,116.09931,115.50547,114.63865,114.015,113.43556,112.99827,112.43713,111.73901,111.32457,110.73263,109.80379,109.18939,108.83649,108.16239,107.44711,106.95797,106.45545,105.49895,104.69805,104.18266,103.66263,102.83077,102.29101,101.76107,100.84407,99.91745,99.21353,98.57864,97.83268,97.04837,96.2846,95.56863,94.5535,93.61387,92.75033,91.99525,91.11663,90.06318,89.29001,88.34559,86.93719,85.8818,84.9444,83.94236,82.65107,81.58388,80.52999,78.95457,77.46641,76.28697,74.91667,73.21665,71.70374,70.14153,68.34868,66.16486,63.61238,59.61185,54.98802,49.92829,44.93248,41.29775,38.00919,35.06524,32.0736,29.59931,26.84772
  ],
};

document.getElementById("step1").classList.remove("disabled");
window.refresh();

function handle() {
  eval(`handleStep${currentStepProgress}()`);
  window.refresh();
}

function handleStep1() {
  let pane = document.getElementById("step1");

  pane.classList.add("done");
  pane.classList.remove("active");

  let next = document.getElementById("step2");
  next.classList.add("active");
  next.classList.remove("disabled");

  currentStepProgress = 2;
}

function handleStep2() {
  let pane = document.getElementById("step2");

  if (!mit.isSampleLoaded()) {
    alert("Please load the sample on the machine first!");
    return;
  }

  pane.classList.add("done");
  pane.classList.remove("active");

  document.getElementById("btnNext").disabled = true;

  let mode = "";
  const btnReset = document.getElementById("btnReset");
  const startBtn = document.getElementById("startTest");

  // change sample
  CURRENT_SAMPLE = "rolled";

  btnReset.addEventListener("click", (e) => {
    //mit.reset();
    btnReset.disabled = true;
    //startBtn.disabled = false;
    mit.destroy();
    sample.init();
    utm.init();
    let btnResetSteps = document.getElementsByClassName("btnResetSteps")[0];
    btnResetSteps.style.display = `block`;
    document.getElementById("btnNext").disabled = false;
  });

  startBtn.addEventListener("click", (e) => {
    startBtn.disabled = true;
    let startTextHeading = document.getElementById("startTextHeading");
    setTimeout(() => {
      startTextHeading.innerHTML = `Perfom rolling of individual sample for 20%, 40% amd 60%`;
      btnReset.disabled = false;
    }, 2000);
  });

  pane.classList.add("done");
  pane.classList.remove("active");

  let next = document.getElementById("step3");
  next.classList.add("active");
  next.classList.remove("disabled");

  currentStepProgress = 3;
}

function handleStep3() {
  let pane = document.getElementById("step3");

  if (insertEntry()) {
    pane.classList.add("done");
    pane.classList.remove("active");

    let next = document.getElementById("step4");
    next.classList.add("active");
    next.classList.remove("disabled");

    currentStepProgress = 4;
  }
}
function insertEntry() {
  let len = document.getElementById("step1Length").value;
  // if (!len) {
  //   alert("Please enter the length in step 3.1.");
  //   return false;
  // }

  // if (len < 24 || len > 26) {
  //   alert("Wrong readings! Please take your reading correctly. (Length range must be in b/w 24 to 26 mm)");
  //   return false;
  // }

  sampleLength = len;
  let dia = document.getElementById("step2Dia").value;
  if (!dia) {
    alert("Please enter the diameter in step 3.2.");
    return false;
  }

  // if (dia < 4 || dia > 6) {
  //   alert("Wrong readings! Please take your reading correctly. (Width range must be in b/w 5 to 6 mm)");
  //   return false;
  // }

  sampleDiameter = dia;
  let tick = document.getElementById("step2Thickness").value;
  if (!tick) {
    alert("Please enter the Thickness in step 3.3.");
    return false;
  }

  // if (tick < 2 || tick > 4) {
  //   alert("Wrong readings! Please take your reading correctly. (Thickness range must be in b/w 2 to 4 mm)");
  //   return false;
  // }

  sampleThickness = tick;
  return true;
}
function handleStep4() {
  let pane = document.getElementById("step4");
  if (!utm.isSampleLoaded()) {
    alert("Please load the sample on the UTM machine first!");
    return;
  }
  plotGraph(
    document.getElementById("outputGraphB").getContext("2d"),
    {
      labels: readingData.strain,
      datasets: [
        {
          data: [],
          borderColor: "#3e95cd",
          fill: false,
        },
      ],
    },
    "Strain",
    "Stress"
  );
  document.getElementById("btnNext").disabled = true;
  document.getElementById("startTest1").addEventListener("click", (e) => {
    let tableBody = document.getElementById("testData");

    e.currentTarget.disabled = true;
    document.getElementById("btnNext").disabled = true;
    // document.getElementById("arrowNext").classList.add("disabled");
    e.currentTarget.innerHTML = "Running...";

    setTimeout(() => {
      utm.start(0.05, 1);
    }, 1200);

    let intr = setInterval(() => {
      if (currPos >= readingData.strain.length) {
        clearInterval(intr);
        document.getElementById("startTest1").disabled = true;
        document.getElementById("startTest1").innerHTML = "Done";
        document.getElementById("startTest2").disabled = false;
        utm.stop();
        // document.getElementById("btnNext").disabled = false;
        // document.getElementById("arrowNext").classList.remove("disabled");
        return;
      }

      tableBody.innerHTML += `
          <tr>
           
            <td>${parseFloat(readingData.strain[currPos]).toFixed(5)}</td>
            <td>${parseFloat(readingData.stress[currPos]).toFixed(5)}</td>
          </tr>
        `;
      currPos++;

      let progress2 = (readingData.stress.length / readingData.strain.length) * currPos;

      plotGraph(
        document.getElementById("outputGraphB").getContext("2d"),
        {
          labels: readingData.strain,
          datasets: [
            {
              data: readingData.stress.slice(0, progress2),
              borderColor: "#3e95cd",
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 2,
            },
          ],
        },
        "Strain",
        "Stress"
      );
      document.querySelector(".menu").scrollTo(0, document.querySelector(".menu").scrollHeight);
    }, 50);
  });

  document.getElementById("startTest2").addEventListener("click", (e) => {
    currPos = 0;

    let tableBody = document.getElementById("testData");
    tableBody.innerHTML = "";
    e.currentTarget.disabled = true;
    document.getElementById("btnNext").disabled = true;
    // document.getElementById("arrowNext").classList.add("disabled");
    e.currentTarget.innerHTML = "Running...";

    setTimeout(() => {
      utm.start(0.05, 1);
    }, 1200);

    let intr = setInterval(() => {
      if (currPos >= readingData.strain2.length) {
        clearInterval(intr);
        document.getElementById("startTest2").disabled = true;
        document.getElementById("startTest2").innerHTML = "Done";
        document.getElementById("startTest3").disabled = false;
        utm.stop();
        // document.getElementById("btnNext").disabled = false;
        // document.getElementById("arrowNext").classList.remove("disabled");
        return;
      }

      tableBody.innerHTML += `
          <tr>
           
            <td>${parseFloat(readingData.strain2[currPos]).toFixed(5)}</td>
            <td>${parseFloat(readingData.stress2[currPos]).toFixed(5)}</td>
          </tr>
        `;
      currPos++;

      let progress2 = (readingData.stress2.length / readingData.strain2.length) * currPos;

      plotGraph(
        document.getElementById("outputGraphB").getContext("2d"),
        {
          labels: readingData.strain2,
          datasets: [
            {
              data: readingData.stress2.slice(0, progress2),
              borderColor: "#3e95cd",
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 2,
            },
          ],
        },
        "Strain",
        "Stress"
      );
      document.querySelector(".menu").scrollTo(0, document.querySelector(".menu").scrollHeight);
    }, 50);
  });
  document.getElementById("startTest3").addEventListener("click", (e) => {
    currPos = 0;
    let tableBody = document.getElementById("testData");
    tableBody.innerHTML = "";
    e.currentTarget.disabled = true;
    document.getElementById("btnNext").disabled = true;
    // document.getElementById("arrowNext").classList.add("disabled");
    e.currentTarget.innerHTML = "Running...";

    setTimeout(() => {
      utm.start(0.05, 1);
    }, 1200);

    let intr = setInterval(() => {
      if (currPos >= readingData.strain3.length) {
        clearInterval(intr);
        document.getElementById("startTest3").disabled = true;
        document.getElementById("startTest3").innerHTML = "Done";
        document.getElementById("startTest4").disabled = false;
        utm.stop();
        // document.getElementById("btnNext").disabled = false;
        // document.getElementById("arrowNext").classList.remove("disabled");
        return;
      }

      tableBody.innerHTML += `
          <tr>
           
            <td>${parseFloat(readingData.strain3[currPos]).toFixed(5)}</td>
            <td>${parseFloat(readingData.stress3[currPos]).toFixed(5)}</td>
          </tr>
        `;
      currPos++;

      let progress2 = (readingData.stress3.length / readingData.strain3.length) * currPos;

      plotGraph(
        document.getElementById("outputGraphB").getContext("2d"),
        {
          labels: readingData.strain3,
          datasets: [
            {
              data: readingData.stress3.slice(0, progress2),
              borderColor: "#3e95cd",
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 2,
            },
          ],
        },
        "Strain",
        "Stress"
      );
      document.querySelector(".menu").scrollTo(0, document.querySelector(".menu").scrollHeight);
    }, 50);
  });

  document.getElementById("startTest4").addEventListener("click", (e) => {
    currPos = 0;
    let tableBody = document.getElementById("testData");
    tableBody.innerHTML = "";
    e.currentTarget.disabled = true;
    document.getElementById("btnNext").disabled = true;
    // document.getElementById("arrowNext").classList.add("disabled");
    e.currentTarget.innerHTML = "Running...";

    setTimeout(() => {
      utm.start(0.05, 1);
    }, 1200);

    let intr = setInterval(() => {
      if (currPos >= readingData.strain4.length) {
        clearInterval(intr);
        document.getElementById("startTest4").disabled = true;
        document.getElementById("startTest4").innerHTML = "Done";
        utm.stop();
        document.getElementById("btnNext").disabled = false;
        // document.getElementById("arrowNext").classList.remove("disabled");
        return;
      }

      tableBody.innerHTML += `
          <tr>
           
            <td>${parseFloat(readingData.strain4[currPos]).toFixed(5)}</td>
            <td>${parseFloat(readingData.stress4[currPos]).toFixed(5)}</td>
          </tr>
        `;
      currPos++;

      let progress2 = (readingData.stress4.length / readingData.strain4.length) * currPos;

      plotGraph(
        document.getElementById("outputGraphB").getContext("2d"),
        {
          labels: readingData.strain4,
          datasets: [
            {
              data: readingData.stress4.slice(0, progress2),
              borderColor: "#3e95cd",
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 2,
            },
          ],
        },
        "Strain",
        "Stress"
      );
      document.querySelector(".menu").scrollTo(0, document.querySelector(".menu").scrollHeight);
    }, 50);
  });
  pane.classList.add("done");
  pane.classList.remove("active");
  let next = document.getElementById("step5");
  next.classList.add("active");
  next.classList.remove("disabled");

  currentStepProgress = 5;
}
function handleStep5() {
  let pane = document.getElementById("step5");
  document.querySelector("#step6 .content").innerHTML = `
   <h3>Measurements:</h3>
  <table>
    <tr>
      <th>% reduction</th>
      <th>Young’s Modulus (GPa)</th>
      <th>Yield stress (YS)</th>
      <th>Ultimate tensile strength (UTS)</th>
      <th>% elongation at fracture</th>
    </tr>
    <tr>
      <td>0%</td>
      <td>16.5</td>
      <td>48</td>
      <td>74.6</td>
      <td>11.2</td>
    </tr>
    <tr>
      <td>20%</td>
      <td>20.7</td>
      <td>76</td>
      <td>97.5</td>
      <td>11.4</td>
    </tr>
    <tr>
      <td>40%</td>
      <td>24.9</td>
      <td>83</td>
      <td>109.3</td>
      <td>8.8</td>
    </tr>
    <tr>
      <td>60%</td>
      <td>25.8</td>
      <td>88</td>
      <td>123.7</td>
      <td>8</td>
    </tr>
  </table>
   <img src="images/result.png" alt="" height= "300px" width= "500px" >
    <h4>Young's Modulus is lower as extensometer was not used</h4>
`;
  pane.classList.add("done");
  pane.classList.remove("active");

  let next = document.getElementById("step6");
  next.classList.add("active");
  next.classList.remove("disabled");

  currentStepProgress = 6;
}
function handleStep6() {
  let pane = document.getElementById("step6");
  modal = new Modal({
    title: "Can you answer the questions?",
    body: [
      {
        page: 1,
        title: "Which of the following does not improve due to strain hardening?",
        options: ["Hardness", "Ultimate tensile strength", "Young’s modulus", "Yield strength"],
        correct: 2,
      },
      {
        page: 2,
        title:
          "An aluminum plate has been rolled from 40 mm to 10 mm (thickness). Assume that width remains the same. The % cold working (% CW) is:",
        options: ["150%", "75%", "37.5%", "30%"],
        correct: 1,
      },
      {
        page: 3,
        title:
          "Given different samples are cold rolled to x % deformation; Sample A: 20 %, Sample B: 30 %, Sample C: 40 %, Sample D: 50 %. Which of the following is correct?",
        options: [
          "% elongation of C > % elongation of D",
          "Yield Strength of C < Yield Strength of A",
          "Tensile Strength of A > Tensile Strength of D",
          "Elastic modulus of B < Elastic modulus of C",
        ],
        correct: 0,
      },
      {
        page: 4,
        title: "Which of the following statements is correct w.r.t. strain hardening?",
        options: [
          "It decreases the dislocation density",
          "It is predominantly based on the addition of alloying elements",
          "Hardening occurs predominantly due to plastic deformation",
          "It is predominantly related to dislocation-solute interaction",
        ],
        correct: 2,
      },
      {
        page: 5,
        title:
          "Consider an aluminum plate has been subjected to 60 % cold rolling. Rectangular Tensile specimens (thickness: 2 mm and width: 5 mm) were cut from the rolled plate and then subjected to tensile test. If the maximum load noted is 750 N, what would be the ultimate tensile strength?",
        options: ["750 MPa", "10 MPa", "150 MPa", "75 MPa"],
        correct: 3,
      },
      {
        page: 6,
        title:
          "Given different samples are cold rolled to x % deformation; Sample A: 20 %, Sample B: 30 %, Sample C: 40 %, Sample D: 50 %. Which of the following is correct?",
        options: [
          "% elongation of A < % elongation of B",
          "Yield Strength of C > Yield Strength of D",
          "Tensile Strength of D > Tensile Strength of A",
          "Elastic modulus of D > Elastic modulus of C",
        ],
        correct: 2,
      },
      {
        page: 7,
        title: "Which of the following statements is incorrect w.r.t. strain hardening?",
        options: [
          "It is related to the elastic deformation",
          "Dislocation multiplication",
          "Dislocations strain field interaction",
          "Motion of dislocation is hindered by the presence of other dislocations",
        ],
        correct: 0,
      },
      {
        page: 8,
        title: "Which of the following decreases due to strain hardening?",
        options: [
          "Yield strength",
          "Hardness",
          "Ductility (% elongation or strain to failure)",
          "Ultimate tensile strength",
        ],
        correct: 2,
      },
      {
        page: 9,
        title:
          "Consider an aluminum plate has been subjected to 20 % cold rolling. Rectangular Tensile specimens (thickness: 5 mm and width: 10 mm) were cut from the rolled plate and then subjected to tensile test. If the load at yield point is 1000 N, what would be the yield strength?",
        options: ["500 MPa", "20 MPa", "10 MPa", "50 MPa"],
        correct: 1,
      },
      {
        page: 10,
        title: "The temperature below which cold working of metal is carried out is called:",
        options: ["Room temperature", "Melting temperature", "Below room temperature", "Recrystallization temperature"],
        correct: 3,
      },
      {
        page: 11,
        title: "Which of the following cannot be used for work hardening?",
        options: ["Heating the specimen", "Cold rolling", "Hammering", "Cold forging"],
        correct: 0,
      },
    ],
    onClose: handleStep7,
  });
  modal.show();
  pane.classList.add("done");
  pane.classList.remove("active");

  let next = document.getElementById("step7");
  next.classList.add("active");
  next.classList.remove("disabled");

  // currentStepProgress = 6;
}

function handleStep7() {
  let pane = document.getElementById("step7");

  pane.classList.add("done");
  pane.classList.remove("active");
  document.getElementById("btnNext").disabled = true;
  document.getElementById("btnNext").innerText = "Done";
}

function plotGraph(graphCtx, data, labelX, labelY) {
  let chartObj = charts[graphCtx.canvas.id];
  if (chartObj) {
    chartObj.config.data.labels = data.labels;
    chartObj.config.data.datasets = data.datasets;
    chartObj.update();
  } else {
    charts[graphCtx.canvas.id] = new Chart(graphCtx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        animation: false,
        scaleOverride: true,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: labelX,
              },
              ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                  return parseFloat(value).toFixed(2);
                },
                max: 5,
              },
              stacked: true,
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: labelY,
              },
              ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                  return parseFloat(value).toFixed(0);
                },
              },
            },
          ],
        },
      },
    });
  }
}

function showGraph() {
  graphModal = new Modal({
    title: "Stree Strain Curve",
    body: [
      {
        page: 1,
        title: "Stress Strain Curve",
        image: "images/stress-strain-curve3.jpg",
      },
    ],
  });
  graphModal.show();
}
