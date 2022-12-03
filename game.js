const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  if (document.contains(document.getElementById("drawing"))) {
    document.getElementById("drawing").remove();
  }
  if (!textNode.image == "") {
    const draw = document.createElement("div");
    draw.id = "draw";
    const image = document.createElement("img");
    image.setAttribute("src", textNode.image);

    image.setAttribute("id", "drawing");
    document.getElementById("draw").appendChild(image);
  }

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
  document.getElementById("draw").remove;
}

const textNodes = [
  //The beginning of the Story plot line
  {
    id: 1,
    text: "Welcome to LoveStung! Our main protagonist is George P. Burdell, a freshman CS major starting his first year in college.",
    options: [
      {
        text: "Start",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "It's your first day of class and because you are a freshman, you were only able to register for the 8 AM section of CS 1332 - Data Structures and Algorithms with Professor HB. You notice someone sit down next to you and as you glance over, your eyes meet. What should you say?",
    image: "img/frame1.jpg",
    options: [
      {
        text: '"This class is is going to be a piece of cake, pftttt. Especially after interning at Google during senior year LOL.',
        setState: { badNicole: true },
        nextText: 3,
      },
      {
        text: '"Hey, what is your name?"',
        setState: { neutralNicole: true },
        nextText: 4,
      },
      {
        text: '"Hi, my name is George! I am a first year CS major, what about you?"',
        setState: { goodNicole: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text: 'The girl beside you responds, "ah okay...cool, ha.',
    image: "img/frame2.jpg",
    options: [
      {
        text: "Continue",
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: 'The girl beside you responds, "Oh hey, my name is Nicole! I am a first year CS major!',
    image: "img/frame2.jpg",
    options: [
      {
        text: "Continue",
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text: "You chat with Nicole, the girl next to you, for a bit longer until Professor HB starts the first lecture. Soon after the lecture ends, you see Nicole begin to leave. What do you do?",
    image: "img/frame3.jpg",
    options: [
      {
        text: '"Have you ate yet? I am going to go to Rising Roll and check it out, wanna come?',
        requiredState: (currentState) => currentState.goodNicole,
        nextText: 6,
      },
      {
        text: '"I heard Willage breakfast slaps, want to try it out with me?',
        nextText: 13,
      },
      {
        text: '"Breakfast is for noobs, code for life"',
        nextText: 14,
      },
    ],
  },
  {
    id: 6,
    text: '"Sure, I didn\'t eat breakfast yet and I am kind of hungry too!"',
    image: "img/frame4.jpg",
    options: [
      {
        text: "Continue",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "You and Nicole head over to Rising Roll and enjoy sandwiches over small dialogue. She asks you about your hobbies. How do you respond?",
    image: "img/id7.jpg",
    options: [
      {
        text: '"I like coding. Wait, scratch that. I LOVE coding. Also, League of Legends. I love League.',
        setState: { badNicole: true, goodNicole: false },
        nextText: 8,
      },
      {
        text: '"I enjoy playing tennis and going out with friends (responsibly).',
        nextText: 8,
      },
      {
        text: '"I love to read, cook, and watch bad rom-coms."',
        setState: { neutralNicole: true, goodNicole: false },
        nextText: 8,
      },
    ],
  },
  {
    id: 8,
    text: "The two of you finish your meals and begin to get ready to leave for the next class. What do you do?",
    image: "img/id8.jpg",
    options: [
      {
        text: '"Hey do you want to exchange numbers, so we can study and hang out sometime again?"',
        requiredState: (currentState) => currentState.goodNicole,
        nextText: 9,
      },
      {
        text: '"It was nice meeting you, I will see you around!"',
        nextText: 10,
      },
      {
        text: '"Wow, Rising Roll is pretty good. We should come here again sometime."',
        nextText: 10,
      },
    ],
  },
  {
    id: 9,
    text: 'She responds, "Sure! Sounds like fun. Let me know if you ever want to do something."',
    image: "img/id9.jpg",
    options: [
      {
        text: "You exchange numbers",
        setState: { nicoleNumber: true },
        nextText: 10,
      },
    ],
  },
  {
    id: 10,
    text: "The two of you head your separate ways. You head to your next class, MATH 1554 - Linear Algebra.",
    image: "img/id10.jpg",
    options: [
      {
        text: "continue",
        nextText: 11,
      },
    ],
  },
  {
    id: 11,
    text: "You arrive to your MATH 1554 - Linear Algebra class 5 minutes late and enter the packed lecture hall. You get a phone call from Isabell, your childhood friend that is a sophomore CS major at Georgia Tech while the professor has already jumped into the lecture material. What do you do? ",
    image: "img/id11.jpg",
    options: [
      {
        text: "You pick up the phone",
        setState: { answerPhone: true },
        nextText: 12,
      },
      {
        text: "You reject the call - you were already late to class and you do not want to fall behind",
        nextText: 20,
      },
    ],
  },
  {
    id: 12,
    text: 'You exit the lecture hall to pick up the phone. "Hey George, I have to show you around campus sometime! Do you want hangout at tech square with me on Saturday?" Isabell asks. ',
    image: "img/id12.jpg",
    options: [
      {
        text: '"Sure, I would love to hang out again! I do not know the area well, so I will be counting on you to lead the way!" you reply. Isabell suggests that you should also invite your roommate Jerry and the two of you spend the rest of the class making plans and catching up.',
        nextText: 36,
      },
    ],
  },
  {
    id: 13,
    text: 'Nicole gives you an unsure look and says "I think I will pass on that offer, maybe some other time". ',
    image: "img/frame4.jpg",
    options: [
      {
        text: '"Alright, maybe some other time!" You decide to go to Willage without her.',
        nextText: 14,
      },
    ],
  },
  {
    id: 14,
    image: "img/id14.jpg",
    text: "You end up heading to Willage on your own. You grab food and as you find seating, you see your roommate Jerry eating alone and decide to sit with him. What do you say to him? ",
    options: [
      {
        text: '"Hey man, how are you feeling about your first day on campus?"',
        setState: { niceRoommate: true },
        nextText: 15,
      },
      {
        text: '"Ugh, 8 AM classes are the worst. Did you have any boring classes yet?"',
        setState: { niceRoommate: true },
        nextText: 15,
      },
      {
        text: "Say nothing and just eat - you are famished after that intense CS 1332 lecture.",
        setState: { niceRoommate: false },
        nextText: 15,
      },
    ],
  },

  {
    id: 15,
    image: "img/id15.jpg",
    text: '"Well, I-" before he can even begin to ramble about what he thinks, Isabell, your childhood friend, suddenly appears and plops herself next to you and Jerry, inviting herself to eat with the two of you. Jerry looks visibly surprised that such a cool person knows you. What do you do?',
    options: [
      {
        text: ' You decide to introduce them to one another, saying "Oh, this is Isabell, my childhood friend. Isabell, this is Jerry, my roommate."',
        setState: { niceRoommate2: true },
        nextText: 16,
      },
      {
        text: ' You go ahead and greet Isabell and ignore Jerry and his confused look. "Hey Isabell, I did not expect you to come here and eat breakfast," you say warmly.',
        setState: { niceRoommate2: false },
        nextText: 16,
      },
      {
        text: "Say nothing and just eat - you are famished after that intense CS 1332 lecture.",
        setState: { niceRoommate2: false },
        nextText: 11,
      },
    ],
  },
  {
    id: 16,
    image: "img/id16.jpg",
    text: " The three of you ease into the conversation. You had a great time catching up with Isabell since the two of you were unable to meet up during the summer break. you lose track of time and realize that you have to go to your next class, MATH 1554 - Linear Algebra. You tell them you have to leave for class and Jerry tags along with you since he also has a class at that time.",
    options: [
      {
        text: " continue",
        requiredState: (currentState) => currentState.niceRoommate,
        requiredState: (currentState) => currentState.niceRoommate2,
        nextText: 17,
      },
      {
        text: " continue",
        requiredState: (currentState) => !currentState.niceRoommate2,
        nextText: 18,
      },
    ],
  },
  {
    id: 17,
    image: "img/id17+18.jpg",
    text: ' Jerry says, "Hey, if you ever need a wingman, you can ask me. I gotchu." You look very confused at what he is suggesting, but he walks in the other direction before you can respond.',
    options: [
      {
        text: ' "What?" you try to ask him what he means by that.',
        setState: { wingman: true },
        nextText: 19,
      },
      {
        text: ' "Thanks?" you say, unsure of what he means.',
        setState: { wingman: true },
        nextText: 19,
      },
    ],
  },
  {
    id: 18,
    image: "img/id17+18.jpg",
    text: ' Jerry asks, " How come you have never said anything about her? She is so cool, is she single?"',
    options: [
      {
        text: ' "uhh",  you begin to think if she is single or not.',
        setState: { wingman: false },
        nextText: 19,
      },
      {
        text: ' "Wha-" you try to comprehend the situation at hand',
        setState: { wingman: false },
        nextText: 19,
      },
    ],
  },
  {
    id: 19,
    image: "img/id19.jpg",
    text: " Jerry walks away before you can get a single word out.",
    options: [
      {
        text: " continue",
        nextText: 11,
      },
    ],
  },
  {
    id: 20,
    image: "img/id20.jpg",
    text: ' You pay attention to the lecure but it is kind of boring so you struggle to keep awake during class. The girl nexts to you hides her chuckle poorly as she watches you fight for your life to stay awake. "Sorry," she whispers to you, "I couldn\'t help but to laugh at someone sleeping on the first day." How do you respond?',
    options: [
      {
        text: '"Right, because the syllabus is just that important," you jab back, more lucid.',
        nextText: 21,
      },
      {
        text: "You jerk your head up, instantly more awake and slightly embaressed.",
        nextText: 22,
      },
      {
        text: '"Ahaha... it\'s been a kind of rough day already," you say even though you are barely half way through your day.',
        nextText: 21,
      },
    ],
  },
  {
    id: 21,
    image: "img/id21.jpg",
    text: " She chuckles at your comeback, \"I'm Jennifer, a second year CS student. I'm guessing you're a freshie?\"",
    options: [
      {
        text: '"Hah," you scoff, "as if I\'d tell you."',
        setState: { goodJen: true },
        nextText: 22,
      },
      {
        text: '"Yeah, I\'m George, a first year CS student."',
        nextText: 22,
      },
    ],
  },
  {
    id: 22,
    image: "img/22.jpg",
    text: ' The professor announced that class would be let out early today. You notice that you have a text notification from Isabell. "Guess, you can finally get your beauty sleep," Jennifer says with a coy smile. How do you respond?',
    options: [
      {
        text: "You don't look at her and quickly bolt out of that class - Isabell finally texted you first!",
        nextText: 27,
      },
      {
        text: '"It\'s just subliminal learning," you retort back with an eyeroll.',
        requiredState: (currentState) => currentState.goodJen,
        nextText: 23,
      },
      {
        text: '"uh.. ok?" you say, feeling slightly offended that she is implying that you are not beautiful.',
        nextText: 24,
      },
    ],
  },
  {
    id: 23,
    image: "img/id23.jpg",
    text: ' "Yeah, yeah, trust me I\'ve tried that and it has NOT worked well," she replies, "so if you ever need help, call me sometime." She hands you her number. How do you respond?',
    options: [
      {
        text: "You quickly put her number in her phone and text her your name, since you didn't give it to her earlier.",
        setState: { jenNumber: true },
        nextText: 24,
      },
      {
        text: '"Skill gap," you respond before the two of you part ways. You save her number in your phone.',
        setState: { jenNumber: true },
        nextText: 24,
      },
      {
        text: '"EEEEEEEEEEEEEEEEK," you shriek a little too loudly. You can\'t control your exictement since this is the first time that someone gave you their number.',
        setState: { jenNumber: true, goodJen: false },
        nextText: 24,
      },
    ],
  },
  {
    id: 24,
    image: "img/id23.jpg",
    text: "You look at your phone and decide who you should ask to make plans with for the upcoming weekend.",
    options: [
      {
        text: 'Text Nicole, "Hey! Would you free this weekend to watch a movie?"',
        requiredState: (currentState) => currentState.nicoleNumber,
        requiredState: (currentState) => currentState.goodNicole,
        nextText: 25,
      },
      {
        text: 'Ask Jennifer, "Are you free this weekend to hangout?"',
        requiredState: (currentState) => currentState.jenNumber,
        requiredState: (currentState) => currentState.goodJen,
        setState: { routeJen: true },
        nextText: 26,
      },
      {
        text: 'Text Isabell, "We should catch up, are you free this weekend?',
        nextText: 36,
      },
    ],
  },
  {
    id: 25,
    text: 'Nicole responds quickly with, "I\'m sorry, but I already have plans with some friends this weekend."',
    options: [
      {
        text: "Continue",
        nextText: 27,
      },
    ],
  },
  {
    id: 26,
    text: 'Jennifer exclaims, "Yeah that sounds like fun! Do you happen to play any tennis? I played a lot when I was in high school, and I\'ve been dying to play a game!"',
    options: [
      {
        text: '"I\'d love to play tennis! I am not that great at it, but I think I can put up a good fight."',
        nextText: 27,
      },
      {
        text: "\"Tennis isn't my forte, but I wouldn't mind giving it a spin.\"",
        nextText: 27,
      },
    ],
  },
  {
    id: 27,
    text: ' You suddenly get a text and you see: "Hey George! It\'s been a while, but we should hangout this weekend! You can bring your roommate too if he wants to come with us :) \n How do you respond?"',
    options: [
      {
        text: "\"Hey Isabell! I would love to hangout this weekend. I haven't seen you since the summer. I'll make sure to tell Jerry and let him know :D\"",
        requiredState: (currentState) => !currentState.routeJen,
        nextText: 36,
      },
      {
        text: '"Awww, I would love to, but I already have plans made. Let\'s hangout some other time!"',
        requiredState: (currentState) => currentState.routeJen,
        nextText: 28,
      },
    ],
  },
  {
    id: 28,
    text: "The weekend rolls around and you are excited to play tennis with Jennifer! As you arrive at Ken Byers' courts, you notice her already practicing some hits. What do you say?",
    options: [
      {
        text: '"Sorry to interupt your pre-game warmups, you will definitely need them if you are up against me."',
        setState: { goodJen: false },
        nextText: 29,
      },
      {
        text: "Mind if I join in for some warmup?",
        setState: { goodJen: true },
        nextText: 29,
      },
      {
        text: "Your forehand has great form, you've got to teach me!",
        setState: { goodJen: true },
        nextText: 29,
      },
    ],
  },
  {
    id: 29,
    text: "\"I've been playing for a while now, so I hope you don't get too intimidated. Let's rally for a bit and then play a few games!\"",
    options: [
      {
        text: "Continue",
        nextText: 30,
      },
    ],
  },
  {
    id: 30,
    text: "Just as the final point is being played, you trip and fall trying to reach a well placed cross court forehand by Jennifer. You have just lost all 3 games. Jennifer seems worried about you and rushes to see if you are okay. What do you say?",
    options: [
      {
        text: '"I cannot believe the amount of luck that you have. There is no way, on a good day, that you would even have a chance of beating me. I\'ll let these few wins slide, but next time I will definitely win."',
        setState: { goodJen: false },
        nextText: 31,
      },
      {
        text: '"You played amazingly; I knew from the very beginning that I wasn\'t going to win."',
        nextText: 32,
      },
      {
        text: '"Now that we have played a few games in your racket sport of choice, why don\'t we play one of my choice? Wanna head over to the CRC and play some badminton?"',
        setState: { jenLove: true },
        nextText: 33,
      },
    ],
  },
  {
    id: 31,
    text: "\"Wow I didn't know I was playing with a sore loser baby. You deserve to lose, maybe trying working on... I don't know... EVERYTHING CAUSE YOU SUCK!\"",
    options: [
      {
        text: "Jennifer storms off.",
        setState: { goodJen: false },
        nextText: 39,
      },
    ],
  },
  {
    id: 32,
    text: '"Thanks, you played really well too! We should play again sometime."',
    options: [
      {
        text: '"Sounds great to me!',
        nextText: 39,
      },
      {
        text: '"Yeah why not?"',
        nextText: 39,
      },
      {
        text: '"Ehh, maybe not tennis again..."',
        nextText: 39,
      },
    ],
  },
  {
    id: 33,
    text: 'You and Jennifer end up playing badminton all night at the CRC. There seems to be a spark that draws both of you into each other. You would end up going on countless amounts of dates with Jennifer, as you really enjoy spending time with her. One day while hanging out, she asks you for advice. "I just got an offer to study abroad at multiple prestigious universities! The thing is, it would be for 2 years, meaning that I would graduate without seeing you for two years. Do you think I should take the offer?"',
    options: [
      {
        text: '"Jennifer, I really like you! I would love to date you and I personally don\'t think I could do long distance. 2 years abroad seems a bit much and difficult in my opinion. I think you should stay."',
        nextText: 34,
      },
      {
        text: '"You should definitely accept the offer. That seems like such a fun time with endless opportunities of growth and success. I will definitely miss your company, but I think it\'s best for you to go abroad!"',
        nextText: 35,
      },
    ],
  },
  {
    id: 34,
    text: '"Got it, thanks for the advice!"... You start to date Jennifer for a couple of months and everything seems to be going well. However, she eventually breaks up with you after coming to the conclusion that she wants to focus on herself and her career.',
    options: [
      {
        text: "End",
        nextText: -1,
      },
    ],
  },
  {
    id: 35,
    text: '"Got it, thanks for the advice!"... Jennifer ends up traveling abroad, but you stay in close contact with her. Your bond is strong and you both remain great friends for years to come.',
    options: [
      {
        text: "End",
        nextText: -1,
      },
    ],
  },
  {
    id: 36,
    text: 'Isabell suggested going on a "Sweet Hut run" after you and Jerry were done with classes. As the three of you arrive to Sweet Hut, Isabell asks if you can order her something since she needed to use the bathroom. What do you order?',
    options: [
      {
        text: "Suddenly, Nicole calls you. Answer the phone?",
        setState: { routeNic: true },
        requiredState: (currentState) => currentState.nicoleNumber,
        nextText: 46,
      },
      {
        text: 'Jerry says, "You can\'t go wrong with Sweet Hut Milk Tea."',
        setState: { goodIsa: true },
        requiredState: (currentState) => currentState.wingman,
        nextText: 37,
      },
      {
        text: "Sweet Hut Milk Tea. Seems basic and standard.",
        setState: { goodIsa: true },
        requiredState: (currentState) => !currentState.wingman,
        nextText: 37,
      },
      {
        text: "Jasmine Green Milk Tea. Green tea and milk tea might be a good mix!",
        setState: { goodIsa: false, badIsa: true },
        nextText: 38,
      },
      {
        text: "Coffee Milk Tea. Does she like to drink coffee? Ugh, remember come on!",
        setState: { goodIsa: false, badIsa: true },
        nextText: 38,
      },
      {
        text: 'Jerry says, "You can\'t go wrong with Mango Green/Black Tea"',
        setState: { goodIsa: true },
        requiredState: (currentState) => currentState.wingman,
        nextText: 37,
      },
      {
        text: "Mango Green/Black Tea. Not your traditional drink, but seems fruity.",
        setState: { goodIsa: true },
        requiredState: (currentState) => !currentState.wingman,
        nextText: 37,
      },
    ],
  },
  {
    id: 37,
    text: 'Isabell exclaims, "This is my favorite thing to get here, how did you know?"',
    options: [
      {
        text: '"I knew you would love it, we\'ve been friends for so long!". You wink at Jerry to thank him for the help.',
        requiredState: (currentState) => currentState.wingman,
        nextText: 39,
      },
      {
        text: '"I kind of just guessed, but I am glad that you enjoy it!"',
        requiredState: (currentState) => !currentState.wingman,
        nextText: 39,
      },
      {
        text: '"Of course I knew, I am just a big brain alpha male you know?"',
        requiredState: (currentState) => !currentState.wingman,
        setState: { goodIsa: false, badIsa: true },
        nextText: 39,
      },
    ],
  },
  {
    id: 38,
    text: '"Thanks for the drink! I usually don\'t get this often. I would have preferred something else, but no biggie!"',
    options: [
      {
        text: "You see Jerry in the corner of your eye laughing, as he tries to not make too much noise.",
        nextText: 39,
      },
    ],
  },
  {
    id: 39,
    text: "The sun has started to set, and you decide to head to Willage with Jerry and Isabell for dinner. Grabbing the best dinning food that Tech offers, you begin to enjoy your meal and converse with Jerry.",
    options: [
      {
        text: "Continue",
        requiredState: (currentState) => currentState.goodIsa,
        nextText: 40,
      },
      {
        text: "Continue",
        requiredState: (currentState) => currentState.badIsa,
        nextText: 42,
      },
      {
        text: "Continue",
        requiredState: (currentState) => currentState.routeJen,
        nextText: 44,
      },
      {
        text: "Continue",
        requiredState: (currentState) => currentState.routeNic,
        nextText: 44,
      },
    ],
  },
  {
    id: 40,
    text: 'The three of you have wonderful conversations, and Isabell seems to especially enjoy catching up with you. She asks, "Hey George, do you want to maybe watch a movie later tonight at my place? I\'ve got popcorn!"',
    options: [
      {
        text: "You smile warmly and say, \"Of course, I'd love to watch a movie with you.",
        nextText: 41,
      },
    ],
  },
  {
    id: 41,
    text: "You share many wonderful dates and excursions with Isabell, and eventually you become the cutest couple on Tech campus.",
    options: [
      {
        text: "End",
        nextText: -1,
      },
    ],
  },
  {
    id: 42,
    text: 'The three of you have wonderful conversations and it feels great to catch up with Isabell. Jerry asks, "Isabell, do you want to come over our dorm and play some Mario Kart?"',
    options: [
      {
        text: 'You answer, "ooooo that sounds like fun. Isabell, you should stop by!"',
        nextText: 43,
      },
    ],
  },
  {
    id: 43,
    text: "As the school years progress, the three of you stay great friends who love to spend time with one another. From countless Sweet Hut runs, to those Willage dinner nights, the friendship bond is as strong as ever.",
    options: [
      {
        text: "End",
        nextText: -1,
      },
    ],
  },
  {
    id: 44,
    text: 'The three of you have wonderful conversations, and Isabell seems to especially enjoy talking with Jerry. She asks, "Hey Jerry, do you want to try out this restaurant some time in the upcoming week?"',
    options: [
      {
        text: "Continue",
        nextText: 45,
      },
    ],
  },
  {
    id: 45,
    text: "As the school years progress, Jerry and Isabell grew closer and closer. They end up as Tech's cutest couple, and you are happy for the both of them.",
    options: [
      {
        text: "End",
        nextText: -1,
      },
    ],
  },
  {
    id: 46,
    text: '"Hey I am really sorry but if you are still free now, do you want to grab some food?"',
    options: [
      {
        text: '"Oh yeah I am not busy right now, I can meet you at Tin Drum!"',
        nextText: 48,
      },
      {
        text: '"Sorry, I am already out with some peeps, next time though for sure!',
        setState: { routeNic: false },
        nextText: 47,
      },
    ],
  },
  {
    id: 47,
    text: "As the three of you arrive to Sweet Hut, Isabell asks if you can order her something since she needed to use the bathroom. What do you order?",
    options: [
      {
        text: 'Jerry says, "You can\'t go wrong with Sweet Hut Milk Tea."',
        setState: { goodIsa: true },
        requiredState: (currentState) => currentState.wingman,
        nextText: 37,
      },
      {
        text: "Sweet Hut Milk Tea. Seems basic and standard.",
        setState: { goodIsa: true },
        requiredState: (currentState) => !currentState.wingman,
        nextText: 37,
      },
      {
        text: "Jasmine Green Milk Tea. Green tea and milk tea might be a good mix!",
        setState: { goodIsa: false, badIsa: true },
        nextText: 38,
      },
      {
        text: "Coffee Milk Tea. Does she like to drink coffee? Ugh, remember come on!",
        setState: { goodIsa: false, badIsa: true },
        nextText: 38,
      },
      {
        text: 'Jerry says, "You can\'t go wrong with Mango Green/Black Tea"',
        setState: { goodIsa: true },
        requiredState: (currentState) => currentState.wingman,
        nextText: 37,
      },
      {
        text: "Mango Green/Black Tea. Not your traditional drink, but seems fruity.",
        setState: { goodIsa: true },
        requiredState: (currentState) => !currentState.wingman,
        nextText: 37,
      },
    ],
  },
  {
    id: 48,
    text: "You make up some bad excuse to leave Jerry and Isabell to meet Nicole at Tin Drum. As you walk into the store, you are completely mesmerized by Nicole's outfit. As you are sweating profusely, what do you say to her?",
    options: [
      {
        text: "\"Fancy seeing you here, 'pant', it's not like, 'pant', I just, 'pant', ran here or anything LOL.\"",
        nextText: 49,
      },
      {
        text: '"I love your outfit, it suits you well!"',
        nextText: 49,
      },
      {
        text: '"Did you order yet? I heard that the food here is pretty good and I am absolutely starving."',
        nextText: 49,
      },
    ],
  },
  {
    id: 49,
    text: "You enjoy your time and Tin Drum with Nicole, and even end up walking her back to her dorm. During the walk, you had great conversations and felt as if there was something budding.",
    options: [
      {
        text: '"I had a lot of fun today! I love learning more about you and all the crazy stories you have to tell."',
        nextText: 50,
      },
      {
        text: '"We should hangout again sometime, maybe see a movie or have a cute picnic."',
        nextText: 50,
      },
      {
        text: '"We should definitely play valorant tonight, or league if that is more your style."',
        nextText: 50,
      },
    ],
  },
  {
    id: 50,
    text: "\"Listen George, I had a lot of fun today too. The thing is, I don't think I am ready for a relationship, and plus this was our first outing. I don't want to lead you on, but I think it is best if we just stay friends.\"",
    options: [
      {
        text: "Continue :(",
        nextText: 39,
      },
    ],
  },
];

startGame();
