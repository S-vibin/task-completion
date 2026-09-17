import { Injectable } from '@angular/core';

export interface Task {
  question: string;
  type: 'start' | 'press' | 'dont-press' | 'input' | 'rule' | 'conditional';
  answer: string;
  buttonColor?: 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'white';
  /** Large centered word/number shown for 'conditional' levels (the thing the rule applies to). */
  stimulus?: string;
  /** For 'conditional' levels: the correct action once the earlier rule is applied. */
  correctAction?: 'press' | 'dont-press';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private currentLevel = 1;

  private tasks: Task[] = [
    // LEVEL 1
    {
      question: 'Ready to test your memory and reaction? Shall we begin?',
      type: 'start',
      answer: ''
    },
    // LEVEL 2
    {
      question: 'What is 5 + 7?',
      type: 'input',
      answer: '12'
    },
    // LEVEL 3
    {
      question: 'DO NOT PRESS the BLUE button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'blue'
    },
    // LEVEL 4
    {
      question: 'PRESS the GREEN button!',
      type: 'press',
      answer: '',
      buttonColor: 'green'
    },
    // LEVEL 5
    {
      question: 'What is 10 + 15?',
      type: 'input',
      answer: '25'
    },
    // LEVEL 6
    {
      question: 'PRESS the RED button!',
      type: 'press',
      answer: '',
      buttonColor: 'red'
    },
    // LEVEL 7
    {
      question: 'DO NOT PRESS the YELLOW button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'yellow'
    },
    // LEVEL 8 — teaches RULE #1
    {
      question: 'RULE #1: If you see a RAT, DO NOT press the button. For any OTHER animal, PRESS it! Memorize this rule...',
      type: 'rule',
      answer: '',
      buttonColor: 'blue'
    },
    // LEVEL 9 — tests RULE #1
    {
      question: 'An animal appears! Apply RULE #1 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '🐶 DOG',
      correctAction: 'press'
    },
    // LEVEL 10
    {
      question: 'What was your answer in Level 2?',
      type: 'input',
      answer: '12'
    },
    // LEVEL 11
    {
      question: 'Is 29 a PRIME number? Type YES or NO.',
      type: 'input',
      answer: 'yes'
    },
    // LEVEL 12 — tests RULE #1
    {
      question: 'An animal appears! Apply RULE #1 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '🐀 RAT',
      correctAction: 'dont-press'
    },
    // LEVEL 13
    {
      question: 'What is (10 + 5) × 2?',
      type: 'input',
      answer: '30'
    },
    // LEVEL 14
    {
      question: 'DO NOT PRESS the PURPLE button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'purple'
    },
    // LEVEL 15 — memory callback to Level 12's stimulus
    {
      question: 'What animal appeared in Level 12? Type the answer.',
      type: 'input',
      answer: 'rat'
    },
    // LEVEL 16 — teaches RULE #2
    {
      question: 'RULE #2: If the number shown is a PRIME number, DO NOT press. If it is NOT prime, PRESS it!',
      type: 'rule',
      answer: '',
      buttonColor: 'blue'
    },
    // LEVEL 17 — tests RULE #2 (14 is not prime)
    {
      question: 'A number appears! Apply RULE #2 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '14',
      correctAction: 'press'
    },
    // LEVEL 18
    {
      question: 'DO NOT PRESS the YELLOW button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'yellow'
    },
    // LEVEL 19
    {
      question: 'What is 9 × 9?',
      type: 'input',
      answer: '81'
    },
    // LEVEL 20 — tests RULE #2 (17 is prime)
    {
      question: 'A number appears! Apply RULE #2 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '17',
      correctAction: 'dont-press'
    },
    // LEVEL 21
    {
      question: 'What was your answer in Level 2?',
      type: 'input',
      answer: '12'
    },
    // LEVEL 22
    {
      question: 'DO NOT PRESS the YELLOW button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'yellow'
    },
    // LEVEL 23
    {
      question: 'What was your answer in Level 13?',
      type: 'input',
      answer: '30'
    },
    // LEVEL 24 — tests RULE #1 again, further apart
    {
      question: 'An animal appears! Apply RULE #1 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '🐱 CAT',
      correctAction: 'press'
    },
    // LEVEL 25 — memory callback to Level 20's stimulus
    {
      question: 'What number appeared in Level 20?',
      type: 'input',
      answer: '17'
    },
    // LEVEL 26
    {
      question: 'DO NOT PRESS the YELLOW button.',
      type: 'dont-press',
      answer: '',
      buttonColor: 'yellow'
    },
    // LEVEL 27
    {
      question: 'What is your Level 19 answer + your Level 2 answer?',
      type: 'input',
      answer: '93'
    },
    // LEVEL 28 — final RULE #1 test, right before the end
    {
      question: 'An animal appears! Apply RULE #1 — what do you do?',
      type: 'conditional',
      answer: '',
      buttonColor: 'white',
      stimulus: '🐀 RAT',
      correctAction: 'dont-press'
    },
    // LEVEL 29
    {
      question: 'What is 29 + 30 + 12?',
      type: 'input',
      answer: '71'
    },
    // LEVEL 30
    {
      question: 'DO NOT PRESS the RED button. Survive the final challenge!',
      type: 'dont-press',
      answer: '',
      buttonColor: 'red'
    }
  ];

  /** Total number of levels in the game. */
  getTotalLevels(): number {
    return this.tasks.length;
  }

  /** The current level number (1-based). */
  getCurrentLevelNumber(): number {
    return this.currentLevel;
  }

  /** Returns the Task object for the current level. */
  getCurrentTask(): Task {
    return this.tasks[this.currentLevel - 1];
  }

  /** True if the current level is the final level. */
  isLastLevel(): boolean {
    return this.currentLevel === this.tasks.length;
  }

  /**
   * Advances to the next level, if one exists.
   * Returns the new current task.
   */
  nextLevel(): Task {
    if (this.currentLevel < this.tasks.length) {
      this.currentLevel++;
    }
    return this.getCurrentTask();
  }

  /** Resets the game back to level 1 (the start screen). */
  restart(): void {
    this.currentLevel = 1;
  }
}