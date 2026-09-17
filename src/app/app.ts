import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  // All state that changes from inside setTimeout callbacks is a Signal.
  // Signals update the view directly and do NOT depend on zone.js,
  // so the UI always refreshes when a level completes or time runs out.
  currentTask = signal<Task>({ question: '', type: 'start', answer: '' });
  timeLeft = signal(10);
  message = signal('');
  gameOver = signal(false);
  gameWon = signal(false);
  isCooldown = signal(false);
  levelNumber = signal(1);

  // Plain text input, bound with ngModel (native input events already
  // trigger Angular's change detection, so this doesn't need to be a signal).
  userAnswer = '';

  totalLevels = 0;
  isTimerCritical = computed(() => this.timeLeft() <= 3);

  // ---- Circular countdown ring geometry ----
  readonly ringRadius = 85;
  readonly ringCircumference = 2 * Math.PI * this.ringRadius;
  ringOffset = computed(() => this.ringCircumference * (1 - this.timeLeft() / 10));

  private timerRef: ReturnType<typeof setTimeout> | null = null;
  private cooldownRef: ReturnType<typeof setTimeout> | null = null;

  constructor(private taskService: TaskService) {
    this.totalLevels = this.taskService.getTotalLevels();
  }

  ngOnInit(): void {
    this.loadLevel();
  }

  ngOnDestroy(): void {
    this.clearGameTimer();
    this.clearCooldownTimer();
  }

  // ---------- Template helpers ----------

  /** Levels that show the circular ring + a clickable button in the middle. */
  isButtonTask(task: Task): boolean {
    return task.type === 'press' || task.type === 'dont-press' ||
           task.type === 'rule' || task.type === 'conditional';
  }

  /** Label shown on the circular button. */
  buttonLabel(task: Task): string {
    return task.type === 'rule' ? 'GOT IT' : 'HIT';
  }

  // ---------- Core level loading ----------

  private loadLevel(): void {
    const task = this.taskService.getCurrentTask();
    this.currentTask.set(task);
    this.levelNumber.set(this.taskService.getCurrentLevelNumber());
    this.userAnswer = '';
    this.message.set('');
    this.timeLeft.set(10);

    // The start screen has no timer.
    if (task.type !== 'start') {
      this.startGameTimer();
    }
  }

  // ---------- Timer management ----------

  private startGameTimer(): void {
    this.clearGameTimer();
    this.timeLeft.set(10);
    this.tick();
  }

  private tick(): void {
    this.timerRef = setTimeout(() => {
      if (this.gameOver() || this.gameWon() || this.isCooldown()) {
        return;
      }

      const next = this.timeLeft() - 1;

      if (next <= 0) {
        this.timeLeft.set(0);
        this.handleTimeUp();
      } else {
        this.timeLeft.set(next);
        this.tick();
      }
    }, 1000);
  }

  private clearGameTimer(): void {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }

  private clearCooldownTimer(): void {
    if (this.cooldownRef) {
      clearTimeout(this.cooldownRef);
      this.cooldownRef = null;
    }
  }

  private handleTimeUp(): void {
    this.clearGameTimer();

    const task = this.currentTask();

    switch (task.type) {
      case 'press':
      case 'rule':
        // Ran out of time without pressing / confirming.
        this.triggerGameOver('Your reaction failed.');
        break;
      case 'input':
        this.triggerGameOver('⏰ TIME UP!');
        break;
      case 'dont-press':
        // Surviving the timer is success for a "don't press" task.
        this.advanceAfterSuccess();
        break;
      case 'conditional':
        // If the rule said to press, running out of time is a failure.
        // If the rule said don't press, surviving the timer is success.
        if (task.correctAction === 'press') {
          this.triggerGameOver('Your reaction failed.');
        } else {
          this.advanceAfterSuccess();
        }
        break;
    }
  }

  // ---------- Player actions ----------

  onHitPress(): void {
    if (this.gameOver() || this.gameWon() || this.isCooldown()) {
      return;
    }

    const task = this.currentTask();

    if (task.type === 'press' || task.type === 'rule') {
      this.clearGameTimer();
      this.advanceAfterSuccess();
    } else if (task.type === 'dont-press') {
      this.clearGameTimer();
      this.triggerGameOver('❌ WRONG! You pressed the button.');
    } else if (task.type === 'conditional') {
      this.clearGameTimer();
      if (task.correctAction === 'press') {
        this.advanceAfterSuccess();
      } else {
        this.triggerGameOver('❌ WRONG! You broke the rule.');
      }
    }
  }

  onSubmitAnswer(): void {
    if (this.gameOver() || this.gameWon() || this.isCooldown()) {
      return;
    }

    if (this.currentTask().type !== 'input') {
      return;
    }

    this.clearGameTimer();

    const given = this.userAnswer.trim().toLowerCase();
    const expected = this.currentTask().answer.trim().toLowerCase();

    if (given === expected) {
      this.advanceAfterSuccess();
    } else {
      this.triggerGameOver('❌ WRONG ANSWER!');
    }
  }

  /** Called by the START button on the start screen. */
  onStartGame(): void {
    if (this.currentTask().type !== 'start') {
      return;
    }
    this.advanceAfterSuccess();
  }

  // ---------- Progression ----------

  private advanceAfterSuccess(): void {
    this.clearGameTimer();

    if (this.taskService.isLastLevel()) {
      this.gameWon.set(true);
      return;
    }

    this.isCooldown.set(true);
    this.message.set('');

    this.clearCooldownTimer();
    this.cooldownRef = setTimeout(() => {
      this.taskService.nextLevel();
      this.isCooldown.set(false);
      this.loadLevel();
    }, 1000);
  }

  private triggerGameOver(msg: string): void {
    this.clearGameTimer();
    this.clearCooldownTimer();
    this.isCooldown.set(false);
    this.gameOver.set(true);
    this.message.set(msg);
  }

  // ---------- Restart ----------

  restartGame(): void {
    this.clearGameTimer();
    this.clearCooldownTimer();

    this.taskService.restart();

    this.gameOver.set(false);
    this.gameWon.set(false);
    this.isCooldown.set(false);
    this.message.set('');
    this.userAnswer = '';

    this.loadLevel();
  }
}