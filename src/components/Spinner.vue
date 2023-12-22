<template>
    <!--<div class="spin"></div>-->
    <div class="spinner-container">
        <canvas ref="spinnerCanvas" width="500" height="500"></canvas>
    </div>
</template>

<script>
export default {
  mounted() {
    this.drawSpinner();
  },
  methods: {
    drawSpinner() {
      const canvas = this.$refs.spinnerCanvas;
      const ctx = canvas.getContext('2d');
      const spinnerRadius = 50;
        let animationProgress = 0;
        let angle = 0;
        let direction = false;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const collapseStartAngle1 = (0 + animationProgress + angle) * Math.PI;
            const collapseEndAngle1 = (3/4 - animationProgress + angle) * Math.PI;
            const collapseStartAngle2 = (1 + animationProgress + angle) * Math.PI;
            const collapseEndAngle2 = (7/4 - animationProgress + angle) * Math.PI;

            //turnL
            const turningLStartAngle1 = (0 - angle + 1/3) * Math.PI;
            const turningLEndAngle1 = (3/4 - angle + 1/3) * Math.PI
            const turningLStartAngle2 = (1 - angle + 1/3) * Math.PI;
            const turningLEndAngle2 = (7/4 - angle + 1/3) * Math.PI

            //turnR

            const turningRStartAngle1 = (0 + angle + 2/3) * Math.PI;
            const turningREndAngle1 = (3/4 + angle + 2/3) * Math.PI
            const turningRStartAngle2 = (1 + angle + 2/3) * Math.PI;
            const turningREndAngle2 = (7/4 + angle + 2/3) * Math.PI

            //rozkładane

            ctx.lineWidth = 8;
            ctx.strokeStyle = '#0174be';

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius, collapseStartAngle1, collapseEndAngle1);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius, collapseStartAngle2, collapseEndAngle2);
            ctx.stroke();

            //obracany lewo
            ctx.strokeStyle = '#0F5476';

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius + 30, turningLStartAngle1, turningLEndAngle1);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius + 30, turningLStartAngle2, turningLEndAngle2);
            ctx.stroke();

            //obranacy prawo
            ctx.strokeStyle = '#152F50';

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius + 50, turningRStartAngle1, turningREndAngle1);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, spinnerRadius + 50, turningRStartAngle2, turningREndAngle2);
            ctx.stroke();
            // Aktualizacja rozkładania i składania
            if (animationProgress * Math.PI >= (3/4 / 2) * Math.PI) {
                direction = true
            } else if( animationProgress * Math.PI <= (0 / 2) * Math.PI) {
                direction = false
            }

            if(direction){
                animationProgress -= 0.005 ;
            }else{
                animationProgress += 0.005;
            }

            //obrót
            if(angle * Math.PI >= 2 * Math.PI){
                angle = 0;
            }
            angle += 0.015;

            setTimeout(() => {
                requestAnimationFrame(draw);
            }, 1000 / 60);
        }

        draw();
    },
  },
};
</script>

<style>
    .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    }

    .spin {
        display: block;
        width: 40px;
        height: 40px;
        margin: 30px auto;
        border: 3px solid transparent;
        border-radius: 50%;
        border-top-color: #ff8800;
        animation: spin 1s ease infinite;
    }

    @keyframes spin {
        to { transform: rotateZ(360deg) }
    }
</style>