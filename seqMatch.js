function seqAlign(seq1, seq2, match = 0, mismatch = 1, gap = 1) {
	const m = seq1.length;
	const n = seq2.length;

	// initialize dp and traceback array
	const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
	const traceback = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

	for (let i = 0; i <= m; i++) {
		dp[i][0] = i * gap;
		traceback[i][0] = 1; // Up
	}
	for (let j = 0; j <= n; j++) {
		dp[0][j] = j * gap;
		traceback[0][j] = 2; // Left
	}
	traceback[0][0] = 0;

	// fill table
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const score = seq1[i - 1] === seq2[j - 1] ? match : mismatch;

			const choices = [
				[dp[i - 1][j - 1] + score, 0], // Diagonal (match/mismatch)
				[dp[i - 1][j] + gap, 1], // Up (deletion)
				[dp[i][j - 1] + gap, 2], // Left (insertion)
			];

			// Choose minimum score
			let minScore = choices[0][0];
			let direction = choices[0][1];
			for (let k = 1; k < choices.length; k++) {
				if (choices[k][0] < minScore) {
					minScore = choices[k][0];
					direction = choices[k][1];
				}
			}
			dp[i][j] = minScore;
			traceback[i][j] = direction;
		}
	}

	// backtrack to get the alignment
	let align1 = "";
	let align2 = "";
	let operations = "";
	let detailedOps = "";
	let matchesCount = 0;
	let totalOps = 0;

	let i = m;
	let j = n;

	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && traceback[i][j] === 0) {
			// Diagonal move: match or substitution
			align1 = seq1[i - 1] + align1;
			align2 = seq2[j - 1] + align2;
			if (seq1[i - 1] === seq2[j - 1]) {
				operations = "M" + operations;
				detailedOps = "Match " + seq1[i - 1] + " " + detailedOps;
				matchesCount++;
			} else {
				operations = "S" + operations;
				detailedOps =
					"Substitute " +
					seq1[i - 1] +
					" -> " +
					seq2[j - 1] +
					" " +
					detailedOps;
			}
			i--;
			j--;
		} else if (i > 0 && traceback[i][j] === 1) {
			// Up move: deletion
			align1 = seq1[i - 1] + align1;
			align2 = "-" + align2;
			operations = "D" + operations;
			detailedOps = "Delete " + seq1[i - 1] + " " + detailedOps;
			i--;
		} else {
			// Left move: insertion
			align1 = "-" + align1;
			align2 = seq2[j - 1] + align2;
			operations = "I" + operations;
			detailedOps = "Insert " + seq2[j - 1] + " " + detailedOps;
			j--;
		}
		totalOps++;
	}

	const percentMatch = totalOps > 0 ? (matchesCount / totalOps) * 100 : 100;
	return [dp[m][n], align1, align2, operations, detailedOps, percentMatch];
}

function bestMatch(query, database) {
	let bestScore = Infinity;
	let bestAlignment = null;
	let bestSeq = null;
	let bestOperations = null;
	let bestDetailedOps = null;
	let bestPercentMatch = 0;

	for (const seq of database) {
		const [score, align1, align2, operations, detailedOps, percentMatch] =
			seqAlign(query, seq);
		if (score < bestScore) {
			bestScore = score;
			bestAlignment = [align1, align2];
			bestSeq = seq;
			bestOperations = operations;
			bestDetailedOps = detailedOps;
			bestPercentMatch = percentMatch;
      if(bestScore == 0)
      {
        break
      }
		}
	}

	return [
		bestSeq,
		bestScore,
		bestAlignment,
		bestOperations,
		bestDetailedOps,
		bestPercentMatch,
	];
}

function exampleUsage() {
	const database = ["password123", "hahahaha", "lolXD", "123456"];
	const password = "password";

	const [
		bestSeq,
		bestScore,
		bestAlignment,
		bestOperations,
		bestDetailedOps,
		bestPercentMatch,
	] = bestMatch(password, database);

	// Print results
	console.log(`Best match: ${bestSeq}`);
	console.log(`Score: ${bestScore}`);
	console.log(`Percent Match: ${bestPercentMatch.toFixed(2)}%`);
	console.log(`Alignment:\n${bestAlignment[0]}\n${bestAlignment[1]}`);
	console.log(`Operations: ${bestOperations}`);
	console.log(`Detailed Steps: ${bestDetailedOps}`);
}

function actualUsage(password, numPassInDatabase) {
	// Split the file into lines and take the first numPassInDatabase
  if (!password)
  {
    return 0;
  }
	const database = [
    "123456",
"123456789",
"qwerty",
"password",
"111111",
"12345678",
"abc123",
"1234567",
"password1",
"12345",
"1234567890",
"123123",
"000000",
"iloveyou",
"1234",
"1q2w3e4r5t",
"qwertyuiop",
"123",
"monkey",
"dragon",
"123456a",
"654321",
"123321",
"666666",
"1qaz2wsx",
"myspace1",
"121212",
"homelesspa",
"123qwe",
"a123456",
"123abc",
"1q2w3e4r",
"qwe123",
"7777777",
"qwerty123",
"target123",
"tinkle",
"987654321",
"qwerty1",
"222222",
"zxcvbnm",
"1g2w3e4r",
"gwerty",
"zag12wsx",
"gwerty123",
"555555",
"fuckyou",
"112233",
"asdfghjkl",
"1q2w3e",
"123123123",
"qazwsx",
"computer",
"princess",
"12345a",
"ashley",
"159753",
"michael",
"football",
"sunshine",
"1234qwer",
"iloveyou1",
"aaaaaa",
"fuckyou1",
"789456123",
"daniel",
"777777",
"princess1",
"123654",
"11111",
"asdfgh",
"999999",
"11111111",
"passer2009",
"888888",
"love",
"abcd1234",
"shadow",
"football1",
"love123",
"superman",
"jordan23",
"jessica",
"monkey1",
"12qwaszx",
"a12345",
"baseball",
"123456789a",
"killer",
"asdf",
"samsung",
"master",
"azerty",
"charlie",
"asd123",
"soccer",
"FQRG7CS493",
"88888888",
"jordan",
"michael1",
"jesus1",
"linkedin",
"babygirl1",
"789456",
"blink182",
"thomas",
"qwer1234",
"333333",
"liverpool",
"michelle",
"nicole",
"qwert",
"j38ifUbn",
"131313",
"asdasd",
"0",
"987654",
"lovely",
"q1w2e3r4",
"0123456789",
"gfhjkm",
"andrew",
"hello1",
"joshua",
"Status",
"justin",
"anthony",
"angel1",
"iloveyou2",
"1111111",
"zxcvbn",
"hello",
"1111",
"jennifer",
"hunter",
"naruto",
"bitch1",
"welcome",
"159357",
"101010",
"tigger",
"147258369",
"babygirl",
"jessica1",
"parola",
"5201314",
"robert",
"fuckyou2",
"696969",
"102030",
"0987654321",
"loveme",
"123456q",
"apple",
"pokemon",
"mother",
"money1",
"secret",
"anthony1",
"purple",
"q1w2e3r4t5y6",
"baseball1",
"qazwsxedc",
"1111111111",
"abc",
"buster",
"matthew",
"andrea",
"soccer1",
"basketball",
"hannah",
"freedom",
"golfer",
"chelsea",
"passw0rd",
"george",
"trustno1",
"friends",
"william",
"iloveu",
"amanda",
"number1",
"chocolate",
"qwerty12",
"summer",
"flower",
"charlie1",
"maggie",
"pakistan",
"samantha",
"asdf1234",
"letmein",
"asshole1",
"superman1",
"marina",
"147258",
"batman",
"fuk19600",
"butterfly",
"010203",
"qweqwe",
"29rsavoy",
"forever",
"1",
"mustang",
"sunshine1",
"ashley1",
"internet",
"london",
"666",
"harley",
"alexander",
"xbox360",
"00000000",
"12341234",
"q1w2e3",
"pepper",
"family",
"loveyou",
"50cent",
"joseph",
"whatever",
"!",
"jasmine",
"orange",
"user",
"junior",
"cookie",
"martin",
"qweasdzxc",
"212121",
"1qazxsw2",
"password12",
"google",
"password2",
"111222",
"lol123",
"hello123",
"jordan1",
"shadow1",
"patrick",
"3rJs1la7qE",
"ginger",
"nicole1",
"mylove",
"arsenal",
"12344321",
"abcdef",
"love12",
"232323",
"VQsaBLPzLa",
"taylor",
"myspace",
"brandon",
"angel",
"12345q",
"brandon1",
"chris1",
"diamond",
"snoopy",
"asshole",
"qweasd",
"starwars",
"matrix",
"mickey",
"school",
"jonathan",
"melissa",
"eminem",
"1234561",
"cjmasterinf",
"lovers",
"1234567891",
"nikita",
"richard",
"1342",
"yellow",
"12345qwert",
"oliver",
"q1w2e3r4t5",
"cheese",
"a123456789",
"christian",
"290966",
"wall.e",
"12345678910",
"12413",
"sophie",
"tudelft",
"DIOSESFIEL",
"dpbk1234",
"PE#5GZ29PTZMSE",
"bailey",
"U38fa39",
"mercedes",
"victoria",
"147852",
"asdasd5",
"matthew1",
"abcdefg",
"peanut",
"456789",
"red123",
"happy1",
"sandra",
"benjamin",
"dragon1",
"444444",
"123654789",
"$HEX",
"elizabeth",
"prince",
"amanda1",
"angels",
"angela",
"qqqqqq",
"samuel",
"banana",
"barcelona",
"ghbdtn",
"computer1",
"michelle1",
"william1",
"hockey",
"monster",
"carlos",
"justin1",
"antonio",
"qwertyu",
"nathan",
"55555",
"123789",
"0000",
"killer1",
"11223344",
"chicken",
"lucky1",
"gabriel",
"welcome1",
"zaq12wsx",
"jasmine1",
"silver",
"hunter1",
"bubbles",
"hottie1",
"purple1",
"andrew1",
"daniel1",
"liverpool1",
"1qaz2wsx3edc",
"rainbow",
"morgan",
"natasha",
"fuckoff",
"jackson",
"austin",
"vanessa",
"mommy1",
"madison",
"adidas",
"xxxxxx",
"252525",
"america",
"james1",
"metallica",
"slipknot",
"chicken1",
"87654321",
"jesus",
"NULL",
"0000000000",
"alexis",
"!ab#cd$",
"spiderman",
"steven",
"ferrari",
"lauren",
"456123",
"robert1",
"147852369",
"qwaszx",
"buddy1",
"butterfly1",
"!~!1",
"tinkerbell",
"bandit",
"danielle",
"0123456",
"nicholas",
"hannah1",
"qwerty12345",
"1234554321",
"asdfasdf",
"pokemon1",
"nirvana",
"destiny",
"scooter",
"cookie1",
"123qweasd",
"loveme1",
"chelsea1",
"chocolate1",
"1234567a",
"juventus",
"rachel",
"111222tianya",
"qazxsw",
"zzzzzz",
"monica",
"stella",
"america1",
"999999999",
"jennifer1",
"freedom1",
"taylor1",
"741852963",
"yamaha",
"victor",
"00000",
"qwertyui",
"a1b2c3",
"ronaldo",
"1password",
"smokey",
"david1",
"money",
"daddy1",
"cocacola",
"a838hfiD",
"1234abcd",
"joshua1",
"123asd",
"buster1",
"myspace123",
"booboo",
"madison1",
"samantha1",
"heather",
"7654321",
"elizabeth1",
"poop",
"tigger1",
"family1",
"mustang1",
"142536",
"november",
"jasper",
"lovely1",
"diamond1",
"success",
"edward",
"music1",
"valentina",
"harley1",
"sweety",
"tennis",
"zxc123",
"friend",
"qaz123",
"whatever1",
"thomas1",
"nothing",
"N0=Acc3ss",
"super123",
"casper",
"Password",
"chester",
"Exigent",
"password123",
"cheese1",
"spongebob1",
"mynoob",
"hahaha",
"hellokitty",
"098765",
"alexandra",
"canada",
"david",
"1q2w3e4r5t6y",
"dennis",
"december",
"olivia",
"a1b2c3d4",
"playboy",
"sabrina",
"patricia",
"summer1",
"friends1",
"mexico1",
"dakota",
"barbie",
"loulou",
"johnny",
"music",
"123456m",
"Password1",
"lover1",
"maggie1",
"pretty",
"123hfjdk147",
"nicolas",
"qwert1",
"charles",
"phoenix",
"rebecca",
"thunder",
"sexy123",
"iloveu2",
"123456789q",
"batman1",
"beautiful",
"carolina",
"4815162342",
"vincent",
"jeremy",
"spider",
"master1",
"heather1",
"weed420",
"Sojdlg123aljg",
"pepper1",
"sebastian",
"yankees",
"dallas",
"pussy1",
"cameron",
"caroline",
"peanut1",
"guitar",
"startfinding",
"midnight",
"i",
"iw14Fi9j",
"yankees1",
"elephant",
"124578",
"scorpion",
"sexy",
"tweety",
"bubbles1",
"fuckoff1",
"cowboys1",
"fuckme",
"fucker",
"louise",
"dolphin",
"852456",
"patrick1",
"loser1",
"mother1",
"lalala",
"naruto1",
"veronica",
"melissa1",
"sparky",
"newyork",
"adrian",
"123456s",
"september",
"heaven",
"alexander1",
"jessie",
"crystal",
"tigers",
"k.:",
"p",
"iloveyou!",
"chris",
"gemini",
"raiders1",
"135790",
"zxcvbnm1",
"peaches",
"merlin",
"12121212",
"spongebob",
"scooby",
"stephanie",
"shannon",
"james",
"246810",
"1a2b3c",
"555666",
"sergey",
"lovelove",
"202020",
"159951",
"precious",
"123456j",
"lakers",
"manchester",
"ginger1",
"134679",
"cristina",
"apples",
"a1234567",
"qqww1122",
"pussy",
"daniela",
"jackson1",
"123456b",
"jackie",
"rocky1",
"asdfghjkl1",
"sakura",
"qazwsx123",
"yellow1",
"flower1",
"apple1",
"010101",
"newyork1",
"sammy1",
"alex",
"muffin",
"cherry",
"poohbear",
"richard1",
"nigger1",
"test123",
"destiny1",
"flowers",
"slipknot1",
"cooper",
"753951",
"monster1",
"paSSword",
"baby123",
"mexico",
"blessed1",
"toyota",
"spiderman1",
"beauty",
"fuck",
"emmanuel",
"genius",
"winston",
"tiffany",
"charlotte",
"741852",
"iloveu1",
"diablo",
"onelove",
"tiger1",
"badboy",
"maverick",
"joseph1",
"winner",
"mickey1",
"creative",
"beautiful1",
"softball",
"hotmail",
"421uiopy258",
"brittany",
"1314520",
"aa123456",
"asdf123",
"lastfm",
"manuel",
"sayang",
"kristina",
"austin1",
"stupid1",
"hottie",
"booboo1",
"murphy",
"stalker",
"carmen",
"doudou",
"qazqaz",
"scorpio",
"m123456",
"pimpin1",
"pass",
"badoo",
"garfield",
"0000000",
"fuckme1",
"scooter1",
"151515",
"aaaaa",
"brandy",
"kitty1",
"myspace2",
"steelers",
"compaq",
"claudia",
"123456d",
"rabbit",
"bailey1",
"crazy1",
"august",
"isabella",
"orange1",
"october",
"q123456",
"green1",
"black1",
"samson",
"aaaa",
"angelo",
"1a2b3c4d",
"9876543210",
"boomer",
"junior1",
"12345678a",
"shorty1",
"tyler1",
"456456",
"kimberly",
"guitar1",
"cowboys",
"shorty",
"passion",
"soleil",
"christ",
"1v7Upjw3nT",
"111",
"albert",
"andrey",
"ranger",
"dexter",
"lucky7",
"popcorn",
"babyboy1",
"bitch",
"alyssa",
"brittany1",
"123456abc",
"forever1",
"fucker1",
"barney",
"1122334455",
"blessed",
"metallica1",
"1029384756",
"karina",
"krishna",
"cameron1",
"california",
"christian1",
"melanie",
"j123456",
"password!",
"happy",
"963852741",
"woaini",
"danielle1",
"samsung1",
"gangsta1",
"icecream",
"letmein1",
"qwerty123456",
"eagles",
"love13",
"qwert123",
"uQA9Ebw445",
"fucku2",
"smokey1",
"leonardo",
"asdfgh1",
"police",
"christine",
"windows",
"bismillah",
"miguel",
"iloveyou12",
":",
"snickers",
"arsenal1",
"7758521",
"bubba1",
"cowboy",
"denise",
"pretty1",
"george1",
"q12345",
"winter",
"dancer",
"coffee",
"player1",
"fernando",
"maxwell",
"swordfish",
"rangers",
"horses",
"francis",
"951753",
"martina",
"fylhtq",
"chivas1",
"secret1",
"s123456",
"marlboro",
"qwerty1234",
"kitten",
"lauren1",
"twilight",
"florida",
"141414",
"pass123",
"YAgjecc826",
"jason1",
"54321",
"nathan1",
"sydney",
"pumpkin",
"molly1",
"dolphin1",
"vfhbyf",
"natalie",
"hiphop",
"skater1",
"fishing",
"bond007",
"kobe24",
"barbara",
"loveyou1",
"tiffany1",
"john316",
"cassie",
"iloveme",
"hardcore",
"stupid",
"fatima",
"alexis1",
"rockstar",
"abc1234",
"123456z",
"playboy1",
"321321",
"123123a",
"greenday",
"baby",
"maria",
"angelina",
"starwars1",
"google1",
"b123456",
"school1",
"bonnie",
"123qwe123",
"SZ9kQcCTwY",
"lucky",
"father",
"courtney",
"sexy12",
"007007",
"crystal1",
"abc123456",
"fluffy",
"kissme",
"marseille",
"trinity",
"sweet1",
"candy1",
"qwerty7",
"password3",
"alejandro",
"a",
"pookie",
"roberto",
"sarah1",
"player",
"justinbieb",
"turtle",
"poohbear1",
"simone",
"corvette",
"jackass1",
"lolita",
"jonathan1",
"steven1",
"alicia",
"lollipop",
"jackass",
"123456c",
"786786",
"biteme",
"honey",
"motorola",
"nicholas1",
"friendster",
"angel123",
"portugal",
"iloveme1",
"simple",
"012345",
"vfrcbv",
"brooklyn",
"morgan1",
"darkness",
"rainbow1",
"shelby",
"slayer",
"natalia",
"snowball",
"chicago",
"454545",
"aaaaaa1",
"1234512345",
"people",
"lovers1",
"sharon",
"golden",
"snoopy1",
"shannon1",
"raiders",
"123qweasdzxc",
"sweetie",
"789789",
"teresa",
"blue123",
"242424",
"awesome",
"boston",
"victoria1",
"pamela",
"wilson",
"ssssss",
"mike",
"kevin",
"test",
"klaster",
"123456k",
"kenneth",
"bonjour",
"tucker",
"catherine",
"hockey1",
"pa55word",
"9379992",
"password.",
"eminem1",
"love11",
"mnbvcxz",
"logitech",
"redsox",
"remember",
"popcorn1",
"kevin1",
"isabelle",
"P3Rat54797",
"seven7",
"steelers1",
"qwe",
"marcus",
"bulldog",
"yfnfif",
"cricket",
"lakers24",
"edward1",
"tweety1",
"qazwsx1",
"123456t",
"single",
"lizottes",
"nastya",
"amber1",
"sarah",
"blessing",
"marley",
"rockstar1",
"fender",
"aaa111",
"willow",
"camille",
"aaaaaaaa",
"florida1",
"peaches1",
"bella1",
"carlos1",
"connor",
"d123456",
"love4ever",
"cutie1",
"indian",
"goodluck",
"marie1",
"loveme2",
"marine",
"hammer",
"chance",
"stephen",
"121314",
"123456l",
"z123456",
"santiago",
"strawberry",
"abcdefg1",
"bigdaddy",
"daisy1",
"thunder1",
"asdfghjk",
"marvin",
"mmmmmm",
"vanessa1",
"happy123",
"abcd123",
"fuckyou!",
"iverson3",
"hotdog",
"svetlana",
"arthur",
"1212",
"never",
"tintin",
"234567",
"iceman",
"orlando",
"satan666",
"superstar",
"babygurl1",
"090909",
"johnson",
"fyfcnfcbz",
"freddy",
"rachel1",
"magic",
"qwert12345",
"chester1",
"loverboy",
"miller",
"cookies",
"parker",
"azertyuiop",
"porsche",
"teacher",
"5555555555",
"angelica",
"yourmom1",
"bullshit",
"sunday",
"christopher",
"love1234",
"travis",
"5555555",
"evildick",
"666999",
"monika",
"nissan",
"qwer",
"asdfg",
"midnight1",
"williams",
"please",
"55555555",
"spencer",
"aaaaa1",
"gateway",
"tiger",
"dallas1",
"111111a",
"charles1",
"321654",
"gracie",
"raymond",
"ladybug",
"sweetpea",
"rush2112",
"greenday1",
"sunflower",
"1123581321",
"baby12",
"jason",
"precious1",
"lakers1",
"brooklyn1",
"stephanie1",
"undertaker",
"m",
"12345t",
"sweetheart",
"ihateyou",
"zachary",
"emily1",
"fktrcfylh",
"123698745",
"tamara",
"asdfjkl",
"21212121",
"456852",
"lebron23",
"andrei",
"paradise",
"doctor",
"kawasaki",
"PolniyPizdec0211",
"a12345678",
"money123",
"171717",
"sophia",
"winnie",
"bianca",
"bigboy",
"22222222",
"qqq111",
"jacob1",
"andrea1",
"john",
"julian",
"pantera",
"lucky13",
"poopoo",
"lollol",
"3d8Cubaj2E",
"lorenzo",
"sasuke",
"babyboy",
"nascar",
"hahaha1",
"vladimir",
"abc12345",
"sierra",
"shopping",
"career121",
"12345qwerty",
"genesis",
"christina",
"bandit1",
"mylove1",
"cool",
"nelson",
"abcd",
"january",
"sweet",
"qq123456",
"scarface",
"159159",
"montana",
"ricardo",
"dolphins",
"giovanni",
"frankie",
"soccer12",
"johnny1",
"facebook",
"changeme",
"zxcvbnm123",
"jerome",
"sassy1",
"password11",
"123454321",
"qw123321",
"dakota1",
"australia",
"southside1",
"soccer10",
"zoosk",
"maryjane",
"Ð¿Ñ—Ð…Ð¿Ñ—Ð…Ð¿Ñ—Ð…Ð¿Ñ—Ð…Ð¿Ñ—Ð…Ð¿Ñ—Ð…",
"brenda",
"rebecca1",
"baller1",
"honey1",
"jeffrey",
"xavier",
"eagles1",
"ryan",
"getmoney1",
"brianna1",
"realmadrid",
"8675309",
"k.",
"scooby1",
"westside",
"minnie",
"bobby1",
"vampire",
"linkinpark",
"asdasdasd",
"francesco",
"inuyasha",
"1478963",
"asdfg1",
"falcon",
"123456r",
"green",
"laura",
"1q1q1q",
"aaa",
"rosebud",
"katie1",
"alex123",
"111222333",
"asdfghj",
"iG4abOX4",
"sergio",
"nigger",
"sterling",
"sophie1",
"claire",
"100200",
"italia",
"ronaldo7",
"timothy",
"jaguar",
"mariana",
"maksim",
"abigail",
"isabel",
"sairam",
"520520",
"jackie1",
"savannah",
"bigdaddy1",
"courtney1",
"disney",
"bigboy1",
"nigga1",
"blue",
"zaqwsx",
"love22",
"c123456",
"dancer1",
"1qwerty",
"musica",
"single1",
"123456aa",
"valentin",
"brooke",
"oliver1",
"chicago1",
"cherry1",
"london1",
"cjkysirj",
"alberto",
"jesus123",
"565656",
"blabla",
"maria1",
"warcraft",
"patches",
"cat123",
"mahalkita",
"banana1",
"P",
"monkey123",
"hollister1",
"alyssa1",
"lover",
"butter",
"walter",
"black",
"alessandro",
"778899",
"W5tXn36alfW",
"tigers1",
"password7",
"danny1",
"awesome1",
"bestfriend",
"dominic",
"gabriel1",
"michele",
"gateway1",
"oscar1",
"sex",
"cancer",
"helpme",
"volleyball",
"yuantuo2012",
"marie",
"123456g",
"princess12",
"love69",
"justine",
"chouchou",
"bitch123",
"champion",
"france",
"kitty",
"element1",
"963852",
"jasmin",
"fishing1",
"4444",
"darling",
"united",
"manutd",
"teddybear",
"regina",
"natalie1",
"passwort",
"francesca",
"181818",
"abcdef1",
"maximus",
"rafael",
"buddy",
"victory",
"qwerasdf",
"animal",
"student",
"hawaii",
"apple123",
"spirit",
"jamaica",
"carter",
"kayla1",
"gabriela",
"mariposa",
"abcdefgh",
"love23",
"super",
"yahoo1",
"rental",
"eddie1",
"dreams",
"sexy69",
"cheyenne",
"babygirl12",
"poop123",
"1234321",
"england",
"eduardo",
"valeria",
"zachary1",
"1986",
"bob123",
"antonio1",
"sniper",
"napoli",
"panther",
"willie",
"redsox1",
"hallo",
"zaq123",
"calvin",
"veronika",
"111111111",
"lol",
"nintendo",
"copper",
"millie",
"georgia",
"ybccfy",
"dog123",
"brianna",
"123zxc",
"happiness",
"diesel",
"monkey12",
"mohamed",
"123321a",
"camaro",
"bigdog",
"7895123",
"100000",
"engineer",
"bitches1",
"estrella",
"grandma1",
"princesa",
"oksana",
"gloria",
"penguin",
"virginia",
"skater",
"scarface1",
"suzuki",
"martin1",
"blue22",
"donald",
"123456e",
"PASSWORD",
"1234560",
"newlife",
"chris123",
"++++++",
"123qaz",
"leslie",
"jimmy1",
"sweet16",
"anderson",
"abcdefg123",
"77777777",
"blahblah",
"wwwwww",
"aleksandr",
"shelby1",
"adriana",
"kisses",
"giuseppe",
"softball1",
"skyline",
"audrey",
"fucku1",
"trouble",
"badboy1",
"rey619",
"tristan",
"celtic",
"vkontakte",
"love101",
"pimpin",
"simpsons",
"liberty",
"7777",
"jeremy1",
"godisgood",
"angels1",
"262626",
"cupcake",
"twilight1",
"skate1",
"potter",
"bradley",
"warrior",
"qw123",
"miranda",
"pumpkin1",
"barbie1",
"sexsex",
"100",
"147896325",
"smile",
"hesoyam",
"debbie",
"ruslan",
"online",
"maddie",
"jessie1",
"pink123",
"speedy",
"taurus",
"loveyou2",
"olivia1",
"ladybug1",
"wizard",
"allison",
"pierre",
"domino",
"benjamin1",
"apples1",
"silvia",
"kingkong",
"bobby",
"monday",
"polina",
"fuckyou123",
"honda1",
"mercury",
"nokia",
"rascal",
"pepsi1",
"6969",
"silver1",
"angela1",
"florence",
"adgjmptw",
"cookies1",
"margarita",
"hallo123",
"monique",
"258456",
"fuck123",
"9111961",
"love14",
"pass1234",
"children",
"zzzzzzzz",
"tyler",
"123451",
"cristian",
"star",
"justice",
"password5",
"booger",
"knight",
"mamapapa",
"dreamer",
"siemens",
"esther",
"soccer11",
"hollywood",
"qawsed",
"password01",
"monkey2",
"cassie1",
"anna",
"inuyasha1",
"amoremio",
"sister",
"gregory",
"191919",
"serenity",
"natali",
"sabrina1",
"N8ZGT5P0sHw=",
"prince1",
"rangers1",
"camila",
"123456qwerty",
"ncc1701",
"1bitch",
"nirvana1",
"ronald",
"business",
"texas1",
"element",
"avatar",
"panasonic",
"gangster",
"serega",
"brandy1",
"asasas",
"25802580",
"missy1",
"colorado",
"jenny1",
"microsoft",
"cowboy1",
"909090",
"1989",
"sammy",
"jupiter",
"stanley",
"madonna",
"123456p",
"serena",
"valerie",
"superstar1",
"legolas",
"Groupd2013",
"31415926",
"dbrnjhbz",
"rocket",
"megan1",
"airforce1",
"apollo",
"3Odi15ngxB",
"internet1",
"westside1",
"qwer123",
"brooke1",
"kelsey",
"pebbles",
"system",
"catdog",
"christina1",
"flowers1",
"Passw0rd",
"sultan",
"icecream1",
"bulldog1",
"redneck1",
"123457",
"123987",
"gizmo1",
"johncena1",
"danger",
"chichi",
"donkey",
"nfnmzyf",
"asdzxc",
"india",
"titanic",
"compaq1",
"thebest",
"kirill",
"javier",
"hamster",
"myspace!",
"223344",
"gangsta",
"packers",
"asdasd123",
"pookie1",
"hitman",
"kathleen",
"qwqwqw",
"cupcake1",
"skittles",
"sports",
"coucou",
"frankie1",
"P@ssw0rd",
"aaron1",
"christmas",
"molly",
"casper1",
"qti7Zxh18U",
"blondie",
"football12",
"smiley",
"snickers1",
"lasvegas",
"sam123",
"445566",
"september1",
"2222",
"jayjay",
"basket",
"elena",
"ireland",
"110110",
"123456789m",
"k123456",
"tommy1",
"jesus7",
"madrid",
"marshall",
"vegeta",
"people1",
"minecraft",
"terminator",
"security",
"drowssap",
"sparky1",
"123456789z",
"19871987",
"poiuytrewq",
"j12345",
"pauline",
"jackson5",
"jetaime",
"p@ssw0rd",
"ronnie",
"skippy",
"kimberly1",
"rammstein",
"alexandre",
"scotland",
"nikki1",
"rocky",
"asdfjkl:",
"motdepasse",
"stefan",
"celine",
"harrypotter",
"aaaaaaa",
"babydoll",
"manman",
"violet",
"dddddd",
"192837465",
"pizza1",
"legend",
"321654987",
"iloveyou.",
"bella",
"truelove",
"harvey",
"tanner",
"runescape1",
"fantasy",
"peter",
"casanova",
"friday",
"robbie",
"katrina",
"philips",
"spencer1",
"francisco",
"cool123",
"viktor",
"exigent",
"fluffy1",
"qwertz",
"chocolat",
"christophe",
"phoenix1",
"poiuyt",
"z",
"bambam",
"jesus777",
"99999999",
"1qaz1qaz",
"323232",
"pussy69",
"killer123",
"rhbcnbyf",
"alejandra",
"muffin1",
"kelly1",
"stonecold",
"aurora",
"chivas",
"loser",
"gordon",
"love21",
"gandalf",
"lalala1",
"jasper1",
"a1s2d3f4",
"spanky",
"love10",
"mitchell",
"g9l2d1fzPY",
"jack",
"babygirl2",
"19851985",
"welcome123",
"franklin",
"russia",
"carpediem",
"aaaaaaaaaa",
"linked",
"zaq1xsw2",
"megaparol12345",
"travis1",
"admin123",
"daisy",
"lorena",
"froggy",
"smiles",
"douglas",
"handsome",
"shithead",
"1blood",
"tatiana",
"santos",
"little1",
"anastasia",
"unicorn",
"5555",
"12369874",
"savannah1",
"tinker1",
"sweetie1",
"jenny",
"dIWtgm8492",
"1234567q",
"super1",
"margaret",
"viking",
"muhammad",
"maxwell1",
"pppppp",
"sexyboy",
"phantom",
"fatboy",
"m12345",
"tomtom",
"080808",
"monica1",
"ballin1",
"eclipse",
"andres",
"elijah",
"maurice",
"piglet",
"baxter",
"123456654321",
"pikachu",
"india123",
"platinum",
"gangster1",
"garcia",
"passport",
"jesuschrist",
"kelly",
"sandra1",
"hotmail1",
"mahalko",
"charmed",
"loving",
"272727",
"corazon",
"katherine",
"michel",
"myspace12",
"access",
"bunny1",
"123321123",
"wisdom",
"mozart",
"snowball1",
"147147",
"asdfghjkl:",
"patches1",
"abcde",
"chloe1",
"horses1",
"D1lakiss",
"98765",
"church",
"everton",
"12345m",
"nicola",
"peace1",
"marcus1",
"trouble1",
"13579",
"dylan1",
"tinker",
"161616",
"candy",
"69696969",
"valentine",
"grace",
"sandy1",
"hercules",
"123456f",
"beatrice",
"puppy1",
"cooper1",
"wolverine",
"12345s",
"mama",
"jamesbond",
"jamie1",
"theman",
"anton",
"19841984",
"toshiba",
"cthutq",
"maradona",
"emily",
"gibson",
"787878",
"bingo1",
"green123",
"marcel",
"lolipop",
"maganda",
"penis1",
"turtle1",
"amsterdam",
"joanna",
"fashion",
"mercedes1",
"yahoo.com",
"123000",
"19861986",
"britney",
"boston1",
"goldfish",
"power",
"james123",
"kitkat",
"network",
"lawrence",
"pass1",
"112358",
"beatles",
"winston1",
"saibaba",
"princess2",
"trevor",
"promise",
"norman",
"14789632",
"hotdog1",
"idontknow",
"hollywood1",
"damian",
"star123",
"123456y",
"diamonds",
"trinity1",
"ihateyou1",
"kkkkkk",
"cutiepie",
"soccer13",
"bulldogs",
"felipe",
"yoyoyo",
"heaven1",
"enigma",
"marion",
"angel12",
"brian1",
"jayden",
"germany",
"mario",
"onelove1",
"369369",
"soccer7",
"casey1",
"sasha",
"brother",
"matteo",
"max123",
"melody",
"jimmy",
"success1",
"simona",
"julien",
"hjvfirf",
"loveu2",
"digital",
"english",
"reggie",
"shalom",
"power1",
"einstein",
"forever21",
"karate",
"135792468",
"hello12",
"bubble",
"nathalie",
"benfica",
"billy",
"spartak",
"hahahaha",
"harrison",
"timothy1",
"mom123",
"123456123",
"danny",
"kingdom",
"poopoo1",
"admin",
"gunner",
"ranger1",
"1234asdf",
"anhyeuem",
"helena",
"sasha1",
"buttercup",
"argentina",
"water1",
"cocacola1",
"polska",
"soccer123",
"omsairam",
"saturn",
"hg0209",
"manager",
"georgia1",
"stephen1",
"baller",
"282828",
"forest",
"12345r",
"johncena",
"sweets",
"elaine",
"maryjane1",
"dragonball",
"milano",
"stargate",
"colombia",
"brian",
"19891989",
"captain",
"infinity",
"pandora",
"amelia",
"trfnthbyf",
"dianne",
"eagle1",
"redskins",
"digital1",
"sexybitch1",
"general",
"pogiako",
"dinosaur",
"zidane",
"7894561230",
"colt45",
"spring",
"sureno13",
"arnold",
"catdog1",
"jesse1",
"eugene",
"teddy1",
"penelope",
"19921992",
"runescape",
"paintball1",
"little",
"blood1",
"test1234",
"summer08",
"billy1",
"nadine",
"myname",
"therock",
"rusty1",
"fatboy1",
"ciaociao",
"football2",
"swimming",
"wesley",
"travel",
"Telechargement",
"zxczxc",
"orlando1",
"nonmember",
"grandma",
"password4",
"654123",
"tennis1",
"shithead1",
"denise1",
"thuglife",
"bbbbbb",
"vRbGQnS997",
"nothing1",
"nigga",
"asd",
"subaru",
"chacha",
"tequiero",
"moomoo",
"charly"
  ]

	const [
		bestSeq,
		bestScore,
		bestAlignment,
		bestOperations,
		bestDetailedOps,
		bestPercentMatch,
	] = bestMatch(password, database.slice(numPassInDatabase));

	return (100 - bestPercentMatch)+0.1;
}
