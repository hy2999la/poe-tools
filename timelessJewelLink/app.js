const modifierPrefix = 'explicit.pseudo_timeless_jewel_';
const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra?q=';

const jewelDict = {
  brutalRestraint: {
    name: 'Brutal Restraint',
    min: 500,
    max: 8000,
    variants: ['Asenath', 'Balbala', 'Nasima'],
  },
  elegantHubris: {
    name: 'Elegant Hubris',
    min: 2000,
    max: 160000,
    variants: ['Cadiro', 'Caspiro', 'Victario'],
  },
  gloriousVanity: {
    name: 'Glorious Vanity',
    min: 100,
    max: 8000,
    variants: ['Ahuana', 'Doryani', 'Xibaqua'],
  },
  lethalPride: {
    name: 'Lethal Pride',
    min: 10000,
    max: 18000,
    variants: ['Akoya', 'Kaom', 'Rakiata'],
  },
  militantFaith: {
    name: 'Militant Faith',
    min: 2000,
    max: 10000,
    variants: ['Avarius', 'Dominus', 'Maxarius'],
  },
};

function onUpdateJewel() {
  // Update Variants
  const jewelName =
    document.getElementById('jewelName').value || Object.keys(jewelDict)[0];
  const jewel = jewelDict[jewelName];
  console.log('update jewel: ' + jewelName + ' with ' + jewel.variants);
  const variantSelect = document.getElementById('variantName');
  jewel.variants.forEach((variant) => {
    const option = document.createElement('option');
    option.value = variant.toLowerCase();
    option.textContent = variant;
    variantSelect.appendChild(option);
  });
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  variantSelect.appendChild(allOption);

  // Update Min-Max Text
  const minMaxText = document.createElement('p');
  minMaxText.textContent = `${jewel.min} - ${jewel.max}`;
  document.getElementById('minMaxText').firstChild.replaceWith(minMaxText);
}

function buildLink(jewelName, variantName, rollNumber) {
  let filters;
  if (variantName === 'all') {
    filters = jewelDict[jewelName].variants.map((variant) => ({
      id: modifierPrefix + variant.toLowerCase(),
      disabled: false,
      value: { min: rollNumber, max: rollNumber },
    }));
  } else {
    filters = [
      {
        id: modifierPrefix + variantName.toLowerCase(),
        disabled: false,
        value: { min: rollNumber, max: rollNumber },
      },
    ];
  }

  const stats = [
    {
      type: 'count',
      filters,
      value: { min: 1 },
    },
  ];

  const queryTemplate = {
    query: {
      status: { option: 'online' },
      name: jewelDict[jewelName].name,
      type: 'Timeless Jewel',
      stats,
    },
    sort: { price: 'asc' },
  };

  console.log(queryTemplate);

  return linkPrefix + JSON.stringify(queryTemplate);
}

function validateRoll(jewelName, rollNumber) {
  const jewel = jewelDict[jewelName];
  const validateNums =
    rollNumber.indexOf(',') >= 0 ? rollNumber.split(',') : [rollNumber];
  for (const num in validateNums) {
    if (!Number(num) || num < jewel.min || num > jewel.max) {
      return false;
    }
  }

  return true;
}

function generateLink() {
  const jewelName = document.getElementById('jewelName').value;
  const variantName = document.getElementById('variantName').value;
  const rollNumber = document.getElementById('jewelRoll').value;
  console.log(rollNumber);

  if (rollNumber) {
    if (validateRoll(jewelName, rollNumber)) {
      const linkText = buildLink(jewelName, variantName, rollNumber);
      console.log(linkText);
      const link = document.createElement('a');
      link.href = linkText;
      link.textContent = 'Link';
      document.getElementById('tradeLink').className = 'link';
      document.getElementById('tradeLink').firstChild.replaceWith(link);
    } else {
      const error = document.createElement('p');
      error.textContent = 'Invalid Roll Number';
      document.getElementById('tradeLink').className = 'error';
      document.getElementById('tradeLink').firstChild.replaceWith(error);
    }
  } else {
    const helpText = document.createElement('p');
    helpText.textContent = 'Select your jewel configurations';
    document.getElementById('tradeLink').className = 'help';
    document.getElementById('tradeLink').firstChild.replaceWith(helpText);
  }
}

(function () {
  const jewelSelect = document.getElementById('jewelName');
  Object.entries(jewelDict).forEach(([jewelId, jewelObj]) => {
    const jewel = document.createElement('option');
    jewel.value = jewelId;
    jewel.textContent = jewelObj.name;
    jewelSelect.appendChild(jewel);
  });
  onUpdateJewel();
})();
