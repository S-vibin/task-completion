import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  timeLeft = 10;

  timer: ReturnType<typeof setInterval> | null = null;

  message = '';

  gameOver = false;

  completed = false;

  gameWon = false;

  private endTime = 0;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {

    this.stopTimer();

    this.timeLeft = 10;

    this.endTime = Date.now() + 10000;

    this.timer = setInterval(() => {

      const remaining = this.endTime - Date.now();

      if (remaining <= 0) {

        this.timeLeft = 0;

        this.stopTimer();

        this.timeExpired();

        return;
      }

      this.timeLeft = Math.ceil(remaining / 1000);

    }, 100);
  }

  stopTimer(): void {

    if (this.timer !== null) {

      clearInterval(this.timer);

      this.timer = null;
    }
  }

  hitButton(): void {

    if (
      this.gameOver ||
      this.completed ||
      this.gameWon
    ) {
      return;
    }

    const task = this.taskService.getCurrentTask();

    /*
      LEVEL 1
      START button
    */

    if (task.type === 'start') {

      this.completed = true;

      this.stopTimer();

      this.taskService.nextLevel();

      this.message = '';

      this.completed = false;

      this.startTimer();

      return;
    }

    /*
      DON'T PRESS TASK
    */

    if (task.type === 'dont-press') {

      this.message = '❌ WRONG! You pressed the button.';

      this.gameOver = true;

      this.stopTimer();

      return;
    }

    /*
      NORMAL PRESS TASK
    */

    if (task.type === 'press') {

      this.message = '✅ CORRECT!';

      this.completed = true;

      this.stopTimer();

      this.goToNextLevel();

      return;
    }
  }

  timeExpired(): void {

    if (
      this.gameOver ||
      this.completed ||
      this.gameWon
    ) {
      return;
    }

    const task = this.taskService.getCurrentTask();

    /*
      DON'T PRESS
      Waiting 10 seconds = correct
    */

    if (task.type === 'dont-press') {

      this.message = '✅ CORRECT! You waited.';

      this.completed = true;

      this.goToNextLevel();

      return;
    }

    /*
      PRESS TASK
      Not pressing within 10 seconds = wrong
    */

    if (task.type === 'press') {

      this.message = '⏰ TOO SLOW!';

      this.gameOver = true;

      return;
    }

    /*
      START SCREEN
    */

    if (task.type === 'start') {

      this.startTimer();
    }
  }

  goToNextLevel(): void {

    const lastLevel =
      this.taskService.tasks.length - 1;

    /*
      FINAL LEVEL COMPLETED
    */

    if (
      this.taskService.currentLevel >= lastLevel
    ) {

      this.completed = false;

      this.gameWon = true;

      this.message = '';

      this.stopTimer();

      return;
    }

    /*
      MOVE TO NEXT LEVEL
    */

    this.taskService.nextLevel();

    this.message = '';

    this.completed = false;

    this.gameOver = false;

    this.startTimer();
  }

  restartGame(): void {

    this.stopTimer();

    this.taskService.restart();

    this.timeLeft = 10;

    this.message = '';

    this.gameOver = false;

    this.completed = false;

    this.gameWon = false;

    this.startTimer();
  }

  ngOnDestroy(): void {

    this.stopTimer();
  }
}