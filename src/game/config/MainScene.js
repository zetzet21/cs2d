import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
   constructor() {
      super("mainScene");

      this.bullets = [];

      this.centWidth = window.outerWidth / 2;
      this.centHeight = window.outerHeight / 2;
      this.canJump = true;
      this.count = 0;
   }

   preload() {
      this.load.image("city", 'assets/City.jpg');
      this.load.image("ground", 'assets/ground.png');
      this.load.image("platform", 'assets/platform.png');
      this.load.spritesheet("girl", "assets/New Piskel-3.png.png", { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet("anim", "assets/New Piskel (1).png", { frameWidth: 32, frameHeight: 32 });
      this.load.image("gun", "assets/deagle.png");
      this.load.image("bullet", "assets/bullet.png");
   }

   create() {
      this.bg = this.add.tileSprite(this.centWidth, this.centHeight, 4000, 2250, "city").setScale(this.centWidth / 2000, this.centHeight / 1125);

      this.gun = this.physics.add.sprite(this.centWidth, this.centHeight - 100, "gun").setScale(0.03);

      this.ground = this.physics.add.staticGroup()
      this.ground.create(this.centWidth, this.centHeight + 300, "ground");

      this.platform = this.physics.add.staticGroup();
      this.platform.create(this.centWidth, this.centHeight, "platform");

      this.player = this.physics.add.sprite(this.centWidth, this.centHeight, "girl").setBodySize(23, 25);
      this.player.setScale(2, 2);

      this.player.canFire = false;
      this.player.haveWeapon = false;

      this.coursor = this.input.keyboard.addKeys(
         {
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.s,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            action: Phaser.Input.Keyboard.KeyCodes.E,
         }
      );

      this.mouse = this.input.mousePointer;

      this.anims.create({
         key: 'run',
         frames: this.anims.generateFrameNumbers("anim", { start: 0, end: 10 }),
         frameRate: 30,
         repeat: -1
      });

      this.anims.create({
         key: 'stay',
         frames: this.anims.generateFrameNumbers("girl"),
         frameRate: 30,
         repeat: -1
      });

      this.physics.add.collider(this.player, this.platform);
      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(this.gun, this.platform);

      this.camera = this.cameras.main.startFollow(this.player);
   }

   //одиночный прыжок
   jump(count, canJump) {
      if (count < 2 && canJump) {
         this.player.setVelocityY(-500);
         this.count++;
      }
   }

   //функция изменения координат персонажа и проигрывание соответствующей анимации
   run(direction = 1, speed = 160) {
      this.player.setVelocityX(direction * speed);
      if (direction !== 1) this.player.flipX = true;
      else this.player.flipX = false;
      this.player.anims.play("run", true);
   }

   //Следование заднего фона за игроком
   followBG() {
      this.bg.x = this.player.body.x;
      this.bg.y = this.player.body.y;
   }

   //Взятие игроком оружия
   takeGun(player, gun) {
      if (player.body.hitTest(gun.x, gun.y) && this.coursor.action.isDown) {
         gun.destroy();
         this.player.canFire = true;
         this.player.haveWeapon = true;
      }
   }

   //изменение пули в пространстве, либо её уничтожение при наборе предельной дальности
   setBallistic(bullet) {
      if ((bullet.dist > 50) && bullet) {
         bullet.destroy();
      } else {
         bullet.body.setVelocity(bullet.xs, bullet.ys)
         bullet.dist += 1;
      }
   }

   //создание новой пули от параметра скорости
   newBullet(speed) {
      const bullet = this.physics.add.sprite(this.player.body.center.x, this.player.body.center.y, "bullet")
      bullet.scale = 0.05;
      bullet.setGravityY(0);
      this.physics.add.collider(bullet, this.platform)
      this.physics.add.collider(bullet, this.ground)
      const vector = new Phaser.Math.Vector2(this.mouse.worldX - this.player.body.center.x, this.mouse.worldY - this.player.body.center.y);
      bullet.rotation = Math.atan2(vector.y, vector.x);
      vector.setLength(speed);
      bullet.xs = vector.x
      bullet.ys = vector.y
      bullet.dist = 1;
      return bullet;
   }

   //стрельба при нажатии ЛКМ
   fire() {
      if (this.mouse.leftButtonDown() && this.player.canFire && this.player.haveWeapon) {
         const speed = 800;
         this.bullets.push(this.newBullet(speed));
         this.player.canFire = false;
      }
      if (this.mouse.leftButtonReleased()) this.player.canFire = true;
   }

   //Горизонтальное передвижение персонажа
   movement() {
      if (this.coursor.left.isDown) {
         this.run(-1);
      } else if (this.coursor.right.isDown) {
         this.run(1);
      } else {
         this.player.setVelocityX(0);
         this.player.anims.play("stay", true);
      }
   }

   //Прыжки
   jumping() {
      if (this.coursor.up.isDown) {
         this.jump(this.count, this.canJump);
         this.canJump = false;
      } else if (this.coursor.up.isUp) {
         this.canJump = true
         if (this.player.body.touching.down) {
            this.count = 0;
         }
      }
      if (this.coursor.up.isDown && this.player.body.touching.up) {
         this.player.setVelocityY(500);
         this.count = 2;
         this.player.flipY = true;
      }
      if (this.player.body.touching.down) {
         this.player.flipY = false;
      }
   }

   //Изменение положения всех пуль в мире
   allBulletsTraectory(bullets) {
      if (bullets.length > 0)
         bullets.forEach(bullet => {
            this.setBallistic(bullet);
            console.log(bullets)
         });
   }

   update() {
      this.movement();
      this.jumping();
      this.followBG()
      this.takeGun(this.player, this.gun)
      this.fire()
      this.allBulletsTraectory(this.bullets);
   }
}