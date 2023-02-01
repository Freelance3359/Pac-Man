class Ghost {
    constructor(x, y, width, height, speed, imageX, imageY, imagewWidth, imageHeight, range) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imagewWidth = imagewWidth;
        this.imageHeight = imageHeight;
        this.range = range;
        this.randomTargetIndex = parseInt(Math.random() * randomTargetForGhosts.length
        );
        setInterval(() => {
            this.changeRandomDirection()
        }, 10000)
    }

    changeRandomDirection() {
        this.randomTargetIndex += 1
        this.randomTargetIndex = this.randomTargetIndex % 4
    }
    moveProcess() {
        if (this.isInRangeOfPacman()) {
            target = pacman
        } else (
            this.target = randomTargetForGhosts[this.randomTargetIndex]
        )
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.cheakGhostCollision()) {
            this.moveBackwards();
        }
    }
    isInRangeOfPacman() {
        let xDistance = Math.abs(pacman.getMapX() - this.getMapX());
        let yDistance = Math.abs(pacman.getMapY() - this.getMapY());
        if (
            Math.sqrt(xDistance * xDistance + yDistance * yDistance) <=
            this.range
        ) {
            return true;
        }
        return false;
    }

    changeDirectionIfPossible() {
        let tempDirection = this.direction
        this.direction = this.calculateNewDirection(
            map,
            parseInt(this.target.x / oneBlockSize),
            parseInt(this.target.y / oneBlockSize),
        )

        this.moveForwards()
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }

    calculateNewDirection(map, destX, destY) {
        let mp = []
        for (let i = 0; i < map.length; i++) {
            mp[i] = map[i].slice()
        }
        let queue = [{
            x: this.getMapX(),
            x: this.getMapY(),
            moves: [],
        }]

        while
    }


    changeAnimation() {
        this.currentFrame =
            this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }
    draw() {
        canvasContext.save()
        canvasContext.drawImage(
            ghostFrames,
            this.imageX,
            this.imageY,
            this.imagewWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )

        canvasContext.restore();
    }
    getMapX() {
        return parseInt(this.x / oneBlockSize)
    }
    getMapY() {
        return parseInt(this.y / oneBlockSize)
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }
    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }
}

