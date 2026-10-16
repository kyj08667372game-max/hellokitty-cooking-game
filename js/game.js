/**
 * 「헬로키티의 달콤한 주방」 - 메인 게임 컨트롤러
 * 8종 요리 & 랜덤 손님/랜덤 주문 시스템 적용
 */

import { RECIPES, INGREDIENTS, CHARACTERS, GAME_CONFIG } from './data.js';
import { soundManager } from './audio.js';
import { ParticleSystem } from './particles.js';
import { SVG_FALLBACKS } from './fallbacks.js';

class HelloKittyCookingGame {
  constructor() {
    this.gameState = 'START';
    this.score = 0;
    this.remainingTime = GAME_CONFIG.TOTAL_TIME;
    this.customerIndex = 0;
    this.successfulOrders = 0;

    // 랜덤 라운드 데이터
    this.roundGuests = [];
    this.roundRecipes = [];

    this.currentGuest = null;
    this.currentRecipe = null;
    this.orderStartTime = 0;
    this.selectedIngredients = new Set();

    this.gameTimerId = null;
    this.gameStartTime = null;
    this.gameTimeDuration = GAME_CONFIG.TOTAL_TIME * 1000;

    this.cookTimerId = null;
    this.cookStartTime = null;
    this.cookDuration = 0;

    this.burnTimerId = null;
    this.burnStartTime = null;
    this.burnDuration = GAME_CONFIG.BURN_TIME_LIMIT * 1000;

    this.isServingProcessed = false;

    this.initDOMElements();
    this.particles = new ParticleSystem(this.dom.gameScreen);
    this.bindEvents();
    this.renderRecipeBookModal();
    this.renderStartScreenPreviews();
    this.showScreen('start');
  }

  initDOMElements() {
    this.dom = {
      startScreen: document.getElementById('start-screen'),
      gameScreen: document.getElementById('game-screen'),
      resultScreen: document.getElementById('result-screen'),

      btnStartGame: document.getElementById('btn-start-game'),
      btnHowToPlay: document.getElementById('btn-how-to-play'),
      modalHowToPlay: document.getElementById('modal-how-to-play'),
      btnCloseModal: document.getElementById('btn-close-modal'),

      btnRecipeBook: document.getElementById('btn-recipe-book'),
      modalRecipeBook: document.getElementById('modal-recipe-book'),
      btnCloseRecipeBook: document.getElementById('btn-close-recipe-book'),
      recipeBookList: document.getElementById('recipe-book-list'),
      previewDishesContainer: document.getElementById('preview-dishes-container'),

      timerText: document.getElementById('timer-text'),
      timerBar: document.getElementById('timer-gauge-fill'),
      scoreText: document.getElementById('score-text'),
      customerBadge: document.getElementById('customer-progress-badge'),
      btnSoundToggle: document.getElementById('btn-sound-toggle'),

      guestAvatar: document.getElementById('guest-avatar'),
      guestName: document.getElementById('guest-name'),
      speechBubble: document.getElementById('guest-speech-bubble'),
      chefAvatar: document.getElementById('chef-avatar'),
      chefActionLabel: document.getElementById('chef-action-label'),

      stoveDisplay: document.getElementById('stove-display'),
      stoveDishImage: document.getElementById('stove-dish-image'),
      stoveStatusText: document.getElementById('stove-status-text'),
      cookProgressContainer: document.getElementById('cook-progress-container'),
      cookProgressBar: document.getElementById('cook-progress-bar'),
      cookProgressLabel: document.getElementById('cook-progress-label'),
      burnProgressContainer: document.getElementById('burn-progress-container'),
      burnProgressBar: document.getElementById('burn-progress-bar'),
      burnProgressLabel: document.getElementById('burn-progress-label'),

      ingredientsGrid: document.getElementById('ingredients-grid'),
      selectedTray: document.getElementById('selected-tray'),
      btnResetIngredients: document.getElementById('btn-reset-ingredients'),
      btnCook: document.getElementById('btn-cook'),
      btnServe: document.getElementById('btn-serve'),
      btnCookAgain: document.getElementById('btn-cook-again'),

      resultTitle: document.getElementById('result-title'),
      resultSubtext: document.getElementById('result-subtext'),
      resultFinalScore: document.getElementById('result-final-score'),
      resultOrdersCount: document.getElementById('result-orders-count'),
      resultStars: document.getElementById('result-stars'),
      resultCelebration: document.getElementById('result-celebration'),
      btnRestartGame: document.getElementById('btn-restart-game'),
    };
  }

  bindEvents() {
    this.dom.btnStartGame.addEventListener('click', () => {
      soundManager.playClick();
      this.startGame();
    });

    this.dom.btnHowToPlay.addEventListener('click', () => {
      soundManager.playClick();
      this.dom.modalHowToPlay.classList.remove('hidden');
    });

    this.dom.btnCloseModal.addEventListener('click', () => {
      soundManager.playClick();
      this.dom.modalHowToPlay.classList.add('hidden');
    });

    if (this.dom.btnRecipeBook) {
      this.dom.btnRecipeBook.addEventListener('click', () => {
        soundManager.playClick();
        this.dom.modalRecipeBook.classList.remove('hidden');
      });
    }

    if (this.dom.btnCloseRecipeBook) {
      this.dom.btnCloseRecipeBook.addEventListener('click', () => {
        soundManager.playClick();
        this.dom.modalRecipeBook.classList.add('hidden');
      });
    }

    this.dom.btnSoundToggle.addEventListener('click', () => {
      const isMuted = soundManager.toggleMute();
      this.dom.btnSoundToggle.textContent = isMuted ? '🔇' : '🔊';
      this.dom.btnSoundToggle.classList.toggle('muted', isMuted);
    });

    this.dom.btnResetIngredients.addEventListener('click', () => {
      if (this.gameState === 'COOKING') return;
      soundManager.playCancel();
      this.clearSelectedIngredients();
    });

    this.dom.btnCook.addEventListener('click', () => {
      if (this.gameState !== 'ORDERING') return;
      this.handleStartCooking();
    });

    this.dom.btnServe.addEventListener('click', () => {
      if (this.gameState !== 'READY') return;
      this.handleServe();
    });

    this.dom.btnCookAgain.addEventListener('click', () => {
      if (this.gameState !== 'BURNT') return;
      soundManager.playClick();
      this.resetStoveForRetry();
    });

    this.dom.btnRestartGame.addEventListener('click', () => {
      soundManager.playClick();
      this.startGame();
    });

    window.addEventListener('click', () => {
      soundManager.init();
    }, { once: true });
  }

  renderStartScreenPreviews() {
    if (!this.dom.previewDishesContainer) return;
    this.dom.previewDishesContainer.innerHTML = '';
    
    Object.values(RECIPES).forEach(recipe => {
      const ingNames = recipe.ingredients.map(id => {
        const item = INGREDIENTS.find(i => i.id === id);
        return item ? item.name : id;
      }).join('+');

      const el = document.createElement('div');
      el.className = 'dish-badge';
      el.innerHTML = `<span>${recipe.emoji} <strong>${recipe.name}</strong></span> <span class="ing-hint">(${ingNames} ⏱️${recipe.cookTime}s)</span>`;
      this.dom.previewDishesContainer.appendChild(el);
    });
  }

  renderRecipeBookModal() {
    if (!this.dom.recipeBookList) return;
    this.dom.recipeBookList.innerHTML = '';

    Object.values(RECIPES).forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-book-card';

      const ingTags = recipe.ingredients.map(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return ing ? `<span class="rec-ing-chip">${ing.emoji} ${ing.name}</span>` : id;
      }).join(' + ');

      card.innerHTML = `
        <div class="rec-card-header">
          <span class="rec-card-title">${recipe.emoji} ${recipe.name}</span>
          <span class="rec-card-time">⏱️ 조리 ${recipe.cookTime}초</span>
        </div>
        <div class="rec-card-ingredients">${ingTags}</div>
        <p class="rec-card-desc">${recipe.description}</p>
      `;

      this.dom.recipeBookList.appendChild(card);
    });
  }

  showScreen(screen) {
    this.dom.startScreen.classList.toggle('hidden', screen !== 'start');
    this.dom.gameScreen.classList.toggle('hidden', screen !== 'game');
    this.dom.resultScreen.classList.toggle('hidden', screen !== 'result');
  }

  // --- 게임 시작 및 3명 랜덤 손님/주문 편성 ---
  startGame() {
    this.stopAllTimers();

    this.gameState = 'ORDERING';
    this.score = 0;
    this.remainingTime = GAME_CONFIG.TOTAL_TIME;
    this.customerIndex = 0;
    this.successfulOrders = 0;
    this.isServingProcessed = false;

    // 1) 랜덤 손님 3명 무작위 추첨 (중복 없이 3명 선택)
    const shuffledGuests = [...CHARACTERS.guests].sort(() => 0.5 - Math.random());
    this.roundGuests = shuffledGuests.slice(0, GAME_CONFIG.MAX_CUSTOMERS);

    // 2) 랜덤 요리 3종 무작위 추첨 (8가지 요리 중 매 라운드 중복 없이 3가지 선택)
    const recipeKeys = Object.keys(RECIPES);
    const shuffledRecipes = [...recipeKeys].sort(() => 0.5 - Math.random());
    this.roundRecipes = shuffledRecipes.slice(0, GAME_CONFIG.MAX_CUSTOMERS).map(k => RECIPES[k]);

    this.updateHUD();
    this.updateTimerDisplay(60, 100);

    this.renderIngredientsGrid();
    this.clearSelectedIngredients();
    this.renderChef();

    this.showScreen('game');

    this.start60sTimer();
    this.spawnNextCustomer();
  }

  start60sTimer() {
    this.gameStartTime = performance.now();
    this.gameTimeDuration = GAME_CONFIG.TOTAL_TIME * 1000;

    const tick = () => {
      if (this.gameState === 'CLEAR' || this.gameState === 'GAMEOVER') {
        return;
      }

      const elapsed = performance.now() - this.gameStartTime;
      const timeLeftMs = Math.max(0, this.gameTimeDuration - elapsed);
      const remainingSec = Math.ceil(timeLeftMs / 1000);
      const percentage = (timeLeftMs / this.gameTimeDuration) * 100;

      this.remainingTime = remainingSec;
      this.updateTimerDisplay(remainingSec, percentage);

      if (timeLeftMs <= 0) {
        this.handleTimeUp();
        return;
      }

      this.gameTimerId = requestAnimationFrame(tick);
    };

    if (this.gameTimerId) cancelAnimationFrame(this.gameTimerId);
    this.gameTimerId = requestAnimationFrame(tick);
  }

  updateTimerDisplay(seconds, percentage) {
    const formatted = `00:${String(seconds).padStart(2, '0')}`;
    this.dom.timerText.textContent = formatted;
    this.dom.timerBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;

    this.dom.timerText.classList.remove('timer-pink', 'timer-orange', 'timer-red', 'timer-blink');
    this.dom.timerBar.classList.remove('bar-pink', 'bar-orange', 'bar-red');

    if (seconds > 30) {
      this.dom.timerText.classList.add('timer-pink');
      this.dom.timerBar.classList.add('bar-pink');
    } else if (seconds > 10) {
      this.dom.timerText.classList.add('timer-orange');
      this.dom.timerBar.classList.add('bar-orange');
    } else {
      this.dom.timerText.classList.add('timer-red', 'timer-blink');
      this.dom.timerBar.classList.add('bar-red');
    }
  }

  spawnNextCustomer() {
    if (this.customerIndex >= GAME_CONFIG.MAX_CUSTOMERS) {
      this.handleGameClear();
      return;
    }

    this.gameState = 'ORDERING';
    this.isServingProcessed = false;
    this.clearSelectedIngredients();
    this.resetStoveDisplay();

    // 랜덤으로 정해진 손님과 요리
    this.currentGuest = this.roundGuests[this.customerIndex];
    this.currentRecipe = this.roundRecipes[this.customerIndex];
    this.orderStartTime = performance.now();

    const orderSpeech = this.currentGuest.dialogueTemplates
      ? this.currentGuest.dialogueTemplates.order(this.currentRecipe)
      : `맛있는 ${this.currentRecipe.name}을 부탁해! 💕`;

    this.dom.guestName.textContent = this.currentGuest.name;
    this.dom.speechBubble.innerHTML = `
      <div class="speech-quote">${orderSpeech}</div>
      <div class="speech-order-badge">
        <span class="recipe-tag">${this.currentRecipe.emoji} ${this.currentRecipe.name}</span>
        <span class="time-tag">⏱️ 조리 ${this.currentRecipe.cookTime}초</span>
      </div>
    `;

    this.renderGuestAvatar(this.currentGuest);
    this.dom.customerBadge.textContent = `손님 ${this.customerIndex + 1} / ${GAME_CONFIG.MAX_CUSTOMERS}`;

    this.dom.guestAvatar.classList.remove('guest-enter', 'guest-happy');
    void this.dom.guestAvatar.offsetWidth;
    this.dom.guestAvatar.classList.add('guest-enter');

    this.dom.chefActionLabel.textContent = '주문 대기 중... 🎀';
    this.updateActionButtons();
  }

  renderGuestAvatar(guest) {
    this.dom.guestAvatar.innerHTML = '';
    const img = document.createElement('img');
    img.src = guest.image;
    img.alt = guest.name;
    img.className = 'character-img';
    img.onerror = () => {
      this.dom.guestAvatar.innerHTML = SVG_FALLBACKS[guest.svgFallback] || '';
    };
    this.dom.guestAvatar.appendChild(img);
  }

  renderChef() {
    this.dom.chefAvatar.innerHTML = '';
    const img = document.createElement('img');
    img.src = CHARACTERS.chef.image;
    img.alt = CHARACTERS.chef.name;
    img.className = 'chef-img';
    img.onerror = () => {
      this.dom.chefAvatar.innerHTML = SVG_FALLBACKS.hello_kitty;
    };
    this.dom.chefAvatar.appendChild(img);
  }

  renderIngredientsGrid() {
    this.dom.ingredientsGrid.innerHTML = '';

    INGREDIENTS.forEach((ing, index) => {
      const btn = document.createElement('button');
      btn.className = 'ingredient-btn';
      btn.dataset.id = ing.id;
      btn.innerHTML = `
        <span class="ing-emoji">${ing.emoji}</span>
        <span class="ing-name">${ing.name}</span>
      `;

      btn.addEventListener('click', () => {
        if (this.gameState !== 'ORDERING') return;
        this.toggleIngredient(ing.id, index);
      });

      this.dom.ingredientsGrid.appendChild(btn);
    });
  }

  toggleIngredient(ingId, index) {
    if (this.selectedIngredients.has(ingId)) {
      this.selectedIngredients.delete(ingId);
      soundManager.playCancel();
    } else {
      this.selectedIngredients.add(ingId);
      soundManager.playSelect(index);
    }
    this.updateIngredientUI();
  }

  updateIngredientUI() {
    const buttons = this.dom.ingredientsGrid.querySelectorAll('.ingredient-btn');
    buttons.forEach(btn => {
      const id = btn.dataset.id;
      btn.classList.toggle('selected', this.selectedIngredients.has(id));
    });

    this.dom.selectedTray.innerHTML = '';
    if (this.selectedIngredients.size === 0) {
      this.dom.selectedTray.innerHTML = `<span class="empty-tray-tip">재료를 클릭하여 올려놓으세요 ✨</span>`;
    } else {
      this.selectedIngredients.forEach(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        if (!ing) return;
        const chip = document.createElement('span');
        chip.className = 'selected-chip';
        chip.innerHTML = `${ing.emoji} ${ing.name} <button class="btn-remove-chip" aria-label="제거">×</button>`;

        chip.querySelector('.btn-remove-chip').addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.gameState !== 'ORDERING') return;
          this.selectedIngredients.delete(id);
          soundManager.playCancel();
          this.updateIngredientUI();
        });

        this.dom.selectedTray.appendChild(chip);
      });
    }

    this.updateActionButtons();
  }

  clearSelectedIngredients() {
    this.selectedIngredients.clear();
    this.updateIngredientUI();
  }

  handleStartCooking() {
    if (!this.currentRecipe) return;

    const recipeIngredients = [...this.currentRecipe.ingredients].sort();
    const userIngredients = [...this.selectedIngredients].sort();

    const isMatch = (
      recipeIngredients.length === userIngredients.length &&
      recipeIngredients.every((val, idx) => val === userIngredients[idx])
    );

    if (!isMatch) {
      soundManager.playError();
      this.updateScore(-GAME_CONFIG.SCORES.WRONG_RECIPE_PENALTY, '잘못된 재료 조합! (-20점)', this.dom.btnCook);
      this.flashStoveError('앗! 재료 조합이 틀렸어요. 레시피를 다시 확인해줘요! 💦');
      return;
    }

    this.gameState = 'COOKING';
    soundManager.startCookingSound();

    this.dom.stoveStatusText.textContent = `${this.currentRecipe.name} 요리 중... 보글보글!`;
    this.dom.chefActionLabel.textContent = '열심히 요리하는 중! 🍳✨';
    this.dom.chefAvatar.classList.add('chef-cooking');

    this.dom.cookProgressContainer.classList.remove('hidden');
    this.dom.cookProgressBar.style.width = '0%';
    this.dom.cookProgressLabel.textContent = `0.0 / ${this.currentRecipe.cookTime}초`;

    this.updateActionButtons();

    this.cookStartTime = performance.now();
    this.cookDuration = this.currentRecipe.cookTime * 1000;

    const cookTick = () => {
      if (this.gameState !== 'COOKING') return;

      const elapsed = performance.now() - this.cookStartTime;
      const progress = Math.min(1, elapsed / this.cookDuration);
      const remainingSec = Math.max(0, (this.cookDuration - elapsed) / 1000).toFixed(1);

      this.dom.cookProgressBar.style.width = `${progress * 100}%`;
      this.dom.cookProgressLabel.textContent = `남은 조리 시간: ${remainingSec}초`;

      if (progress >= 1) {
        this.handleCookingComplete();
        return;
      }

      this.cookTimerId = requestAnimationFrame(cookTick);
    };

    if (this.cookTimerId) cancelAnimationFrame(this.cookTimerId);
    this.cookTimerId = requestAnimationFrame(cookTick);
  }

  handleCookingComplete() {
    soundManager.stopCookingSound();
    soundManager.playDishReady();

    this.gameState = 'READY';
    this.dom.chefAvatar.classList.remove('chef-cooking');
    this.dom.chefActionLabel.textContent = '요리 완성! 어서 서빙하세요! 💖';

    this.dom.cookProgressContainer.classList.add('hidden');

    this.renderStoveDish(this.currentRecipe);
    this.dom.stoveStatusText.innerHTML = `✨ <strong>${this.currentRecipe.name}</strong> 완성! 타기 전에 서빙하세요! ✨`;

    const rect = this.dom.stoveDisplay.getBoundingClientRect();
    this.particles.burstHeartsAndStars(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);

    this.updateActionButtons();
    this.startBurnCountdown();
  }

  startBurnCountdown() {
    this.burnStartTime = performance.now();
    this.burnDuration = GAME_CONFIG.BURN_TIME_LIMIT * 1000;

    this.dom.burnProgressContainer.classList.remove('hidden');
    this.dom.burnProgressBar.style.width = '100%';

    const burnTick = () => {
      if (this.gameState !== 'READY') return;

      const elapsed = performance.now() - this.burnStartTime;
      const timeLeft = Math.max(0, this.burnDuration - elapsed);
      const ratio = timeLeft / this.burnDuration;
      const secLeft = (timeLeft / 1000).toFixed(1);

      this.dom.burnProgressBar.style.width = `${ratio * 100}%`;
      this.dom.burnProgressLabel.textContent = `🔥 ${secLeft}초 후 요리가 타버려요!`;

      if (timeLeft <= 0) {
        this.handleDishBurned();
        return;
      }

      this.burnTimerId = requestAnimationFrame(burnTick);
    };

    if (this.burnTimerId) cancelAnimationFrame(this.burnTimerId);
    this.burnTimerId = requestAnimationFrame(burnTick);
  }

  handleDishBurned() {
    this.gameState = 'BURNT';
    soundManager.playBurn();

    this.updateScore(-GAME_CONFIG.SCORES.BURN_PENALTY, '요리가 타버렸어요! (-30점)', this.dom.stoveDisplay);

    const rect = this.dom.stoveDisplay.getBoundingClientRect();
    this.particles.spawnSmoke(rect.left + rect.width / 2, rect.top + 40, 10);

    this.renderStoveDish({ id: 'burnt', name: '탄 요리', image: 'public/images/dishes/burnt_dish.png', svgFallback: 'burnt_dish' });
    this.dom.stoveStatusText.innerHTML = `⚠️ <strong>새까맣게 타버렸어요!</strong> 다시 요리해야 해요. 💨`;
    this.dom.burnProgressContainer.classList.add('hidden');
    this.dom.chefActionLabel.textContent = '아이쿠! 요리가 타버렸어요 😿';

    this.updateActionButtons();
  }

  resetStoveForRetry() {
    this.gameState = 'ORDERING';
    this.resetStoveDisplay();
    this.clearSelectedIngredients();
    this.dom.chefActionLabel.textContent = '다시 정성껏 만들어봐요! 🎀';
    this.updateActionButtons();
  }

  handleServe() {
    if (this.gameState !== 'READY') return;
    if (this.isServingProcessed) return;
    this.isServingProcessed = true;

    if (this.burnTimerId) {
      cancelAnimationFrame(this.burnTimerId);
      this.burnTimerId = null;
    }
    this.dom.burnProgressContainer.classList.add('hidden');

    soundManager.playServeSuccess();

    const elapsedSinceOrder = (performance.now() - this.orderStartTime) / 1000;
    const fastBonus = Math.max(10, Math.min(GAME_CONFIG.SCORES.MAX_FAST_SERVE_BONUS, Math.round(60 - elapsedSinceOrder * 2.5)));
    const perfectBonus = GAME_CONFIG.SCORES.PERFECT_COOK;
    const totalGain = GAME_CONFIG.SCORES.CORRECT_SERVE + fastBonus + perfectBonus;

    this.updateScore(totalGain, `성공! +${totalGain}점`, this.dom.btnServe);

    const happySpeech = this.currentGuest.dialogueTemplates
      ? this.currentGuest.dialogueTemplates.happy(this.currentRecipe)
      : `정말 맛있어! 고마워 키티야~ 💕`;

    this.dom.guestAvatar.classList.remove('guest-enter');
    this.dom.guestAvatar.classList.add('guest-happy');
    this.dom.speechBubble.innerHTML = `
      <div class="speech-quote happy">${happySpeech}</div>
      <div class="speech-score-tag">💖 만족도 최고! (+${totalGain}점)</div>
    `;

    const guestRect = this.dom.guestAvatar.getBoundingClientRect();
    this.particles.burstHeartsAndStars(guestRect.left + guestRect.width / 2, guestRect.top + guestRect.height / 2, 22);

    this.successfulOrders++;
    this.dom.chefActionLabel.textContent = '손님이 아주 좋아해요! 💕';

    setTimeout(() => {
      if (this.gameState === 'GAMEOVER') return;
      this.customerIndex++;
      this.spawnNextCustomer();
    }, 1800);
  }

  updateScore(delta, reason, sourceElement = null) {
    this.score = Math.max(0, this.score + delta);
    this.dom.scoreText.textContent = `${this.score}점`;

    this.dom.scoreText.classList.remove('score-pulse');
    void this.dom.scoreText.offsetWidth;
    this.dom.scoreText.classList.add('score-pulse');

    if (sourceElement) {
      const rect = sourceElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      const type = delta > 0 ? 'bonus' : 'penalty';
      const prefix = delta > 0 ? `+${delta}` : `${delta}`;
      this.particles.spawnFloatingText(`${prefix}점!`, x, y, type);
    }
  }

  renderStoveDish(recipe) {
    this.dom.stoveDishImage.innerHTML = '';
    if (recipe.image) {
      const img = document.createElement('img');
      img.src = recipe.image;
      img.alt = recipe.name;
      img.className = 'cooked-dish-img';
      img.onerror = () => {
        if (SVG_FALLBACKS[recipe.svgFallback]) {
          this.dom.stoveDishImage.innerHTML = SVG_FALLBACKS[recipe.svgFallback];
        }
      };
      this.dom.stoveDishImage.appendChild(img);
    } else if (SVG_FALLBACKS[recipe.svgFallback]) {
      this.dom.stoveDishImage.innerHTML = SVG_FALLBACKS[recipe.svgFallback];
    } else {
      this.dom.stoveDishImage.innerHTML = `<span style="font-size: 50px;">${recipe.emoji || '🍽️'}</span>`;
    }
  }

  resetStoveDisplay() {
    this.dom.stoveDishImage.innerHTML = `
      <div class="empty-pan">
        <span class="pan-emoji">🍳</span>
        <span class="pan-tip">조리대가 비어있어요</span>
      </div>
    `;
    this.dom.stoveStatusText.textContent = '재료를 선택한 후 조리 시작을 눌러주세요.';
    this.dom.cookProgressContainer.classList.add('hidden');
    this.dom.burnProgressContainer.classList.add('hidden');
  }

  flashStoveError(message) {
    const originalText = this.dom.stoveStatusText.textContent;
    this.dom.stoveStatusText.innerHTML = `<span class="error-msg">❌ ${message}</span>`;
    this.dom.stoveDisplay.classList.add('shake-error');

    setTimeout(() => {
      this.dom.stoveDisplay.classList.remove('shake-error');
      if (this.gameState === 'ORDERING') {
        this.dom.stoveStatusText.textContent = originalText;
      }
    }, 1500);
  }

  updateActionButtons() {
    const isOrdering = this.gameState === 'ORDERING';
    const isCooking = this.gameState === 'COOKING';
    const isReady = this.gameState === 'READY';
    const isBurnt = this.gameState === 'BURNT';

    const ingButtons = this.dom.ingredientsGrid.querySelectorAll('.ingredient-btn');
    ingButtons.forEach(btn => btn.disabled = !isOrdering);
    this.dom.btnResetIngredients.disabled = !isOrdering || this.selectedIngredients.size === 0;

    this.dom.btnCook.classList.toggle('hidden', !isOrdering && !isCooking);
    this.dom.btnCook.disabled = isCooking || this.selectedIngredients.size === 0;
    this.dom.btnCook.textContent = isCooking ? '조리 중...' : '🎀 조리 시작';

    this.dom.btnServe.classList.toggle('hidden', !isReady);
    this.dom.btnServe.disabled = !isReady || this.isServingProcessed;

    this.dom.btnCookAgain.classList.toggle('hidden', !isBurnt);
  }

  updateHUD() {
    this.dom.scoreText.textContent = `${this.score}점`;
    this.dom.customerBadge.textContent = `손님 ${Math.min(3, this.customerIndex + 1)} / ${GAME_CONFIG.MAX_CUSTOMERS}`;
  }

  stopAllTimers() {
    if (this.gameTimerId) {
      cancelAnimationFrame(this.gameTimerId);
      this.gameTimerId = null;
    }
    if (this.cookTimerId) {
      cancelAnimationFrame(this.cookTimerId);
      this.cookTimerId = null;
    }
    if (this.burnTimerId) {
      cancelAnimationFrame(this.burnTimerId);
      this.burnTimerId = null;
    }
    soundManager.stopCookingSound();
  }

  handleGameClear() {
    this.gameState = 'CLEAR';
    this.stopAllTimers();
    soundManager.playGameClear();

    this.dom.resultTitle.textContent = '🎉 축하합니다! 완벽 클리어! 🎀';
    this.dom.resultSubtext.textContent = '산리오 친구들 3명의 주문을 모두 맛있게 완성했어요!';
    this.dom.resultFinalScore.textContent = `${this.score}점`;
    this.dom.resultOrdersCount.textContent = `3 / 3 (완벽 달성!)`;

    this.renderResultStars(3);

    this.dom.resultCelebration.innerHTML = `
      <div class="celebration-friends">
        <img src="public/images/characters/hello_kitty_chef.png" alt="헬로키티" class="celebrate-avatar">
        <img src="public/images/characters/cinnamoroll.png" alt="시나모롤" class="celebrate-avatar">
        <img src="public/images/characters/my_melody.png" alt="마이멜로디" class="celebrate-avatar">
        <img src="public/images/characters/kuromi.png" alt="쿠로미" class="celebrate-avatar">
      </div>
      <p class="celebrate-praise">"키티야, 달콤한 주방의 최고 셰프 인증서 수여 완료! 💖"</p>
    `;

    this.particles.launchConfetti(4000);
    this.showScreen('result');
  }

  handleTimeUp() {
    this.gameState = 'GAMEOVER';
    this.stopAllTimers();
    soundManager.playGameOver();

    this.dom.resultTitle.textContent = '⏰ 시간 종료!';
    this.dom.resultSubtext.textContent = '60초가 모두 지났어요! 아쉽지만 다음엔 더 빠르게 요리해봐요!';
    this.dom.resultFinalScore.textContent = `${this.score}점`;
    this.dom.resultOrdersCount.textContent = `${this.successfulOrders} / 3`;

    let stars = 1;
    if (this.successfulOrders >= 2 && this.score >= 200) stars = 2;
    if (this.successfulOrders === 3) stars = 3;
    if (this.successfulOrders === 0) stars = 0;

    this.renderResultStars(stars);

    this.dom.resultCelebration.innerHTML = `
      <div class="celebration-friends">
        <img src="public/images/characters/hello_kitty_chef.png" alt="헬로키티" class="celebrate-avatar">
      </div>
      <p class="celebrate-praise">"다음엔 꼭 3명의 친구들에게 모두 맛있는 요리를 전해줄 수 있을 거예요! 🍰"</p>
    `;

    this.showScreen('result');
  }

  renderResultStars(count) {
    this.dom.resultStars.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
      const star = document.createElement('span');
      star.className = `star-icon ${i <= count ? 'active' : 'inactive'}`;
      star.textContent = i <= count ? '⭐' : '☆';
      this.dom.resultStars.appendChild(star);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.helloKittyGame = new HelloKittyCookingGame();
});
