import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  currentLevel = 0;

  tasks = [

    // LEVEL 1
    {
      level: 1,
      type: 'start',
      question: 'Ready to test your memory and reaction? Shall we begin?',
      button: 'START',
      image: ''
    },

    // LEVEL 2
    {
      level: 2,
      type: 'press',
      question: '➕ What is 5 + 7?',
      button: '12',
      image: ''
    },

    // LEVEL 3
    {
      level: 3,
      type: 'dont-press',
      question: '🔵 If the circle is BLUE, do NOT press the button.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/blue,circle'
    },

    // LEVEL 4
    {
      level: 4,
      type: 'press',
      question: '🔢 Is 11 a PRIME number?',
      button: 'YES',
      image: ''
    },

    // LEVEL 5
    {
      level: 5,
      type: 'dont-press',
      question: '🍎 You see an APPLE. Do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/apple'
    },

    // LEVEL 6
    {
      level: 6,
      type: 'press',
      question: '🐱 If you see a CAT, press the button.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/cat'
    },

    // LEVEL 7
    {
      level: 7,
      type: 'dont-press',
      question: '🚗 If you see a CAR, do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/car'
    },

    // LEVEL 8
    {
      level: 8,
      type: 'press',
      question: '🧮 8 × 7 = 56. Press the button.',
      button: 'HIT',
      image: ''
    },

    // LEVEL 9
    {
      level: 9,
      type: 'dont-press',
      question: '🔺 If the image contains a TRIANGLE, do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/triangle,shape'
    },

    // LEVEL 10
    {
      level: 10,
      type: 'press',
      question: '🧠 Remember Level 5. What fruit appeared there?',
      button: 'APPLE',
      image: ''
    },

    // LEVEL 11
    {
      level: 11,
      type: 'press',
      question: '🔢 Is 29 a PRIME number?',
      button: 'YES',
      image: ''
    },

    // LEVEL 12
    {
      level: 12,
      type: 'dont-press',
      question: '🐶 You see a DOG. Do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/dog'
    },

    // LEVEL 13
    {
      level: 13,
      type: 'press',
      question: '🧮 (10 + 5) × 2 = 30. Press.',
      button: '30',
      image: ''
    },

    // LEVEL 14
    {
      level: 14,
      type: 'dont-press',
      question: '🟡 If the object is YELLOW, do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/yellow,object'
    },

    // LEVEL 15
    {
      level: 15,
      type: 'press',
      question: '🧠 What animal appeared in Level 12?',
      button: 'DOG',
      image: ''
    },

    // LEVEL 16
    {
      level: 16,
      type: 'dont-press',
      question: '🐱 You saw a CAT earlier. If you see it again, do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/cat'
    },

    // LEVEL 17
    {
      level: 17,
      type: 'press',
      question: '🔢 37 is PRIME. Press the button.',
      button: 'HIT',
      image: ''
    },

    // LEVEL 18
    {
      level: 18,
      type: 'dont-press',
      question: '🚗 Remember Level 7. The CAR rule still applies.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/car'
    },

    // LEVEL 19
    {
      level: 19,
      type: 'press',
      question: '🧮 9 × 9 = 81. Press the button.',
      button: '81',
      image: ''
    },

    // LEVEL 20
    {
      level: 20,
      type: 'dont-press',
      question: '👻 No instructions. Think about the previous levels.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/ghost'
    },

    // LEVEL 21
    {
      level: 21,
      type: 'press',
      question: '🧠 What number was the answer in Level 2?',
      button: '12',
      image: ''
    },

    // LEVEL 22
    {
      level: 22,
      type: 'dont-press',
      question: '🍎 Remember the fruit from Level 5. If it appears again, do NOT press.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/apple'
    },

    // LEVEL 23
    {
      level: 23,
      type: 'press',
      question: '🧠 What number did you see in Level 13?',
      button: '30',
      image: ''
    },

    // LEVEL 24
    {
      level: 24,
      type: 'dont-press',
      question: '🐶 No instructions. Remember the animal from Level 12.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/dog'
    },

    // LEVEL 25
    {
      level: 25,
      type: 'press',
      question: '🧠 Level 11 asked about which PRIME number?',
      button: '29',
      image: ''
    },

    // LEVEL 26
    {
      level: 26,
      type: 'dont-press',
      question: '⚠️ No instructions. Remember the color rule from Level 14.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/yellow,object'
    },

    // LEVEL 27
    {
      level: 27,
      type: 'press',
      question: '🧠 Level 19 answer + Level 2 answer = ?',
      button: '93',
      image: ''
    },

    // LEVEL 28
    {
      level: 28,
      type: 'dont-press',
      question: '🐱🚗 Two previous objects return. Remember both rules.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/cat,car'
    },

    // LEVEL 29
    {
      level: 29,
      type: 'press',
      question: '🧠 29 + 30 + 12 = ?',
      button: '71',
      image: ''
    },

    // LEVEL 30
    {
      level: 30,
      type: 'dont-press',
      question: '💀 FINAL LEVEL — No instructions. Remember everything.',
      button: 'HIT',
      image: 'https://loremflickr.com/300/300/mystery'
    }

  ];

  getCurrentTask() {
    return this.tasks[this.currentLevel];
  }

  nextLevel() {
    if (this.currentLevel < this.tasks.length - 1) {
      this.currentLevel++;
    }
  }

  restart() {
    this.currentLevel = 0;
  }
}