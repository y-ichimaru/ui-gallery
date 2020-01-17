<template>
    <canvas
        ref="canvas"
        :style="{height:height+'px',width: '100%'}"
    ></canvas>
</template>
<script>

export default {
    name: "volume-indicator",
    props: {
        stream: {
        },
        isEnabled: {
            type: Boolean,
            default: false
        },
        indicatorCount: {
            type: Number,
            default: 12
        },
        height: {
            type: Number,
            default: 30
        },
        span: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: "#ff9d55"
        }
    },
    data()
    {
        return {
            intervalId: 0,
            audioContext: null
        };
    },
    watch: {
        isEnabled(value)
        {
            this.kill();
            this.begin();
        },
        stream(value)
        {
            if (this.isEnabled && value instanceof MediaStream)
            {
                this.kill();
                this.begin();
            }
        }
    },
    methods: {
        begin()
        {
            if (!this.stream || this.stream.getAudioTracks().length === 0)
            {
                return;
            }
            const analyzer = this.createAnalyzer(this.stream);

            const canvas = this.$refs.canvas;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const context = canvas.getContext("2d");

            const rectItemWidth = canvas.width / this.indicatorCount;

            /**
             * 角が丸い四角形を描画
             */
            const roundRect = (ctx, x, y, width, height, radius, fill, stroke) =>
            {
                if (typeof stroke === "undefined")
                {
                    stroke = true;
                }
                if (typeof radius === "undefined")
                {
                    radius = 5;
                }
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                if (stroke)
                {
                    ctx.stroke();
                }
                if (fill)
                {
                    ctx.fill();
                }
            };

            // フレーム描画開始
            this.intervalId = setInterval(() =>
            {
                // 背景をクリア
                context.clearRect(0, 0, canvas.width, canvas.height);

                if (!analyzer)
                {
                    for (let i = 0; i < this.indicatorCount; i++)
                    {
                        context.fillStyle = "#b0b0b0";
                        roundRect(context, i * rectItemWidth + this.span, 2, rectItemWidth - (this.span * 2), canvas.height - 4, 3, true, false);
                    }
                    return;
                }

                const spectrums = new Uint8Array(analyzer.frequencyBinCount);
                analyzer.getByteFrequencyData(spectrums);
                if (spectrums[0])
                {
                    this.$emit("audioInput", true);
                }
                else
                {
                    this.$emit("audioInput", false);
                }

                let level = spectrums[0] + spectrums[1];
                level *= 0.5;
                level = (level / 255) * this.indicatorCount;

                const l = parseInt(level);
                for (let i = 0; i < this.indicatorCount; i++)
                {
                    if (i < l && this.isEnabled)
                    {
                        context.fillStyle = this.color;
                    }
                    else
                    {
                        context.fillStyle = "#b0b0b0";
                    }

                    roundRect(context, i * rectItemWidth + this.span, 2, rectItemWidth - (this.span * 2), canvas.height - 4, 3, true, false);
                }
            }, 200);
        },
        kill()
        {
            clearInterval(this.intervalId);
            this.intervalId = 0;
            try
            {
                if (this.audioContext)
                {
                    // this.audioContext.close();
                }
            }
            catch (ex)
            {
                console.warn(ex);
            }
        },
        createAnalyzer(stream)
        {
            try
            {
                const _AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = this.audioContext = new _AudioContext();
                const analyzer = audioContext.createAnalyser();

                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyzer);
                analyzer.smoothingTimeConstant = 0.3;
                analyzer.fftSize = 32;
                return analyzer;
            }
            catch (ex)
            {
                logger.error(ex.message);
            }
        }
    },
    mounted()
    {
        this.begin();
    },
    beforeDestroy()
    {
        this.kill();
    }
};
</script>
