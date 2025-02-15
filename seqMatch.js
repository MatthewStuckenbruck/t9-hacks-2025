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
        const score = (seq1[i - 1] === seq2[j - 1]) ? match : mismatch;
  
        const choices = [
          [dp[i - 1][j - 1] + score, 0], // Diagonal (match/mismatch)
          [dp[i - 1][j] + gap, 1],         // Up (deletion)
          [dp[i][j - 1] + gap, 2]          // Left (insertion)
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
          detailedOps = "Substitute " + seq1[i - 1] + " -> " + seq2[j - 1] + " " + detailedOps;
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
  
    const percentMatch = (totalOps > 0) ? (matchesCount / totalOps) * 100 : 100;
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
      const [score, align1, align2, operations, detailedOps, percentMatch] = seqAlign(query, seq);
      if (score < bestScore) {
        bestScore = score;
        bestAlignment = [align1, align2];
        bestSeq = seq;
        bestOperations = operations;
        bestDetailedOps = detailedOps;
        bestPercentMatch = percentMatch;
      }
    }
  
    return [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch];
  }
  

  function exampleUsage()
  {
    const database = ["password123", "hahahaha", "lolXD", "123456"];
    const password = "password";

    const [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch] = bestMatch(password, database);

    // Print results
    console.log(`Best match: ${bestSeq}`);
    console.log(`Score: ${bestScore}`);
    console.log(`Percent Match: ${bestPercentMatch.toFixed(2)}%`);
    console.log(`Alignment:\n${bestAlignment[0]}\n${bestAlignment[1]}`);
    console.log(`Operations: ${bestOperations}`);
    console.log(`Detailed Steps: ${bestDetailedOps}`);
  }

  
  function actualUsage(password, numPassInDatabase)
  {
  

    // Split the file into lines and take the first numPassInDatabase
    const database = ["123456",
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
"nicolas",];

    const [bestSeq, bestScore, bestAlignment, bestOperations, bestDetailedOps, bestPercentMatch] = bestMatch(password, database.slice(numPassInDatabase));
    return (100-bestPercentMatch);
  }