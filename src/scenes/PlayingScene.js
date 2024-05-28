import Phaser from "phaser";
import Player from "../characters/Player";
import { setBackground } from "../utils/backgroundManager";

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 사용할 sound들을 추가해놓는 부분입니다.
    // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
    // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.
    this.sound.pauseOnBlur = false;
    this.m_beamSound = this.sound.add("audio_beam");
    this.m_scratchSound = this.sound.add("audio_scratch");
    this.m_hitMobSound = this.sound.add("audio_hitMob");
    this.m_growlSound = this.sound.add("audio_growl");
    this.m_explosionSound = this.sound.add("audio_explosion");
    this.m_expUpSound = this.sound.add("audio_expUp");
    this.m_hurtSound = this.sound.add("audio_hurt");
    this.m_nextLevelSound = this.sound.add("audio_nextLevel");
    this.m_gameOverSound = this.sound.add("audio_gameOver");
    this.m_gameClearSound = this.sound.add("audio_gameClear");
    this.m_pauseInSound = this.sound.add("audio_pauseIn");
    this.m_pauseOutSound = this.sound.add("audio_pauseOut");


    // player를 m_player라는 멤버 변수로 추가합니다.
    this.m_player = new Player(this);

    // PlayingScene의 background를 설정합니다.
    setBackground(this, "background1");

	// 키보드 키를 m_cursorKeys라는 멤버 변수로 추가해줍니다.
	this.m_cursorKeys = this.input.keyboard.createCursorKeys();


// Initialize the WASD keys
this.m_wasdKeys = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
};
  }

  update() {
    this.movePlayerManager();
  }

    // player가 움직이도록 해주는 메소드입니다.
movePlayerManager() {
    // 이동 키가 눌려있으면 player가 걸어다니는 애니메이션을 재생하고,
    // 이동 키가 눌려있지 않으면 player가 가만히 있도록 합니다.
    if ((this.m_cursorKeys.left.isDown || this.m_wasdKeys.left.isDown) || 
    (this.m_cursorKeys.up.isDown || this.m_wasdKeys.up.isDown) || 
    (this.m_cursorKeys.right.isDown || this.m_wasdKeys.right.isDown) || 
    (this.m_cursorKeys.down.isDown || this.m_wasdKeys.down.isDown)) {
      if (!this.m_player.m_moving) {
        this.m_player.play("player_anim");
      }
      this.m_player.m_moving = true;
    } else {
      if (this.m_player.m_moving) {
        this.m_player.play("player_idle");
      }
      this.m_player.m_moving = false;
    }
  
    // vector를 사용해 움직임을 관리할 것입니다.
    // vector = [x좌표 방향, y좌표 방향]입니다.
    // 왼쪽 키가 눌려있을 때는 vector[0] += -1, 오른쪽 키가 눌려있을 때는 vector[0] += 1을 해줍니다.
    // 위/아래 또한 같은 방법으로 벡터를 수정해줍니다.
    let vector = [0, 0];
    if (this.m_cursorKeys.left.isDown || this.m_wasdKeys.left.isDown) {
      // player.x -= PLAYER_SPEED; // 공개영상에서 진행했던 것
      vector[0] += -1;
    } else if (this.m_cursorKeys.right.isDown || this.m_wasdKeys.right.isDown) {
      vector[0] += 1;
    }
    if (this.m_cursorKeys.up.isDown || this.m_wasdKeys.up.isDown) {
      vector[1] += -1;
    } else if (this.m_cursorKeys.down.isDown || this.m_wasdKeys.down.isDown) {
      vector[1] += 1;
    }
  
    // vector를 player 클래스의 메소드의 파라미터로 넘겨줍니다.
    this.m_player.move(vector);
  }
}