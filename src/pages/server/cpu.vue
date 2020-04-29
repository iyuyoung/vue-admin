<template>
    <div class="card">
        <div class="card-header">实时监控</div>
        <div class="card-body">
            <div class="progress-item">
                <h3>cpu使用率</h3>
                <div class="progress-bar">
                    <span class="progress-text" v-text="cpu">%</span>
                </div>
            </div>
            <div class="progress-item">
                <h3>内存使用率</h3>
                <div class="progress-bar">
                    <span class="progress-text" v-text="memory">%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cpu',
        data() {
            return {
                cpu: 0,
                memory: 0
            }
        },
        created() {
            this.cpu = parseFloat(Math.random() * 10).toFixed(2)
            this.memory = parseFloat(Math.random() * 10).toFixed(2)
        }
    }
</script>

<style scoped>
    .progress-item{
        position:relative;
        height:6px;
        border-radius:20px;
        background-color:#e2e2e2;
        margin:55px 0px 20px 0px;
        }

    .progress-item h3{
        position:absolute;
        right:0;
        top:-40px;
        color:#999;
        font-size:14px;
        }

    .progress-bar{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        }

    .progress-bar:before{
        content:'';
        position:absolute;
        left:0;
        top:0;
        width:20%;
        max-width:100%;
        height:6px;
        border-radius:20px;
        text-align:right;
        background-color:#5FB878;
        transition:all .5s;
        -webkit-transition:all .5s;
        }

    .progress-text{
        position:absolute;
        top:-35px;
        line-height:26px;
        font-size:26px;
        color:#666;
        left:0px;
        }
</style>