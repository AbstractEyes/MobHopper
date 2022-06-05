load("next:extern/sounds.js")

var despawnRegions = new HashSet([
	"warzone"
])

autoload.rewatch("next:modules/pet/_.js")
exports.put("modules/pet", [
	{ // Money
		name: "Money",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicmoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "90s",
				timeActive: "30s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .65, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .01, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display raremoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "60s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .65,
				values: { multiplierMin: .25, multiplierMax: 0.75 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarymoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "150s",
				timeActive: "120s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .90,
				values: { multiplierMin: .5, multiplierMax: 1.0 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiormoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"  %color%• %colorAlt%GAIN THRESHOLD&r: &f%gainThreshold%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				gainThreshold: "5s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .65,
				values: { multiplierMin: .75, multiplierMax: 1.5 }
			},
			{
				id: "Spooky",
				idShort: "spooky",
				color: "&5&l",
				colorAlt: "&6&l",
				item: "display spookymoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"  %color%• %colorAlt%GAIN THRESHOLD&r: &f%gainThreshold%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				gainThreshold: "3s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .90,
				values: { multiplierMin: 1.00, multiplierMax: 2.0 }
			},
			{
				id: "Christmas",
				idShort: "christmas",
				color: "&2&l",
				colorAlt: "&c&l",
				item: "display christmasmoney",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"  %color%• %colorAlt%GAIN THRESHOLD&r: &f%gainThreshold%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				gainThreshold: "3s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: 1.5,
				values: { multiplierMin: 1.00, multiplierMax: 1.75 }
			}
		]
	},

	{ // Leprechaun
		name: "Leprechaun",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.trapTime = formatCtx.time(petData.trap || 0, true)
			retr.trapMax = formatCtx.time(petTier.values.trapMax, true)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicleprechaun",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the leprechaun pet is activated,",
						"     &f&oplayers nearby will be trapped inside a cauldron for &e&o%trapTime%&f&o.",
						"         &7&o(( Maximum of &f&o%trapMax%&7&o Trap Time Obtainable. ))",
						"",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						//"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))",
						"  &7&o(( ~ &c&oPet&7&o has been &4&otemporarily disabled&7&o due to a bug. ~ ))",
					]
				},
				cooldown: "120s",
				activates: true,
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .35, // "Controls the exp gained pet exp changed"
				values: { trapMin: 1, trapMax: 5 } // Time trap is active in seconds
				// 5 Second Active
				// 120 Second Cooldown
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareleprechaun",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the leprechaun pet is activated,",
						"     &f&oplayers nearby will be trapped inside a cauldron for &e&o%trapTime%&f&o.",
						"         &7&o(( Maximum of &f&o%trapMax%&7&o Trap Time Obtainable. ))",
						"",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						//"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))",
						"  &7&o(( ~ &c&oPet&7&o has been &4&otemporarily disabled&7&o due to a bug. ~ ))",
					]
				},
				cooldown: "90s",
				activates: true,
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { trapMin: 1, trapMax: 8 }
				// 10 Second Active
				// 90 Second Cooldown
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryleprechaun",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the leprechaun pet is activated,",
						"     &f&oplayers nearby will be trapped inside a cauldron for &e&o%trapTime%&f&o.",
						"         &7&o(( Maximum of &f&o%trapMax%&7&o Trap Time Obtainable. ))",
						"",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						//"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))",
						"  &7&o(( ~ &c&oPet&7&o has been &4&otemporarily disabled&7&o due to a bug. ~ ))",
					]
				},
				cooldown: "75s",
				activates: true,
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { trapMin: 1, trapMax: 10 }
				// 15 Second Active
				// 75 Second Cooldown
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorleprechaun",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the leprechaun pet is activated,",
						"     &f&oplayers nearby will be trapped inside a cauldron for &e&o%trapTime%&f&o.",
						"         &7&o(( Maximum of &f&o%trapMax%&7&o Trap Time Obtainable. ))",
						"",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						//"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))",
						"  &7&o(( ~ &c&oPet&7&o has been &4&otemporarily disabled&7&o due to a bug. ~ ))",
					]
				},
				cooldown: "65s",
				activates: true,
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { trapMin: 5, trapMax: 12 }
				// 20 Second Active
				// 65 Second Cooldown
			},
		]
	},

	{ // Chewbacca
		name: "Chewbacca",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(100 + (petData.buff || 0) * 100)
			retr.buffMax = formatCtx.commas(100 + petTier.values.buffMax * 100)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicchewbacca",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the chewbacca pet is activated,",
						"     &f&oyour axe will do +&c&o%buff%&f&o% more damage.",
						"         &7&o(( Maximum of +&f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "5s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .35, // "Controls the exp gained pet exp changed"
				values: { buffMin: .0125, buffMax: .0175 }
				// 5 Second Active
				// 120 Second Cooldown
				// 10% Damage Buff
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarechewbacca",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the chewbacca pet is activated,",
						"     &f&oyour axe will do +&c&o%buff%&f&o% more damage.",
						"         &7&o(( Maximum of +&f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "100s",
				timeActive: "10s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { buffMin: .0075, buffMax: .02 }
				// 10 Second Active
				// 100 Second Cooldown
				// 15% Damage Buff
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarychewbacca",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the chewbacca pet is activated,",
						"     &f&oyour axe will do +&c&o%buff%&f&o% more damage.",
						"         &7&o(( Maximum of +&f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "80s",
				timeActive: "15s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { buffMin: .02, buffMax: .05 }
				// 15 Second Active
				// 80 Second Cooldown
				// 25% Damage Buff
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorchewbacca",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the chewbacca pet is activated,",
						"     &f&oyour axe will do +&c&o%buff%&f&o% more damage.",
						"         &7&o(( Maximum of +&f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				cooldown: "60s",
				timeActive: "25s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { buffMin: .05, buffMax: .1 }
				// 25 Second Active
				// 60 Second Cooldown
				// 35% Damage Buff
			},
			{
				id: "Christmas",
				idShort: "christmas",
				color: "&2&l",
				colorAlt: "&c&l",
				item: "display christmaschewbacca",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the chewbacca pet is activated,",
						"     &f&oyour axe will do +&c&o%buff%&f&o% more damage.",
						"         &7&o(( Maximum of +&f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				cooldown: "60s",
				timeActive: "15s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { buffMin: .035, buffMax: .075 }
				// 25 Second Active
				// 60 Second Cooldown
				// 35% Damage Buff
			}
		]
	},

	{ // Cobblestone
		name: "Cobblestone",
		replacements: (retr, petData, petTier, formatCtx) => {
			var petValues = petTier.values
			retr.chance = formatCtx.commas((petData.chance || 0) * 100)
			retr.chanceMax = formatCtx.commas(petValues.chanceMax * 100)
			retr.hasteLvl = formatCtx.commas(petValues.hasteLvl || 0)
			retr.dropRate = formatCtx.commas(petValues.dropRate || 0)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basiccobblestone",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the cobblestone pet is held,",
						"     &f&oyou will gain &e&oHaste &6&o%hasteLvl%&f&o and a &a&o%chance%&f&o%",
						"     &f&ochance to gain &b&o%dropRate%&f&ox drops.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .35, // "Controls the exp gained pet exp changed"
				values: { chanceMin: .1, chanceMax: .2, dropRate: 2, hasteLvl: 2 }
				// 20% Drop Chance
				// 2 Drop Rate
				// Haste LVL 2
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarecobblestone",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the cobblestone pet is held,",
						"     &f&oyou will gain &e&oHaste &6&o%hasteLvl%&f&o and a &a&o%chance%&f&o%",
						"     &f&ochance to gain &b&o%dropRate%&f&ox drops.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .2, chanceMax: .35, dropRate: 2, hasteLvl: 3 }
				// 35% Drop Chance
				// 2 Drop Rate
				// Haste LVL 3
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarycobblestone",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the cobblestone pet is held,",
						"     &f&oyou will gain &e&oHaste &6&o%hasteLvl%&f&o and a &a&o%chance%&f&o%",
						"     &f&ochance to gain &b&o%dropRate%&f&ox drops.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .35, chanceMax: .5, dropRate: 2, hasteLvl: 3 }
				// 50% Drop Chance
				// 2 Drop Rate
				// Haste LVL 3
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorcobblestone",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the cobblestone pet is held,",
						"     &f&oyou will gain &e&oHaste &6&o%hasteLvl%&f&o and a &a&o%chance%&f&o%",
						"     &f&ochance to gain &b&o%dropRate%&f&ox drops.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .45, chanceMax: .55, dropRate: 3, hasteLvl: 4 }
				// 50% Drop Chance
				// 3 Drop Rate
				// Haste LVL 4
			}
		]
	},

	{ // Farm
		name: "Farm",
		replacements: (retr, petData, petTier, formatCtx, petManager) => {
			var petFarmManager = petTier.farmManager && petTier.farmManager()
			var petFarmNavigable = petFarmManager && petFarmManager.internal
			var petFarmDrop = petFarmNavigable && petFarmNavigable.ceilingEntry(petManager.petLevelGet(petData, petTier))
			petFarmDrop && (petFarmDrop = petFarmDrop.getValue())
			var petValues = petTier.values
			retr.drop = petFarmDrop && petFarmDrop.desc || "N/A"
			retr.dropRate = formatCtx.commas(petValues.dropRate || 0)
			retr.chance = formatCtx.commas((petData.chance || 0) * 100)
			retr.chanceMax = formatCtx.commas(petValues.chanceMax * 100)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicfarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "90s",
				timeActive: "30s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .35, // "Controls the exp gained pet exp changed"
				values: { chanceMin: .2, chanceMax: .4, drops: [
					[ 250, [ "mossyiron" ], "Mossy Iron Ingot" ], // Syntax: [ LVL (ex: 0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "mossygold" ], "Mossy Gold Ingot" ],
					[ 750, [ "mossydiamond" ], "Mossy Diamond" ],
					[ 1000, [ "mossyemerald" ], "Mossy Emerald" ]
				], dropRate: 2 }
				// 20%-40% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarefarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "60s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .4, chanceMax: .6, drops: [
					[ 250, [ "mossyiron" ], "Mossy Iron Ingot" ], // Syntax: [ LVL (ex: 0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "mossygold" ], "Mossy Gold Ingot" ],
					[ 750, [ "mossydiamond" ], "Mossy Diamond" ],
					[ 1000, [ "mossyemerald" ], "Mossy Emerald" ]
				], dropRate: 2 }
				// 40%-60% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryfarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "150s",
				timeActive: "120s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .6, chanceMax: .8, drops: [
					[ 250, [ "mossyiron" ], "Mossy Iron Ingot" ], // Syntax: [ LVL (ex: 0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "mossygold" ], "Mossy Gold Ingot" ],
					[ 750, [ "mossydiamond" ], "Mossy Diamond" ],
					[ 1000, [ "mossyemerald" ], "Mossy Emerald" ]
				], dropRate: 3 }
				// 60%-80% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorfarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .8, chanceMax: 1, drops: [
					[ 250, [ "mossyiron" ], "Mossy Iron Ingot" ], // Syntax: [ LVL (ex: e0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "mossygold" ], "Mossy Gold Ingot" ],
					[ 750, [ "mossydiamond" ], "Mossy Diamond" ],
					[ 1000, [ "mossyemerald" ], "Mossy Emerald" ]
				], dropRate: 4 }
				// 80%-100% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},
			/*{
				id: "Spooky",
				idShort: "spooky",
				color: "&5&l",
				colorAlt: "&6&l",
				item: "display spookyfarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .8, chanceMax: 1, drops: [
					[ 250, [ "candycorn" ], "Candy Corn" ], // Syntax: [ LVL (ex: 0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "bloodvial" ], "Blood Vial" ],
					[ 750, [ "candybasket" ], "Candy Basket" ],
					[ 1000, [ "bloodycandle" ], "Bloody Candle" ],
				], dropRate: 4 }
				// 80%-100% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},
			{
				id: "Christmas",
				idShort: "christmas",
				color: "&2&l",
				colorAlt: "&c&l",
				item: "display christmasfarm",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the farm pet is activated,",
						"     &f&ogain a &a&o%chance%&f&o% to drop certain items.",
						"         &7&o(( Maximum of &f&o%chanceMax%&7&o% Chance Obtainable. ))",
						"",
						"  %color%• %colorAlt%DROP&r: &f%drop%",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .35,
				values: { chanceMin: .8, chanceMax: 1, drops: [
					[ 250, [ "enchantedcharcoal" ], "Enchanted Charcoal" ], // Syntax: [ LVL (ex: 0 - 50), [ "LOOT", "LOOT-2" ], "Drop Desc" ]
					[ 500, [ "enchantedgold" ], "Enchanted Gold" ],
					[ 750, [ "enchantedemerald" ], "Enchanted Emerald" ],
					[ 1000, [ "enchantedemeraldblock" ], "Enchanted Emerald Block" ],
				], dropRate: 4 }
				// 80%-100% Drop Chance
				// Drops:
				// LVL 0-250 -->
				// LVL 251-500 -->
				// LVL 501-750 -->
				// LVL 751-1000 -->
			},*/
		]
	},

	{ // Experience
		name: "Experience",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the experience pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "2m",
				timeActive: "45s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .55, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: 1, multiplierMax: 1.5 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the experience pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "90s",
				timeActive: "60s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 1.5, multiplierMax: 2.0 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the holding this experience pet,",
						"     &f&oyou will gain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 2.0, multiplierMax: 2.5 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the holding this experience pet,",
						"     &f&oyou will gain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 2.5, multiplierMax: 3.0 }
			},
			{
				id: "Christmas",
				idShort: "christmas",
				color: "&2&l",
				colorAlt: "&c&l",
				item: "display christmasexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the holding this experience pet,",
						"     &f&oyou will gain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 2.25, multiplierMax: 3.5 }
			},
			/*{
				id: "Spooky",
				idShort: "spooky",
				color: "&5&l",
				colorAlt: "&6&l",
				item: "display spookyexperience",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the holding this experience pet,",
						"     &f&oyou will gain a &a&o%buff%&f&ox buff when earning experience.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .90,
				values: { multiplierMin: 1.00, multiplierMax: 2.0 }
			}*/
		]
	},

	{ // Lucky
		name: "Lucky",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basiclucky",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the lucky pet is activated,",
						"     &f&oyou will gain a +&a&o%buff%&f&o% chance to earn mobcoins.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "10m",
				timeActive: "45s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .55, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: 5, multiplierMax: 10 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarelucky",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the lucky pet is activated,",
						"     &f&oyou will gain a +&a&o%buff%&f&o% chance to earn mobcoins.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "7m",
				timeActive: "2m",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 10, multiplierMax: 15 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarylucky",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the lucky pet is held,",
						"     &f&oyou will gain a +&a&o%buff%&f&o% chance to earn mobcoins.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 15, multiplierMax: 20 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorlucky",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the lucky pet is held,",
						"     &f&oyou will gain a +&a&o%buff%&f&o% chance to earn mobcoins.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .55,
				values: { multiplierMin: 20, multiplierMax: 25 }
			}
		]
	},


	{ // Skill
		name: "Skill",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicskill",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the skill pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox skill experience buff.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "30s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .01, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareskill",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the skill pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox skill experience buff.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "60s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .25, multiplierMax: .75 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryskill",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the skill pet is held,",
						"     &f&oyou will gain a &a&o%buff%&f&ox skill experience buff.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .5, multiplierMax: 1.0 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorskill",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the skill pet is held,",
						"     &f&oyou will gain a &a&o%buff%&f&ox skill experience buff.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .75, multiplierMax: 1.25 }
			},
			{
				id: "Christmas",
				idShort: "christmas",
				color: "&2&l",
				colorAlt: "&c&l",
				item: "display superiorskill",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the skill pet is held,",
						"     &f&oyou will gain a &a&o%buff%&f&ox skill experience buff.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: 1.50, multiplierMax: 2.00 }
			},
		]
	},

	{ // Pirate
		name: "Pirate",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(100 + (petData.multiplier || 0) * 100)
			retr.buffMax = formatCtx.commas(100 + petTier.values.multiplierMax * 100)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicpirate",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the pirate pet is activated,",
						"     &f&ogain a +&a&o%buff%&f&o% chance to earn more rare items from mobs in The Glaciers.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "120s",
				timeActive: "60s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: 0 , multiplierMax: .05 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarepirate",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the pirate pet is activated,",
						"     &f&ogain a +&a&o%buff%&f&o% chance to earn more rare items from mobs in The Glaciers.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "150s",
				timeActive: "120s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .05, multiplierMax: .1 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarypirate",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the pirate pet is held,",
						"     &f&ogain a +&a&o%buff%&f&o% chance to earn more rare items from mobs in The Glaciers.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .1, multiplierMax: .15 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorpirate",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the pirate pet is held,",
						"     &f&ogain a +&a&o%buff%&f&o% chance to earn more rare items from mobs in The Glaciers.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&o% Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .15, multiplierMax: .25 }
			}
		]
	},

	/*{ // IronGolem
		name: "IronGolem",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "10m",
				timeActive: "45s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .1, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "7m",
				timeActive: "2m",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .2, multiplierMax: 1.5 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "5m30s",
				timeActive: "2m30s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .3, multiplierMax: 2 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .5, multiplierMax: 2.5 }
			}
		]
	},*/

	{ // Horse
		name: "Horse",
		replacements: (() => {
			var horsePercentFmt = colorize("&8%")
			var horseGrades = new TreeMap()
			horseGrades.put(10, { grade: "D", gradeColor: colorize("&c") })
			horseGrades.put(20, { grade: "D+", gradeColor: colorize("&c&l") })
			horseGrades.put(30, { grade: "C", gradeColor: colorize("&e") })
			horseGrades.put(40, { grade: "C+", gradeColor: colorize("&e&l") })
			horseGrades.put(50, { grade: "B", gradeColor: colorize("&6") })
			horseGrades.put(60, { grade: "B+", gradeColor: colorize("&6&l") })
			horseGrades.put(70, { grade: "A", gradeColor: colorize("&a") })
			horseGrades.put(80, { grade: "A+", gradeColor: colorize("&a&l") })
			horseGrades.put(90, { grade: "S", gradeColor: colorize("&2") })
			horseGrades.put(100, { grade: "S+", gradeColor: colorize("&2&l") })

			var horseStrengthToNotch = jumpStrength => {
				var toNotch = -0.1817584952 * Math.pow(jumpStrength, 3) + 3.689713992 * Math.pow(jumpStrength, 2) + 2.128599134 * jumpStrength - 0.343930367
				return Math.floor(Math.max(toNotch, 0) * 100) / 100
			}
			var horseSpeedToNotch = speedStrength => {
				var toNotch = speedStrength * 42.157787584
				return Math.floor(Math.max(toNotch, 0) * 100) / 100
			}
			return (retr, petData, petTier, formatCtx) => {
				var petAttributes = petTier.values.attributes
				if (!petAttributes) return

				var speedAttr = petAttributes.speed
				if (speedAttr) {
					var petSpeed = petData.speed || 0
					var petSpeedPercent = Math.min(Math.max((petSpeed - speedAttr.min) * 100 / (speedAttr.max - speedAttr.min), 0), 100)
					var petSpeedGrade = horseGrades.ceilingEntry(Integer.valueOf(petSpeedPercent)).getValue()
					retr.speed = formatCtx.commas(horseSpeedToNotch(petSpeed))
					retr.speedGrade = petSpeedGrade.gradeColor + petSpeedGrade.grade
					retr.speedPercent = formatCtx.commas(100 + Math.floor(petSpeedPercent * 100) / 100) + horsePercentFmt
				}
				var jumpAttr = petAttributes.jump
				if (jumpAttr) {
					var petJump = petData.jump || 0
					var petJumpPercent = Math.min(Math.max((petJump - jumpAttr.min) * 100 / (jumpAttr.max - jumpAttr.min), 0), 100)
					var petJumpGrade = horseGrades.ceilingEntry(Integer.valueOf(petJumpPercent)).getValue()
					retr.jumpGrade = petJumpGrade.gradeColor + petJumpGrade.grade
					retr.jumpNotch = formatCtx.commas(horseStrengthToNotch(petJump))
				}
				var healthAttr = petAttributes.health
				if (healthAttr) {
					var petHealth = petData.health || 0
					var petHealthPercent = Math.min(Math.max((petHealth - healthAttr.min) * 100 / (healthAttr.max - healthAttr.min), 0), 100)
					var petHealthGrade = horseGrades.ceilingEntry(Integer.valueOf(petHealthPercent)).getValue()
					retr.healthGrade = petHealthGrade.gradeColor + petHealthGrade.grade
					retr.health = formatCtx.commas(Math.floor(petHealth / 2))
				}
			}
		})(),
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basichorse",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oSpawn your trusty little steed,",
						"     &f&oand ride around the world fast like the wind.",
						"",
						"  %color%• %colorAlt%SPEED&r: &f%speedGrade% &8(+&7%speedPercent% &8[&7%speed%&8 b/ps])",
						"  %color%• %colorAlt%JUMP HEIGHT&r: &f%jumpGrade% &8(+&7%jumpNotch%&8 blocks)",
						"  %color%• %colorAlt%HEALTH&r: &f%healthGrade% &8(+&7%health%&c&l ❤&8)",
						"",
						"  &7&o(( ~ &b&oClick to summon&7&o your horse. ~ ))"
					]
				},
				levelMax: 50,
				expToLevel: { min: 0, max: 0 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: 0, // "Controls the exp gained pet exp changed"
				cooldown: "3s",
				activates: true,
				values: {
					allowSpawn: location => location.getWorld().getName().startsWith("world"),
					despawnRegions: despawnRegions,
					variant: Horse.Variant.HORSE,
					color: Horse.Color.CREAMY, // "Leave blank for random"
					style: Horse.Style.WHITEFIELD, // "Leave blank for random"
					attributes: {
						speed: { min: .05, max: .2 },
						health: { min: 2, max: 20 },
						jump: { min: .4, max: .7 },
					},
					/*upgrades: [
						{}, // TODO
					]*/
				}
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarehorse",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oSpawn your trusty little steed,",
						"     &f&oand ride around the world fast like the wind.",
						"",
						"  %color%• %colorAlt%SPEED&r: &f%speedGrade% &8(+&7%speedPercent% &8[&7%speed%&8 b/ps])",
						"  %color%• %colorAlt%JUMP HEIGHT&r: &f%jumpGrade% &8(+&7%jumpNotch%&8 blocks)",
						"  %color%• %colorAlt%HEALTH&r: &f%healthGrade% &8(+&7%health%&c&l ❤&8)",
						"",
						"  &7&o(( ~ &b&oClick to summon&7&o your horse. ~ ))"
					]
				},
				levelMax: 50,
				expToLevel: { min: 0, max: 0 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: 0, // "Controls the exp gained pet exp changed"
				cooldown: "3s",
				activates: true,
				values: {
					allowSpawn: location => location.getWorld().getName().startsWith("world"),
					despawnRegions: despawnRegions,
					variant: Horse.Variant.HORSE,
					color: Horse.Color.WHITE, // "Leave blank for random"
					style: Horse.Style.NONE, // "Leave blank for random"
					attributes: {
						speed: { min: .15, max: .25 },
						health: { min: 20, max: 40 },
						jump: { min: .7, max: .825 },
					},
					/*upgrades: [
						{}, // TODO
					]*/
				}
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryhorse",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oSpawn your trusty little steed,",
						"     &f&oand ride around the world fast like the wind.",
						"",
						"  %color%• %colorAlt%SPEED&r: &f%speedGrade% &8(+&7%speedPercent% &8[&7%speed%&8 b/ps])",
						"  %color%• %colorAlt%JUMP HEIGHT&r: &f%jumpGrade% &8(+&7%jumpNotch%&8 blocks)",
						"  %color%• %colorAlt%HEALTH&r: &f%healthGrade% &8(+&7%health%&c&l ❤&8)",
						"",
						"  &7&o(( ~ &b&oClick to summon&7&o your horse. ~ ))"
					]
				},
				levelMax: 50,
				expToLevel: { min: 0, max: 0 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: 0, // "Controls the exp gained pet exp changed"
				cooldown: "3s",
				activates: true,
				values: {
					allowSpawn: location => location.getWorld().getName().startsWith("world"),
					despawnRegions: despawnRegions,
					variant: Horse.Variant.UNDEAD_HORSE,
					attributes: {
						speed: { min: .25, max: .40 },
						health: { min: 40, max: 60 },
						jump: { min: .825, max: .89 },
					},
				}
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorhorse",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oSpawn your trusty little steed,",
						"     &f&oand ride around the world fast like the wind.",
						"",
						"  %color%• %colorAlt%SPEED&r: &f%speedGrade% &8(+&7%speedPercent% &8[&7%speed%&8 b/ps])",
						"  %color%• %colorAlt%JUMP HEIGHT&r: &f%jumpGrade% &8(+&7%jumpNotch%&8 blocks)",
						"  %color%• %colorAlt%HEALTH&r: &f%healthGrade% &8(+&7%health%&c&l ❤&8)",
						"",
						"  &7&o(( ~ &b&oClick to summon&7&o your horse. ~ ))"
					]
				},
				levelMax: 50,
				expToLevel: { min: 0, max: 0 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: 0, // "Controls the exp gained pet exp changed"
				cooldown: "3s",
				activates: true,
				values: {
					allowSpawn: location => location.getWorld().getName().startsWith("world"),
					despawnRegions: despawnRegions,
					variant: Horse.Variant.SKELETON_HORSE,
					attributes: {
						speed: { min: .45, max: .65 },
						health: { min: 60, max: 80 },
						jump: { min: .89, max: 1 },
					},
				}
			}
		]
	},

	/*{ // Popcorn
		name: "Popcorn",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicpopcorn",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "10m",
				timeActive: "45s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .1, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarepopcorn",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "7m",
				timeActive: "2m",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .2, multiplierMax: 1.5 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarypopcorn",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%",
						"",
						"  &7&o(( ~ &b&oClick to use&7&o this pet. ~ ))"
					]
				},
				cooldown: "5m30s",
				timeActive: "2m30s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .3, multiplierMax: 2 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorpopcorn",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet",
						"",
						"  %color%• %colorAlt%ABILITY&r: &f&oWhile the money pet is activated,",
						"     &f&ogain a &a&o%buff%&f&ox sell buff when selling.",
						"         &7&o(( Maximum of &f&o%buffMax%&7&ox Buff Obtainable. ))",
						"",
						"  %color%• %colorAlt%ACTIVATION TIME&r: &f%timeActive%",
						"  %color%• %colorAlt%COOLDOWN&r: &f%cooldown%",
						"",
						"  %colorAlt%• %color%LEVEL&r: &f&l%level%",
						"  %colorAlt%• %color%EXP&r: %colorAlt%%expSymbol%&a%exp% &r&l⁄ &c%expMax%",
						"    %expBar%"
					]
				},
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .5, multiplierMax: 2.5 }
			}
		]
	},*/

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{ // Irongolem
		name: "Irongolem",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .01, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .25, multiplierMax: .75 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .5, multiplierMax: 1.0 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorirongolem",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .75, multiplierMax: 1.25 }
			}
		]
	},

	{ // Wizard
		name: "Wizard",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicwizard",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: { multiplierMin: .01, multiplierMax: .50 }
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rarewizard",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .25, multiplierMax: .75 }
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendarywizard",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .5, multiplierMax: 1.0 }
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorwizard",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: { multiplierMin: .75, multiplierMax: 1.25 }
			}
		]
	},

	{ // Ghost
		name: "Ghost",
		replacements: (retr, petData, petTier, formatCtx) => {
			retr.buff = formatCtx.commas(petData.multiplier || 0)
			retr.buffMax = formatCtx.commas(petTier.values.multiplierMax)
		},
		tiers: [
			{
				id: "Basic",
				idShort: "b",
				color: "&3&l",
				colorAlt: "&b&l",
				item: "display basicghost",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "5s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 }, // "Min = lvl 1 | Max = levelMax or default (10,000)"
				expRatio: .15, // "Controls the exp gained pet exp changed"
				values: {
					invisibilityLevel: 2, // The level of the invisiblity potion effect. (2 = data-wise 1)
					multiplierMin: .01, // Base multiplier for added time (.01 = +1% (12 seconds stays 12 seconds))
					multiplierMax: .50  // Maximum multiplier for added time (.50 = +50% (12 seconds become 18 seconds))
				}
			},
			{
				id: "Rare",
				idShort: "r",
				color: "&2&l",
				colorAlt: "&a&l",
				item: "display rareghost",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "5s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: {
					invisibilityLevel: 2, // The level of the invisiblity potion effect. (2 = data-wise 1)
					multiplierMin: .01, // Base multiplier for added time (.01 = +1% (12 seconds stays 12 seconds))
					multiplierMax: .50  // Maximum multiplier for added time (.50 = +50% (12 seconds become 18 seconds))
				}
			},
			{
				id: "Legendary",
				idShort: "l",
				color: "&6&l",
				colorAlt: "&e&l",
				item: "display legendaryghost",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "5s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: {
					invisibilityLevel: 2, // The level of the invisiblity potion effect. (2 = data-wise 1)
					multiplierMin: .01, // Base multiplier for added time (.01 = +1% (12 seconds stays 12 seconds))
					multiplierMax: .50  // Maximum multiplier for added time (.50 = +50% (12 seconds become 18 seconds))
				}
			},
			{
				id: "Superior",
				idShort: "s",
				color: "&4&l",
				colorAlt: "&c&l",
				item: "display superiorghost",
				description: {
					name: "%color%%petNameUpper% %colorAlt%PET &7&o(( &7LVL &a&o%levelNow% &r&l⁄ &e&o%levelMax%&7&o ))",
					lore: [
						"&8%tierName% Pet"
					]
				},
				cooldown: "5s",
				timeActive: "2s",
				levelMax: 1000,
				expToLevel: { min: 500, max: 1000000 },
				expRatio: .15,
				values: {
					invisibilityLevel: 2, // The level of the invisiblity potion effect. (2 = data-wise 1)
					multiplierMin: .01, // Base multiplier for added time (.01 = +1% (12 seconds stays 12 seconds))
					multiplierMax: .50  // Maximum multiplier for added time (.50 = +50% (12 seconds become 18 seconds))
				}
			}
		]
	},



])
exports.put("modules/pet/sounds", {
	levelAdvance: sounds.of("SHEEP_SHEAR"),
	experienceGain: sounds.of("NOTE_SNARE_DRUM", true),
	feedbackSuccess: sounds.of("SLIME_WALK2;.5", true),
	feedbackFailed: sounds.of("SILVERFISH_IDLE;.5", true),
	feedbackMenu: sounds.of("CHEST_OPEN", true),
	paginationNext: sounds.of("ENDERMAN_TELEPORT;1;1.75", true),
	paginationPrevious: sounds.of("ENDERMAN_TELEPORT;1;.25", true)
})