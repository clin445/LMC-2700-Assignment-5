const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  if (!textNode.image == ""){
    const image = document.createElement('img');
    image.setAttribute(
      'src',
      textNode.image,
    );  
    image.setAttribute(
      'style',
      "height: 600px;",
    );  
    image.setAttribute(
      'id',
      "drawing",
    );  
    document.getElementById('draw').appendChild(image);
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)

}

const textNodes = [
  {
    id: 1,
    text: "Welcome to LoveStung! Our main protagonist is George P. Burdell, a freshman CS major starting his first year in college.",
    options: [
      {
        text: 'Continue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "It's your first day of class and because you are a freshman, you were only able to register for the 8 AM section of CS 1332 - Data Structures and Algorithms with Professor HB. You notice someone sit down next to you and as you glance over, your eyes meet. What should you say?",
    image: "classroom.png",
    options: [
      {
        text: '"This class is is going to be a piece of cake, pftttt. Especially after interning at Google during senior year LOL.',
        setState: { bad: true},
        nextText: 3
      },
      {
        text: '"Hey, what is your name?"',
        setState: { neutral: true},
        nextText: 4
      },
      {
        text: '"Hi, my name is George! I am a first year CS major, what about you?"',
        setState: { good: true},
        nextText: 4        
      },
    ]
  },
  {
    id: 3,
    text: 'The girl beside you responds, "ah okay...cool, ha.',
    options: [
      {
        text: 'Continue',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'The girl beside you responds, "Oh hey, my name is Nicole! I am a first year CS major!',
    options: [
      {
        text: 'Continue',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'You chat with Nicole, the girl next to you, for a bit longer until Professor HB starts the first lecture. Soon after the lecture ends, you see Nicole begin to leave. What do you do?',
    options: [
      {
        text: '"Have you ate yet? I am going to go to Rising Roll and check it out, wanna come?',
        requiredState: (currentState) => currentState.good,
        nextText: 6
      },
      {
        text: '"I heard Willage breakfast slaps, want to try it out with me?',
        nextText: 13
      },
      {
        text: '"Breakfast is for noobs, code for life"',
        nextText: 14
      }
    ]
  },
  {
    id: 6,
    text: '"Sure, I did not eat yet and kind of hungry too!"',
    options: [
      {
        text: 'Continue',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You and Nicole head over to Rising Roll and enjoy sandwiches over small dialogue. She asks you about your hobbies. How do you respond?',
    options: [
      {
        text: '"I like coding. Wait, scratch that. I LOVE coding. Also, League of Legends. I love League.',
        setState: { bad: true},
        setState: { good: false},
        nextText: 8
      },
      {
        text: '"I enjoy playing tennis and going out with friends (responsibly).',
        nextText: 8
      },
      {
        text: '"I love to read, cook, and watch bad rom-coms."',
        setState: { neutral: true},
        setState: { good: false},
        nextText: 8
      },
    ]
  },
  {
    id: 8,
    text: 'The two of you finish your meals and begin to get ready to leave for the next class. What do you do?',
    options: [
      {
        text: '"Hey do you want to exchange numbers, so we can study and hang out sometime again?"',
        requiredState: (currentState) => currentState.good,
        nextText: 9
      },
      {
        text: '"It was nice meeting you, I will see you around!"',
        nextText: 10
      },
      {
        text: '"Wow, Rising Roll is pretty good. We should come here again sometime."',
        nextText: 10
      }
    ]
  },
  {
    id: 9,
    text: 'She responds, "Sure! Sounds like fun. Let me know if you ever want to do something."',
    options: [
      {
        text: 'You exchange numbers',
        setState: { nicoleNumber: true},
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'The two of you head your separate ways. You head to your next class, MATH 1554 - Linear Algebra.',
    options: [
      {
        text: 'continue',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You arrive to your class 5 minutes late and enter the packed lecture hall. You get a phone call from Isabell, your childhood friend that is a sophomore CS major at Georgia Tech while the professor has already jumped into the lecture material. What do you do? ',
    options: [
      {
        text: 'You pick up the phone',
        setState: { answerPhone: true}, 
        nextText: 12
      },
      {
        text: 'You reject the call - you were already late to class and you do not want to fall behind',
        nextText: 20
      },

    ]
  },
  {
    id: 12,
    text: 'You exit the lecture hall to pick up the phone. "Hey George, I have to show you around campus sometime! Do you want hangout at tech square with me on Saturday?" Isabell asks. ',
    options: [
      {
        text: '"Aw Isabell, I would really like that, but I do not believe that I have time on Saturday," you reply. She says she understands and you quickly hang up and go back to the lecture.',
        nextText: -1
      },
      {
        text: '"Sure, I would love to hang out again! I do not know the area well, so I will be counting on you to lead the way!" you reply. Isabell suggests that you should also invite your roommate Jerry and the two of you spend the rest of the class making plans and catching up.',
        nextText: -1
      },

    ]
  },
  {
    id: 13,
    text: 'Nicole gives you an unsure look and says "I think I will pass on that offer, maybe some other time". ',
    options: [
      {
        text: '"Alright, maybe some other time!" You decide to go to Willage without her.',
        nextText: 14
      },

    ]
  }, 
  {
    id: 14,
    text: 'You head to Willage on your own. You grab food and as you find seating, you see your roommate Jerry eating alone and decide to sit with him. What do you say to him? ',
    options: [
      {
        text: '"Hey man, how are you feeling about your first day on campus?"',
        setState: { niceRoommate: true},
        setState: {badRoommate: false},
        nextText: 15
      },
      {
        text: '"Ugh, 8 AM classes are the worst. I am just so glad that the breakfast food here is good."',
        setState: { niceRoommate: true},
        setState: {badRoommate: false},
        nextText: 15
      },
      {
        text: 'Say nothing and just eat - you are famished after that intense CS 1332 lecture.',
        setState: {badRoommate: true},
        setState: { niceRoommate: false},
        nextText: 15
      },


    ]
  },

  {
    id: 15,
    text: '"Well, I-" before he can even begin to ramble about what he thinks, Isabell, your childhood friend, suddenly appears and plops herself next to you and Jerry, inviting herself to eat with the two of you. Jerry looks visibly surprised that such a cool person knows you. What do you do?',
    options: [
      {
        text: ' You decide to introduce them to one another, saying "Oh, this is Isabell, my childhood friend. Isabell, this is Jerry, my roommate."',
        setState: {niceRoommate: true},
        setState: {badRoommate: true},
        nextText: 16
      },
      {
        text: ' You go ahead and greet Isabell and ignore Jerry and his confused look. "Hey Isabell, I did not expect you to come here and eat breakfast," you say warmly.',
        setState: {niceRoommate: false},
        setState: {badRoommate: true},
        nextText: 16
      },
      {
        text: 'Say nothing and just eat - you are famished after that intense CS 1332 lecture.',
        setState: {niceRoommate: false},
        setState: {badRoommate: true},
        nextText: 16
      },


    ]
  },
  {
    id: 16,
    text: ' The three of you ease into the conversation. You had a great time catching up with Isabell since the two of you were unable to meet up during the summer break. you lose track of time and realize that you have to go to your next class, MATH 1554 - Linear Algebra. You tell them you have to leave for class and Jerry tags along with you since he also has a class at that time.',
    options: [
      {
        text: ' continue',
        requiredState: (currentState) => currentState.niceRoommate,
        nextText: 17
      },
      {
        text: ' continue',
        requiredState: (currentState) => currentState.badRoommate,
        nextText: 18
      },

    ]
  },
  {
    id: 17,
    text: ' Jerry says, "Hey, if you ever need a wingman, you can ask me. I gotchu." You look very confused at what he is suggesting, but he walks in the other direction before you can respond.',
    options: [
      {
        text: ' "What?" you try to ask him what he means by that.',
        nextText: 19
      },
      {
        text: ' "Thanks?" you say, unsure of what he means.',
        nextText: 19
      }


    ]
  },
  {
    id: 18,
    text: ' Jerry asks, " How come you have never said anything about her? She is so cool, is she single?"',
    options: [
      {
        text: ' "uhh",  you begin to think if she is single or not.',
        nextText: 19
      },
      {
        text: ' "Wha-" you try to comprehend the situation at hand',
        nextText: 19
      }


    ]
  },
  {
    id: 19,
    text: ' Jerry walks away before you can get a single word out.',
    options: [
      {
        text: ' continue',
        nextText: 11
      }


    ]
  },
  {
    id: 20,
    text: ' You pay attention to the lecure but it is kind of boring so you struggle to keep awake during class. The girl nexts to you hides her chuckle poorly as she watches you fight for your life to stay awake. "Sorry," she whispers to you, "I couldn\'t help but to laugh at someone sleeping on the first day." How do you respond?',
    options: [
      {
        text: '"Right, because the syllabus is just that important," you jab back, more lucid.',
        nextText: 21
      },
      {
        text: 'You jerk your head up, instantly more awake and slightly embaressed.',
        nextText: 22
      },
      {
        text: '"Ahaha... it\'s been a kind of rough day already," you say even though you are barely half way through your day.',
        nextText: 21
      }
    ]
  },
  {
    id: 21,
    text: ' She chuckles at your comeback, "I\'m Jennifer, a second year CS student. I\'m guessing you\'re a freshie?"',
    options: [
      {
        text: '"Hah," you scoff, "as if I\'d tell you."',
        setState: {goodJen: true},
        nextText: 22
      },
      {
        text: '"Yeah, I\'m George, a first year CS student."',
        nextText: 22
      }
    ]
  },
  {
    id: 22,
    text: ' The professor announced that class would be let out early today. You notice that you have a text notification from Isabell. "Guess, you can finally get your beauty sleep," she says with a coy smile. How do you respond?',
    options: [
      {
        text: 'You don\'t look at her and quickly bolt out of that class - Isabell finally texted you first!',
        nextText: 24
      },
      {
        text: '"It\'s just subliminal learning," you retort back with an eyeroll.',
        requiredState: (currentState) => currentState.goodJen,
        nextText: 23
      },
      {
        text: '"uh.. ok?" you say, feeling slightly offended that she is implying that you are not beautiful.',
        nextText: 24
      }
    ]
  },
  {
    id: 23,
    text: ' "Yeah, yeah, trust me I\'ve tried that and it has NOT worked well," she replies, "so if you ever need help, call me sometime." She hands you her number. How do you respond?',
    options: [
      {
        text: 'You quickly put her number in her phone and text her your name, since you didn\'t give it to her earlier.',
        setState: {jenNumber: true},
        nextText: 24
      },
      {
        text: '"Skill gap," you respond before the two of you part ways. You save her number in your phone.',
        setState: {jenNumber: true},
        nextText: 24
      },
      {
        text: '"EEEEEEEEEEEEEEEEK," you shriek a little too loudly. You can\'t control your exictement since this is the first time that someone gave you their number.',
        setState: {jenNumber: true},
        setState: {goodJen: false},
        nextText: 24
      }
    ]
  },
  {
    id: 24,
    text: ' You open your texts to see: "Hey George! It\'s been a while, but we should hangout this weekend! You can bring your roommate too if he wants to come with us :) \n How do you respond?"',
    options: [
      {
        text: '"Hey Isabell! I would love to hangout this weekend. I haven\'t seen you since the summer. I\'ll make sure to tell Jerry and let him know :D"',
        nextText: -1
      },
      {
        text: '"Awww, I would love to, but I already have plans made. Let\'s hangout some other time!"',
        nextText: -1
      }
    ]
  }
]

startGame()